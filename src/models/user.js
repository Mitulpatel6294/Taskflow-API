import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        otp: {
            type: String,
        },

        otpExpires: {
            type: Date,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        otpResendCooldown: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },

);
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})
const User = mongoose.model("User", UserSchema);
export default User;