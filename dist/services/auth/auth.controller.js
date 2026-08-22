import { AuthService } from './auth.service.js';
const signUp = async (req, res) => {
    try {
        const { name, email, password, avatarUrl } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required.',
            });
        }
        const user = await AuthService.signUpUser({ name, email, password, avatarUrl });
        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: user,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Error occurred during registration.',
        });
    }
};
const signIn = async (req, res) => {
    console.log('hitting signin with: ', req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.',
            });
        }
        const { token, user } = await AuthService.signInUser({ email, password });
        // Attach token to HTTP-Only cookie for secure transport
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
        });
        // Send both token and sanitized user details in the body
        return res.status(200).json({
            success: true,
            message: 'Signed in successfully.',
            token,
            user,
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message || 'Authentication failed.',
        });
    }
};
export const AuthController = {
    signUp,
    signIn,
};
//# sourceMappingURL=auth.controller.js.map