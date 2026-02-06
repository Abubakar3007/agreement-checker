const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, html, replyTo }) => {

    console.log("MAIL DATA:", to, subject);

    if (!to) {
        throw new Error("Recipient email missing");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Contact App" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
        replyTo,
    });
};

module.exports = { sendMail };
