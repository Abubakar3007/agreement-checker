const { sendMail } = require("../services/mail.service.js");
const fs = require("fs");
const path = require("path");

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        // check if anything miss
        if (!name || !email || !message || !subject) {
            return res.status(400).json({ error: "All fields required" });
        }

        const adminTemplate = fs.readFileSync(path.resolve("src/templates/contactAdmin.html"), "utf-8"); // find html file of contact admin
        const userTemplate = fs.readFileSync(path.resolve("src/templates/contactUser.html"), "utf-8"); // find html file of contact user

        // replace values
        const adminHTML = adminTemplate
            .replace("{{name}}", name)
            .replace("{{email}}", email)
            .replace("{{subject}}", subject)
            .replace("{{message}}", message);

        // user template in add name
        const userHTML = userTemplate.replace("{{name}}", name);

        // Send to Admin
        await sendMail(
            process.env.ADMIN_EMAIL,
            "📩 New Contact Request",
            adminHTML
        );

        // Confirmation to User
        await sendMail(
            email,
            "We received your message",
            userHTML
        );

        res.json({ success: true, message: "Message sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};