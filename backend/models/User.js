const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    role: {
        type: String,
        enum: {
            values: ['Buyer', 'Seller', 'Agent', 'Lawyer', 'Admin'],
            message: '{VALUE} is not a valid role'
        },
        default: 'Buyer'
    },
    profileImage: {
        type: String,
        default: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
    },
    phone: { type: String, trim: true },
    lastLogin: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
    verificationOTP: { type: String, default: null },
    verificationOTPExpires: { type: Date, default: null },
    otpAttempts: { type: Number, default: 0 },
    lastOtpSentAt: { type: Date, default: null }
}, { timestamps: true });

// Hash password before saving (bcrypt with salt rounds 12 for production security)
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return user object without sensitive fields
userSchema.methods.toPublic = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model('User', userSchema);
