import nodemailer from "nodemailer";

class MailService {
    getTransporter() {
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,

            port: process.env.MAIL_PORT,

            secure: false,

            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendMail(email, otp) {
        const transporter = this.getTransporter();

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Verify your account",

            html: `
        <h2>Email Verification OTP</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 10 minutes.</p>

        <p>TaskFlow Team</p>
        `,
        });
    }
}

export default new MailService();
