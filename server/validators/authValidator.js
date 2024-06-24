const { check } = require('express-validator');

const registerValidation = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

const loginValidation = [
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password').exists().withMessage('Password is required')
];

const refreshTokenValidation = [
    check('token').not().isEmpty().withMessage('Refresh token is required')
];

const otpValidation = [
    check('userId').not().isEmpty().withMessage('User ID is required'),
    check('otp').not().isEmpty().withMessage('OTP is required')
];

const passwordResetValidation = [
    check('userId').not().isEmpty().withMessage('User ID is required'),
    check('otp').not().isEmpty().withMessage('OTP is required'),
    check('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

const forgotPasswordValidation = [
    check('email').isEmail().withMessage('Please include a valid email')
];

module.exports = {
    registerValidation,
    loginValidation,
    refreshTokenValidation,
    otpValidation,
    passwordResetValidation,
    forgotPasswordValidation
};
