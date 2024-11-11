const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { generateResetToken } = require('../utils/generateResetToken');  // นำเข้า generateResetToken
const sendEmailByNodemailer = require('../utils/send-email');
const { getUserByEmail, createUser } = require("../services/auth-service");
const createError = require("../utils/createError");

const register = async (req, res, next) => {
    console.log("aaaa",req.body);

    try {
        const { email, password } = req.body;

        // ตรวจสอบว่าอีเมลมีอยู่ในระบบแล้วหรือยัง
        const checkEmail = await getUserByEmail(email);
        if (checkEmail) {
            return createError(400, "Email already exist!!");
        }
        console.log("bbbb",email, password)

        // เข้ารหัสรหัสผ่าน
        const hashPassword = await bcryptjs.hash(password, 10);

        // สร้างผู้ใช้ใหม่ในฐานข้อมูล
        const newUser = await createUser(email, hashPassword);
        console.log("ccccc",newUser)

        // สร้าง payload สำหรับ JWT token
        const payLoad = {
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
        };

        // สร้าง JWT token
        const genToken = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("dddd",genToken)

        // ส่ง response กลับไปพร้อมข้อมูลผู้ใช้และ token
        res.json({
            newUser,
            token: genToken, // ส่ง token กลับไป
        });

    } catch (err) {
        console.log(err)
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            return createError(400, "User not found!!");
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return createError(400, "Wrong password!!");
        }

        const firstname = user?.firstname || "";
        //create payload
        const payLoad = {
            user: {
                id: user.id,
                firstname: firstname,
                email: user.email,
                role: user.role,
            }
        }

        //create token
        const genToken = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "1d" });

        //send to frontend
        res.json({
            user: payLoad,
            token: genToken
        });

    } catch (err) {
        next(err);
    }
};

const forgetPassword = async (req, res) => {
    // Your forget password logic here
    try {
        // Example implementation
        const { email } = req.body;
        
        // ตรวจสอบว่าอีเมลมีในระบบหรือไม่
        const user = await prisma.users.findUnique({ where: { email } });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // สร้าง token โดยส่ง user เป็นพารามิเตอร์
        const resetToken = generateResetToken(user);  // ส่ง user ไปที่ generateResetToken
        const resetTokenExpire = new Date(Date.now() + 3600000); // 1 ชั่วโมง

        // อัพเดทข้อมูลผู้ใช้ด้วย token และเวลาหมดอายุ
        await prisma.users.update({
            where: { email },
            data: {
                resettoken: resetToken,
                resettokenExpire: resetTokenExpire,
            },
        });
        console.log("resetToken",resetToken);

        // ส่งอีเมลให้ผู้ใช้ (ใช้ sendEmailByNodemailer)
        const emailSubject = 'Password Reset Request';
        const emailMessage = `Click the link to reset your password: http://localhost:4000/reset-password/${resetToken}`;
        console.log(emailMessage);
        await sendEmailByNodemailer(email, emailSubject, emailMessage);

        res.status(200).json({ message: 'Password reset instructions sent' });
    } catch (error) {
        console.log(error);
        next(error);
       
    }
};
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        console.log(token);
        const { password } = req.body;

        const user = await prisma.users.findFirst({
            where: {
                resettoken: token,
               
                },
            },
        );

        if (!user) {
            return createError(404, 'Invalid token');
        }
        const VerrifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!VerrifyToken) {
            return createError(404, 'Invalid token');
        }
        const hashedPassword = await bcryptjs.hash(password, 10);


        await prisma.users.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resettoken: null,
                resettokenExpire: null,
            },
        });

        res.json({ message: 'Your password has been successfully reset.' });
    } catch (error) {
        next(error);
    }
};

const getPrivacyPolicy = (req, res) => {
    res.send(`
        <h1>Privacy Policy</h1>
        <p>This is our Privacy Policy. Here, we explain how we collect, use, and protect your information.</p>
        <h2>Information Collection</h2>
        <p>Details on how we collect and use data.</p>
        <h2>Security</h2>
        <p>Information on our security measures.</p>
    `);
};

const getTermsOfService = (req, res) => {
    res.send(`
        <h1>Terms of Service</h1>
        <p>These are the Terms of Service. By using our service, you agree to these terms.</p>
        <h2>User Responsibilities</h2>
        <p>Details on what users should adhere to.</p>
        <h2>Liability</h2>
        <p>Information on our liability and legal limitations.</p>
    `);
};


module.exports = {
    register,
    login,
    forgetPassword,
    resetPassword,
    getPrivacyPolicy,
    getTermsOfService,
};