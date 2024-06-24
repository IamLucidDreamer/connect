const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, templatePath, replacements) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER || "shuklamanasofficial@gmail.com",
            pass: process.env.EMAIL_PASS || "mouo qfzz xwva cioc",
        },
    });

    // Read the HTML template
    const template = fs.readFileSync(path.resolve(__dirname, templatePath), 'utf8');

    // Replace placeholders with actual values
    const html = Object.keys(replacements).reduce((acc, key) => {
        return acc.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    }, template);

    const mailOptions = {
        from: process.env.EMAIL_USER || "shuklamanasofficial@gmail.com",
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${to}`);
    } catch (error) {
        logger.error(`Error sending email: ${error}`);
    }
};

module.exports = sendEmail;
