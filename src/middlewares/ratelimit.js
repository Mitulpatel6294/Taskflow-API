import rateLimit from "express-rate-limit";

export const registerRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,

    max: 3,

    message: {
        success: false,
        message:
            "Too many registration attempts. Try again later.",
    },

    standardHeaders: true,
    legacyHeaders: false,
});

export const resendOtpRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,

    max: 3,

    message: {
        success: false,
        message:
            "Too many OTP resend requests. Try again later.",
    },

    standardHeaders: true,
    legacyHeaders: false,
});

export const verifyOtpRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,

    max: 5,

    message: {
        success: false,
        message:
            "Too many OTP verification attempts.",
    },

    standardHeaders: true,
    legacyHeaders: false,
});

export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 10,

    message: {
        success: false,
        message:
            "Too many login attempts. Try again later.",
    },

    standardHeaders: true,
    legacyHeaders: false,
});