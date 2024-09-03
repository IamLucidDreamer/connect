const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { STATUS_UNAUTHORIZED, ERRORS } = require("../config/constants");
const logger = require("../utils/logger");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      logger.error(error.message);
      res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: ERRORS.AUTH.NOT_AUTHORIZED });
    }
  }

  if (!token) {
    logger.error(ERRORS.AUTH.NO_TOKEN);
    res
      .status(STATUS_UNAUTHORIZED)
      .json({ message: ERRORS.AUTH.NOT_AUTHORIZED });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: ERRORS.AUTH.NOT_AUTHORIZED });
    }
    next();
  };
};

const checkUserOrAdmin = (req, res, next) => {
  const { userId } = req.params;
  const loggedInUserId = req.user._id;
  const userRole = req.user.role;

  if (loggedInUserId.toString() === userId || userRole === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({
      message: "Access denied: You are not authorized to perform this action.",
    });
};

module.exports = { protect, authorize, checkUserOrAdmin };
