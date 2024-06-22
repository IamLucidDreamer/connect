const User = require("../models/User")
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const {
    STATUS_SUCCESS,
    STATUS_CREATED,
    STATUS_BAD_REQUEST,
    STATUS_UNAUTHORIZED,
    STATUS_SERVER_ERROR,
    REGISTRATION_SUCCESS,
    LOGIN_SUCCESS,
    ERRORS,
    ACCESS_TOKEN_EXPIRATION,
} = require('../config/constants');

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
};

const generateRefreshToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    user.refreshTokens.push({ token });
    return token;
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        console.log(typeof User)
        const userExists = await User.findOne({ email});

        if (userExists) {
            logger.warn(ERRORS.USER.USER_EXISTS);
            return res.status(STATUS_BAD_REQUEST).json({ message: ERRORS.USER.USER_EXISTS });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user);
        await user.save();

        logger.info(REGISTRATION_SUCCESS);
        res.status(STATUS_CREATED).json({
            message: REGISTRATION_SUCCESS,
            data : {
            _id: user._id,
            name: user.name,
            email: user.email,
            accessToken,
            refreshToken,
            }
        });
    } catch (error) {
        logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
        res.status(STATUS_SERVER_ERROR).json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user);
            await user.save();

            logger.info(LOGIN_SUCCESS);
            res.status(STATUS_SUCCESS).json({
                message: LOGIN_SUCCESS,
                data:{
                _id: user._id,
                name: user.name,
                email: user.email,
                accessToken,
                refreshToken,
                }
            });
        } else {
            logger.warn(ERRORS.AUTH.AUTHENTICATION_FAILED);
            res.status(STATUS_UNAUTHORIZED).json({ message: ERRORS.AUTH.AUTHENTICATION_FAILED });
        }
    } catch (error) {
        logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
        res.status(STATUS_SERVER_ERROR).json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
    }
};


const refreshTokens = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(STATUS_BAD_REQUEST).json({ message: ERRORS.AUTH.TOKEN_MISSING });
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(STATUS_UNAUTHORIZED).json({ message: ERRORS.AUTH.TOKEN_MISSING });
        }

        const refreshTokenExists = user.refreshTokens.some(rt => rt.token === token);

        if (!refreshTokenExists) {
            return res.status(STATUS_UNAUTHORIZED).json({ message: ERRORS.AUTH.TOKEN_MISSING });
        }

        user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== token);
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user);
        await user.save();

        res.status(STATUS_SUCCESS).json({data: {
            accessToken,
            refreshToken,
        }
        });
    } catch (error) {
        res.status(STATUS_UNAUTHORIZED).json({ message: ERRORS.AUTH.TOKEN_MISSING });
    }
};


module.exports = {
    registerUser,
    authUser,
    refreshTokens,
}