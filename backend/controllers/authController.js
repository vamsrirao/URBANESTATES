const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendOTPEmail } = require('../services/emailService');

/**
 * Helper: Send JWT token in both JSON response and HTTP-only cookie.
 */
const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id, user.role);

    // HTTP-only cookie options (secure in production)
    const cookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    };
    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        token
    });
};

/**
 * Helper: Validate password strength
 */
const validatePassword = (password) => {
    if (!password || password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return 'Password must contain at least one special character';
    }
    return null;
};

/**
 * Helper: Hash OTP using SHA-256
 */
const hashOTP = (otp) => {
    return crypto.createHash('sha256').update(otp).digest('hex');
};

/**
 * Helper: Generate, hash, store, and send OTP
 */
const generateAndSendOTP = async (user) => {
    // Generate a 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash and store in user model
    user.verificationOTP = hashOTP(otp);
    user.verificationOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
    user.otpAttempts = 0; // Reset failed attempts
    user.lastOtpSentAt = new Date();

    await user.save({ validateBeforeSave: false });

    // Send email (contains raw OTP)
    const emailResult = await sendOTPEmail(user.email, otp, user.name);
    if (!emailResult.success) {
        throw new Error(`Email delivery failed: ${emailResult.message}`);
    }
};

// @desc    Register a new user (Verification Pending)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // --- Input Validation ---
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();

        if (trimmedName.length < 2 || trimmedName.length > 50) {
            return res.status(400).json({ message: 'Name must be between 2 and 50 characters' });
        }

        // Email format check
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        // Password strength validation
        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        // Role validation
        const validRoles = ['Buyer', 'Seller', 'Agent', 'Lawyer'];
        const selectedRole = role && validRoles.includes(role) ? role : 'Buyer';

        // Check for existing user
        const userExists = await User.findOne({ email: trimmedEmail });
        if (userExists) {
            if (userExists.isVerified) {
                return res.status(409).json({ message: 'An account with this email already exists' });
            }

            // User exists but is NOT verified. We can resend OTP.
            // Check 30s resend cooldown
            if (userExists.lastOtpSentAt && (Date.now() - new Date(userExists.lastOtpSentAt).getTime()) < 30000) {
                return res.status(429).json({ 
                    message: 'Please wait 30 seconds before requesting a new OTP.',
                    verificationPending: true,
                    email: userExists.email
                });
            }

            await generateAndSendOTP(userExists);
            return res.status(200).json({
                message: 'Account pending verification. A new OTP has been sent to your email.',
                verificationPending: true,
                email: userExists.email
            });
        }

        // Create user (unverified by default, password hashed via pre-save hook)
        const user = await User.create({
            name: trimmedName,
            email: trimmedEmail,
            password,
            role: selectedRole,
            isVerified: false
        });

        // Send OTP code
        await generateAndSendOTP(user);

        res.status(201).json({
            message: 'Registration successful! Verification code sent to your email.',
            verificationPending: true,
            email: user.email
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: messages[0] });
        }
        if (error.code === 11000) {
            return res.status(409).json({ message: 'An account with this email already exists' });
        }
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// @desc    Authenticate user & get token (Blocks if unverified)
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const trimmedEmail = email.trim().toLowerCase();

        // Find user and explicitly include password field
        const user = await User.findOne({ email: trimmedEmail }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // --- Verification Check ---
        if (!user.isVerified) {
            // Check resend cooldown
            const timeSinceLastOtp = user.lastOtpSentAt ? Date.now() - new Date(user.lastOtpSentAt).getTime() : Infinity;
            if (timeSinceLastOtp < 30000) {
                const secLeft = Math.ceil((30000 - timeSinceLastOtp) / 1000);
                return res.status(403).json({
                    message: `Email not verified. Please wait ${secLeft} seconds before requesting a new OTP.`,
                    verificationPending: true,
                    email: user.email
                });
            }

            // Cooldown passed, generate and send a fresh OTP automatically
            await generateAndSendOTP(user);

            return res.status(403).json({
                message: 'Account is not verified. A fresh OTP has been sent to your email.',
                verificationPending: true,
                email: user.email
            });
        }

        // Update last login timestamp
        user.lastLogin = new Date();
        await user.save({ validateBeforeSave: false });

        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// @desc    Verify email using OTP code
// @route   POST /api/auth/verify-email
// @access  Public
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Please provide email and OTP code' });
        }

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedOtp = otp.trim();

        const user = await User.findOne({ email: trimmedEmail });
        if (!user) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (user.isVerified) {
            return sendTokenResponse(user, 200, res);
        }

        // Check attempt threshold (max 5)
        if (user.otpAttempts >= 5) {
            // Clear OTP fields immediately to invalidate
            user.verificationOTP = null;
            user.verificationOTPExpires = null;
            user.otpAttempts = 0;
            await user.save({ validateBeforeSave: false });
            return res.status(400).json({ message: 'Maximum verification attempts exceeded. Please request a new OTP.' });
        }

        // Check expiry
        if (!user.verificationOTPExpires || new Date(user.verificationOTPExpires) < Date.now()) {
            return res.status(400).json({ message: 'Verification code has expired. Please request a new code.' });
        }

        // Validate OTP hash
        const hashedInput = hashOTP(trimmedOtp);
        if (user.verificationOTP !== hashedInput) {
            user.otpAttempts += 1;
            await user.save({ validateBeforeSave: false });
            
            const remaining = 5 - user.otpAttempts;
            if (remaining <= 0) {
                // Clear OTP fields
                user.verificationOTP = null;
                user.verificationOTPExpires = null;
                user.otpAttempts = 0;
                await user.save({ validateBeforeSave: false });
                return res.status(400).json({ message: 'Maximum verification attempts exceeded. Please request a new OTP.' });
            }

            return res.status(400).json({ message: `Invalid verification code. ${remaining} attempts remaining.` });
        }

        // Success - Mark as verified and clear OTP credentials
        user.isVerified = true;
        user.verificationOTP = null;
        user.verificationOTPExpires = null;
        user.otpAttempts = 0;
        
        user.lastLogin = new Date();
        await user.save({ validateBeforeSave: false });

        // Authenticate immediately
        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ message: 'Server error during verification' });
    }
};

// @desc    Resend OTP Verification code
// @route   POST /api/auth/resend-otp
// @access  Public
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Please provide email address' });
        }

        const trimmedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: trimmedEmail });
        if (!user) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Email address is already verified' });
        }

        // Cooldown check (30 seconds)
        const timeSinceLastOtp = user.lastOtpSentAt ? Date.now() - new Date(user.lastOtpSentAt).getTime() : Infinity;
        if (timeSinceLastOtp < 30000) {
            const secLeft = Math.ceil((30000 - timeSinceLastOtp) / 1000);
            return res.status(429).json({ message: `Please wait ${secLeft} seconds before requesting a new code.` });
        }

        // Generate and send fresh OTP
        await generateAndSendOTP(user);

        res.json({ message: 'Verification code resent successfully!' });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'Server error during resend' });
    }
};

// @desc    Get current authenticated user's profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            profileImage: req.user.profileImage,
            phone: req.user.phone,
            createdAt: req.user.createdAt
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Logout user — clear JWT cookie
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = async (req, res) => {
    try {
        res.cookie('jwt', 'none', {
            expires: new Date(Date.now() + 5 * 1000), // Expires in 5 seconds
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during logout' });
    }
};

module.exports = { registerUser, authUser, verifyEmail, resendOTP, getMe, logoutUser };
