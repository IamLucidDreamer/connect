const express = require('express');
const { registerUser,verifyOTP, authUser, refreshTokens,forgotPassword, resetPassword, checkEmailVerification, resendOTP } = require('../../controllers/authController');
const { registerValidation, loginValidation, refreshTokenValidation, otpValidation,passwordResetValidation, otpResendValidation, forgotPasswordValidation } = require('../../validators/authValidator');
const validate = require('../../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', validate(registerValidation), registerUser);
router.post('/verify-otp', validate(otpValidation), verifyOTP);
router.post('/resend-otp', validate(otpResendValidation), resendOTP);
router.post('/login', validate(loginValidation), authUser);
router.post('/refresh-token', validate(refreshTokenValidation), refreshTokens);
router.post('/forgot-password', validate(forgotPasswordValidation), forgotPassword);
router.post('/reset-password', validate(passwordResetValidation), resetPassword);
router.get('/check-email-verification/:userId', checkEmailVerification);
 

module.exports = router;
