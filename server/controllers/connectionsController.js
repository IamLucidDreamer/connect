const Connection = require("../models/Connection");
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_SERVER_ERROR,
  STATUS_SUCCESS,
} = require("../config/constants");
const logger = require("../utils/logger");
const { addNotification } = require("../helpers/notifications");

const getConnectionRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status } = req.query;

    let query = {
      $or: [{ sender: userId }, { receiver: userId }],
    };

    if (status) {
      switch (status) {
        case "accepted":
          query.status = "accepted";
          break;
        case "pending":
          query.status = "pending";
          query.sender = userId;
          break;
        case "received":
          query.status = "pending";
          query.receiver = userId;
          break;
        case "sent":
          query.status = "pending";
          query.sender = userId;
          break;
        case "blocked":
          query.status = "blocked";
          break;
        default:
          query.status = "pending";
          break;
      }
    }

    const connections = await Connection.find(query)
      .populate("sender", "firstName lastName profilePicture introLine")
      .populate("receiver", "firstName lastName profilePicture introLine")
      .lean();

    const response = connections.map((connection) => {
      let actionRequired = null;
      let otherUser = null;

      if (connection.sender._id.toString() === userId.toString()) {
        otherUser = connection.receiver;
        if (connection.status === "pending") {
          actionRequired = "waiting";
        }
      } else if (connection.receiver._id.toString() === userId.toString()) {
        otherUser = connection.sender;
        if (connection.status === "pending") {
          actionRequired = "accept";
        }
      }

      return {
        otherUser,
        status: connection.status,
        actionRequired,
        createdAt: connection.createdAt,
      };
    });

    // Return response
    if (response.length === 0) {
      return res
        .status(STATUS_SUCCESS)
        .json({ message: "No connection requests found", data: [] });
    }

    res.status(STATUS_SUCCESS).json({
      message: "Connection requests found",
      data: response,
    });
  } catch (error) {
    res.status(STATUS_SERVER_ERROR).json({
      message: "Error fetching connection requests",
      error: error.message,
    });
  }
};

const sendConnectionRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    if (senderId === receiverId) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You cannot send a connection request to yourself" });
    }

    if (!receiverId) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Receiver ID is required" });
    }

    const existingConnection = await Connection.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existingConnection) {
      if (existingConnection.status === "pending") {
        return res
          .status(STATUS_BAD_REQUEST)
          .json({ message: "Connection request already sent" });
      }
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Connection already exists" });
    }

    const connection = new Connection({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    await connection.save();

    await addNotification(
      receiverId,
      `You have a new connection request from ${req.user.firstName} ${req.user.lastName}`
    );

    res.status(STATUS_SUCCESS).json({ message: "Connection request sent" });
  } catch (error) {
    logger.error(error.message);
    res.status(STATUS_SERVER_ERROR).json({
      message: "Error sending connection request",
      error: error.message,
    });
  }
};

const approveConnectionRequest = async (req, res) => {
  try {
    const { connectionId } = req.body;
    const receiverId = req.user.id;

    const connection = await Connection.findOne({
      _id: connectionId,
      $or: [{ sender: receiverId }, { receiver: receiverId }],
      status: "pending",
    });

    if (!connection) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Connection request not found" });
    }

    connection.status = "accepted";
    await connection.save();

    await addNotification(
      connection.sender,
      `${req.user.firstName} ${req.user.lastName} has accepted your connection request`
    );

    res.status(STATUS_SUCCESS).json({ message: "Connection request approved" });
  } catch (error) {
    res.status(STATUS_SERVER_ERROR).json({
      message: "Error approving connection request",
      error: error.message,
    });
  }
};

const rejectOrRemoveConnection = async (req, res) => {
  try {
    const { connectionId } = req.body;
    const userId = req.user.id;

    const connection = await Connection.findOne({
      _id: connectionId,
      $or: [{ sender: userId }, { receiver: userId }],
    });

    if (!connection) {
      return res
        .status(STATUS_NOT_FOUND)
        .json({ message: "Connection not found" });
    }

    await connection.deleteOne();

    res.status(STATUS_SUCCESS).json({ message: "Connection removed" });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error removing connection", error: error.message });
  }
};

module.exports = {
  getConnectionRequests,
  sendConnectionRequest,
  approveConnectionRequest,
  rejectOrRemoveConnection,
};
