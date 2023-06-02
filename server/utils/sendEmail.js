import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (email, url) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Account Verification",
            text: "Welcome!",
            html: `
            <div>
                <a href="${url}">Click here to activate your account</a>
            </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log("Email sent successfully!");

        return info;

    } catch (err) {
        console.error("Email sending failed:", err);
        throw err;
    }
};