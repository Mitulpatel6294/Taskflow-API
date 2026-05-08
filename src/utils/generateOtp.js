import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";

const generateOtp = async () => {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    const hashedOtp = await bcrypt.hash(otp, 10);

    return {
        otp,
        hashedOtp,
    };
};

export default generateOtp;