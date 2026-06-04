const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication middleware — extracts and verifies JWT token.
 * Checks: Authorization Bearer header → cookie fallback.
 */
const protect = async (req, res, next) => {
    let token;

    // 1. Check Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // 2. Fallback: check cookies
    if (!token && req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    // 3. No token found
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User belonging to this token no longer exists' });
        }

        if (!user.isActive !== undefined && user.isActive === false) {
            return res.status(401).json({ message: 'This account has been deactivated' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired, please log in again' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token, please log in again' });
        }
        return res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
};

/**
 * Role-based authorization middleware.
 * Must be used AFTER protect middleware.
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const userRole = req.user.role.toLowerCase();
        const allowed = roles.map(r => r.toLowerCase());
        if (!allowed.includes(userRole)) {
            return res.status(403).json({
                message: `Access denied. Role '${req.user.role}' is not authorized for this resource`
            });
        }
        next();
    };
};

module.exports = { protect, authorize };
