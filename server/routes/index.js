const express = require("express");
const authRoutes = require("./v1/authRoutes");
const userRoutes = require("./v1/userRoutes");
const organizationRoutes = require("./v1/organizationRoutes");
const searchRoutes = require("./v1/searchRoutes");
const connectionsRoutes = require("./v1/connectionRoutes");
const notificationsRoutes = require("./v1/notificationRoutes");
const postRoutes = require("./v1/postsRoutes");
const awsRoutes = require("./v1/awsRoutes");

const router = express.Router();

// Version 1 routes
router.use("/v1/auth", authRoutes);
router.use("/v1/user", userRoutes);
router.use("/v1/organization", organizationRoutes);
router.use("/v1/search", searchRoutes);
router.use("/v1/connections", connectionsRoutes);
router.use("/v1/notifications", notificationsRoutes);
router.use("/v1/posts", postRoutes);
router.use("/v1/aws", awsRoutes);

module.exports = router;
