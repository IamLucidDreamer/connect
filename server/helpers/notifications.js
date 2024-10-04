const Notification = require("../models/Notification");
const logger = require("../utils/logger");

const addNotification = async (receiverId , notificationMessage) => {
    try {
        const newNotification = new Notification();
        newNotification.recipient = receiverId;
        newNotification.message = notificationMessage;
        await newNotification.save();
        logger.info("Notification added successfully");
        return newNotification;
    } catch (error) {
        logger.error(error.message);
        throw new Error(error.message);
    }
}