const User = require("../models/User");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
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
} = require("../config/constants");
const sendEmail = require("../utils/sendEmails");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

const generateRefreshToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);
  if (!user.refreshTokens) {
    user.refreshTokens = [];
  }
  if (user.refreshTokens.length >= 5) {
    user.refreshTokens = user.refreshTokens.slice(-4);
  }
  user.refreshTokens.push({ token });

  return token;
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      logger.warn(ERRORS.USER.USER_EXISTS);
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: ERRORS.USER.USER_EXISTS });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const otp = user.generateOTP();
    await user.save();

    // Send OTP to user's email
    await sendEmail(
      user.email,
      "Email Verification OTP",
      "../templates/otpEmail.html",
      { OTP: otp }
    );

    logger.info(`OTP sent to ${user.email}`);
    res.status(STATUS_CREATED).json({
      message: "OTP sent to email",
      data: { userId: user._id },
    });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("User registration API called");
  }
};

const verifyOTP = async (req, res) => {
  const { userId, otp, otpVerificationId } = req.body;

  try {
    const user = await User.findById(userId);

    if (
      !user ||
      user.otp !== otp ||
      user.otpExpires < Date.now() ||
      user.otpVerificationId !== otpVerificationId
    ) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Either the OTP is Invalid or Expired." });
    }

    // OTP is valid
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpVerificationId = undefined;
    user.isEmailVerified = true;
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user);
    const responseUser = user.toJSON();

    logger.info(REGISTRATION_SUCCESS);
    res.status(STATUS_SUCCESS).json({
      message: REGISTRATION_SUCCESS,
      data: {
        ...responseUser,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("OTP verification API called");
  }
};

const resendOTP = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    const otp = user.generateOTP();
    await user.save();

    // Send OTP to user's email
    await sendEmail(
      user.email,
      "Resend Email Verification OTP",
      "../templates/otpEmail.html",
      { OTP: otp }
    );

    logger.info(`Resend OTP sent to ${user.email}`);
    res.status(STATUS_SUCCESS).json({ message: "OTP resent to email" });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Resend OTP API called");
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

      const responseUser = user.toJSON();

      logger.info(LOGIN_SUCCESS);
      res.status(STATUS_SUCCESS).json({
        message: LOGIN_SUCCESS,
        data: {
          ...responseUser,
          accessToken,
          refreshToken,
        },
      });
    } else {
      logger.warn(ERRORS.AUTH.AUTHENTICATION_FAILED);
      res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: ERRORS.AUTH.AUTHENTICATION_FAILED });
    }
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("User authentication API called");
  }
};

const refreshTokens = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(STATUS_BAD_REQUEST)
      .json({ message: ERRORS.AUTH.TOKEN_MISSING });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: ERRORS.AUTH.TOKEN_MISSING });
    }

    const tokenIndex = user.refreshTokens.findIndex((rt) => rt.token === token);

    if (tokenIndex === -1) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: ERRORS.AUTH.TOKEN_MISSING });
    }

    const accessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshTokens[tokenIndex] = { token: newRefreshToken };
    await user.save();

    res.status(STATUS_SUCCESS).json({
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    res
      .status(STATUS_UNAUTHORIZED)
      .json({ message: ERRORS.AUTH.TOKEN_MISSING });
  } finally {
    logger.info("Token refresh API called");
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    const otp = user.generateOTP();
    await user.save();

    // Send OTP to user's email
    await sendEmail(
      user.email,
      "Password Reset OTP",
      "../templates/passwordResetEmail.html",
      { OTP: otp }
    );

    logger.info(`OTP sent to ${user.email} for password reset`);
    res
      .status(STATUS_SUCCESS)
      .json({ message: "OTP sent to email", data: { userId: user._id } });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Forgot password API called");
  }
};

const resetPassword = async (req, res) => {
  const { userId, otp, newPassword, otpVerificationId } = req.body;

  try {
    const user = await User.findById(userId);

    if (
      !user ||
      user.otp !== otp ||
      user.otpExpires < Date.now() ||
      user.otpVerificationId !== otpVerificationId
    ) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpVerificationId = undefined;
    await user.save();

    logger.info("Password reset successfully");
    res.status(STATUS_SUCCESS).json({ message: "Password reset successfully" });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Password reset API called");
  }
};

const checkEmailVerification = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    res.status(STATUS_SUCCESS).json({
      message: "User Email has been verified.",
      data: { isEmailVerified: user.isEmailVerified },
    });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Check email verification API called");
  }
};

module.exports = {
  registerUser,
  verifyOTP,
  resendOTP,
  authUser,
  refreshTokens,
  forgotPassword,
  resetPassword,
  checkEmailVerification,
};
