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
const Organization = require("../models/Organization");

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
  const {
    firstName,
    middleName,
    lastName,
    organizationName,
    organizationDescription,
    email,
    password,
  } = req.body;

  try {
    const userExists = await User.findOne({ email });
    const organizationExists = await Organization.findOne({
      name: organizationName,
    });

    if (userExists) {
      logger.warn(ERRORS.USER.USER_EXISTS);
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: ERRORS.USER.USER_EXISTS });
    }

    if (organizationExists) {
      logger.warn(ERRORS.ORGANIZATION.ORGANIZATION_EXISTS);
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: ERRORS.ORGANIZATION.ORGANIZATION_EXISTS });
    }

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      password,
    });

    const otp = user.generateOTP();
    await user.save();

    if (organizationName) {
      const organization = new Organization({
        name: organizationName,
        description: "Default Organization" || organizationDescription,
        admin: user._id,
        members: [user._id],
      });

      await organization.save();
      await User.findByIdAndUpdate(user._id, {
        organization: organization._id,
      });
    }

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
      userId: user._id,
    });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  }
};

const verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isEmailVerified = true;
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user);

    logger.info(REGISTRATION_SUCCESS);
    res.status(STATUS_SUCCESS).json({
      message: REGISTRATION_SUCCESS,
      _id: user._id,
      firstName : user.firstName,
      middleName : user.middleName,
      lastName : user.lastName,
      email: user.email,
      emailVerified: user.isEmailVerified,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
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
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
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

    const refreshTokenExists = user.refreshTokens.some(
      (rt) => rt.token === token
    );

    if (!refreshTokenExists) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: ERRORS.AUTH.TOKEN_MISSING });
    }

    user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== token);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user);
    await user.save();

    res.status(STATUS_SUCCESS).json({
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res
      .status(STATUS_UNAUTHORIZED)
      .json({ message: ERRORS.AUTH.TOKEN_MISSING });
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
      .json({ message: "OTP sent to email", userId: user._id });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  }
};

const resetPassword = async (req, res) => {
  const { userId, otp, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
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

    res.status(STATUS_SUCCESS).json({ isEmailVerified: user.isEmailVerified });
  } catch (error) {
    logger.error(error.message || ERRORS.SERVER.INTERNAL_ERROR);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
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
