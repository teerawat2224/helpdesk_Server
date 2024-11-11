const generateResetToken = (user) => {
    const payload = { email: user.email };  // ใช้ email ของผู้ใช้
    const secret = process.env.JWT_SECRET || 'your-secret-key';  // คีย์ลับสำหรับการเซ็น
    const options = { expiresIn: '1h' };  // หมดอายุใน 1 ชั่วโมง
    return jwt.sign(payload, secret, options);  // สร้างและส่งกลับ token
};