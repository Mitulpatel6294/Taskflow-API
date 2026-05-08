import express from "express";
import userController from "../controllers/user.js";
import validate from "../middlewares/validate.js";
import {
    registerSchema,
    verifyOtpSchema,
    resendOtpSchema,
    loginSchema
} from "../validations/user.js";
import {
    registerRateLimiter,
    resendOtpRateLimiter,
    verifyOtpRateLimiter,
    loginRateLimiter
} from "../middlewares/ratelimit.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerRateLimiter, validate(registerSchema), userController.register);
router.post("/verify-otp", verifyOtpRateLimiter, validate(verifyOtpSchema), userController.verifyOtp);
router.post("/resend-otp", resendOtpRateLimiter, validate(resendOtpSchema), userController.resendOtp);
router.post("/login", loginRateLimiter, validate(loginSchema), userController.login);

router.get("/me", authMiddleware, userController.me);
export default router;