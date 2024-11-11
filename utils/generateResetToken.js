const jwt = require('jsonwebtoken');

// ฟังก์ชันในการสร้าง reset token สำหรับการรีเซ็ตรหัสผ่าน
function generateResetToken(user) {
    const resetToken = jwt.sign(
        { userId: user.id }, // payload ที่เก็บ id ของผู้ใช้
        process.env.JWT_SECRET, // ใช้ค่า JWT_SECRET จากไฟล์ .env
        { expiresIn: '1h' } // กำหนดเวลาในการหมดอายุของ token
    );
    return resetToken;
}

module.exports = { generateResetToken };
