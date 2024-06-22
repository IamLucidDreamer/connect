const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');
const {
    STATUS_UNAUTHORIZED,
    STATUS_FORBIDDEN,
    ERRORS,
} = require('../config/constants');

const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            logger.warn(ERRORS.AUTH.TOKEN_MISSING);
            res.status(STATUS_UNAUTHORIZED).json({ message: ERRORS.AUTH.TOKEN_MISSING });
        }
    }
    if (!token) {
        logger.warn(ERRORS.AUTH.NO_TOKEN);
        res.status(STATUS_FORBIDDEN).json({ message: ERRORS.AUTH.NO_TOKEN });
    }
};

module.exports = { protect };
