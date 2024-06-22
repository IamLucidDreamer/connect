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

module.exports = {
    registerValidation,
    loginValidation,
    refreshTokenValidation
};
