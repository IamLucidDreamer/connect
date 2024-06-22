const express = require('express');
const { registerUser, authUser, refreshTokens } = require('../../controllers/authController');
const { registerValidation, loginValidation, refreshTokenValidation } = require('../../validators/authValidator');
const validate = require('../../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', validate(registerValidation), registerUser);
router.post('/login', validate(loginValidation), authUser);
router.post('/refresh-token', validate(refreshTokenValidation), refreshTokens);

module.exports = router;
