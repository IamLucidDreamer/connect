const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Ensure you have this import

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    refreshTokens: [{
        token: String,
        expires: Date
    }],
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET);
    this.refreshTokens.push({ token, expires: null }); // No expiration
    return token;
};

// Method to generate OTP
userSchema.methods.generateOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    this.otp = otp;
    this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    return otp;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
