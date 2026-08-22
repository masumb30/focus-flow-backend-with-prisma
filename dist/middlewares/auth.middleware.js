import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';
/**
 * Middleware to verify JWT token and populate req.user
 */
export const authenticateUser = (req, res, next) => {
    try {
        let token;
        // 1. Check for token in Authorization header ("Bearer <token>")
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        // 2. Fallback: Check for token in cookies (if cookie-parser middleware is enabled)
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        // Return 401 if no token was found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No authentication token provided.',
            });
        }
        // Verify token and extract payload
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach decoded user to request object
        req.user = decoded;
        // Proceed to next middleware/controller
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please log in again.',
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map