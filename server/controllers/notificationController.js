const { STATUS_SERVER_ERROR, STATUS_SUCCESS } = require("../config/constants");
const Notification = require("../models/Notification");
const logger = require("../utils/logger");

const getNotificationsOfUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit, skip } = req.query;
    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(limit || 10)
      .skip(skip || 0);
    return res.status(STATUS_SUCCESS).json({
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    logger.error("Error in fetching notifications", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Notifications fetch API called");
  }
};

const markNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const { notifications } = req.body;
    await Notification.updateMany(
      { recipient: userId, status: "pending", _id: { $in: notifications } },
      { status: "read" }
    );
    return res.status(STATUS_SUCCESS).json({
      message: "Notifications marked as read successfully",
    });
  } catch (error) {
    logger.error("Error in marking notification as read", error);
    return res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Internal server error" });
  } finally {
    logger.info("Mark notification as read API called");
  }
};

module.exports = {
  getNotificationsOfUser,
  markNotificationsAsRead,
};
