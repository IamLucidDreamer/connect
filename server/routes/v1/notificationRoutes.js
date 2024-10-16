const express = require("express");
const { protect } = require("../../middleware/authMiddleware");
const { getNotificationsOfUser, markNotificationsAsRead } = require("../../controllers/notificationController");
const router = express.Router();

router.get("/", protect, getNotificationsOfUser);
router.post("/mark-read", protect, markNotificationsAsRead);


module.exports = router;
