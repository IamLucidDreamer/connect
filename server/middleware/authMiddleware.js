const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { STATUS_UNAUTHORIZED, ERRORS } = require('../config/constants');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(STATUS_UNAUTHORIZED).json({ message: ERRORS.AUTH.NOT_AUTHORIZED });
        }
    }

    if (!token) {
        res.status(STATUS_UNAUTHORIZED).json({ message: ERRORS.AUTH.NOT_AUTHORIZED });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(STATUS_UNAUTHORIZED).json({ message: ERRORS.AUTH.NOT_AUTHORIZED });
        }
        next();
    };
};

module.exports = { protect, authorize };
