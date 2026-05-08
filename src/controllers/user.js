import userService from "../services/user.js";
import UserResource from "../resources/user.js";


class UserController {
    async register(req, res) {
        try {
            const user = await userService.registerUser(req.body);
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: UserResource.toResponse(user),
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;

            await userService.verifyOtp(email, otp);

            res.status(200).json({
                success: true,
                message: "Email verified successfully",
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async resendOtp(req, res) {
        try {

            const { email } = req.body;

            await userService.resendOtp(email);

            res.status(200).json({
                success: true,
                message: "OTP resent successfully",
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async login(req, res) {
        try {

            const { email, password } =
                req.body;

            const { user, token } =
                await userService.loginUser(
                    email,
                    password
                );

            res.status(200).json({
                success: true,
                message: "Login successful",

                token,

                data:
                    UserResource.toResponse(user),
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    async me(req, res) {

        res.status(200).json({
            success: true,
            data: UserResource.toResponse(
                req.user
            ),
        });
    }
}
export default new UserController();