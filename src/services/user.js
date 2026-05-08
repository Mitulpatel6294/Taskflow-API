import User from "../models/user.js";
import mailService from "./mail.js";
import generateOtp from "../utils/generateOtp.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

class UserService {
    async sendOtpToUser(user) {

        const { otp, hashedOtp } =
            await generateOtp();

        user.otp = hashedOtp;

        user.otpExpires =
            Date.now() + 1000 * 60 * 10;

        await user.save();

        await mailService.sendMail(
            user.email,
            otp
        );
    }
    async registerUser(userData) {
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser && existingUser.isVerified) {
            throw new Error("Email already exists");
        }

        if (existingUser && !existingUser.isVerified) {

            existingUser.name = userData.name;
            existingUser.password = userData.password;

            await this.sendOtpToUser(existingUser);

            return existingUser;
        }
        const user = await User.create(userData);
        await this.sendOtpToUser(user);
        return user;
    }
    async verifyOtp(email, otp) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        if (user.isVerified) {
            throw new Error("User already verified");
        }

        if (!user.otp || !user.otpExpires) {
            throw new Error("OTP not found");
        }

        if (user.otpExpires < Date.now()) {
            throw new Error("OTP expired");
        }

        const isOtpValid = await bcrypt.compare(
            otp,
            user.otp
        );

        if (!isOtpValid) {
            throw new Error("Invalid OTP");
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        return user;
    }
    async resendOtp(email) {

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        if (user.isVerified) {
            throw new Error("User already verified");
        }

        if (
            user.otpResendCooldown &&
            user.otpResendCooldown > Date.now()
        ) {
            throw new Error(
                "Please wait before requesting another OTP"
            );
        }
        user.otpResendCooldown =
            Date.now() + 60 * 1000;
        await this.sendOtpToUser(user);
        await user.save();
        return true;
    }
    async loginUser(email, password) {

        const user = await User.findOne({
            email,
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        if (!user.isVerified) {
            throw new Error(
                "Please verify your email first"
            );
        }

        const isPasswordValid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = generateToken(user._id);

        return {
            user,
            token,
        };
    }
}

export default new UserService();