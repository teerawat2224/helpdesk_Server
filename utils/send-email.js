const nodemailer = require('nodemailer');
require('dotenv').config();


const sendEmailByNodemailer = async (recipient, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        tls: {
            rejectUnauthorized: false,
        },
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.EMAIL_PASSADMIN,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ADMIN,
        to: recipient,
        subject: subject,
        text: `Message from ${recipient}:\n\n${message}`,
        html: `<p><strong>Message from ${recipient}:</strong></p><p>${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send email', error };
    }
};

module.exports = sendEmailByNodemailer;