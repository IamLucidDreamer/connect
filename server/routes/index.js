const express = require("express");
const authRoutes = require("./v1/authRoutes");
const userRoutes = require("./v1/userRoutes");
const organizationRoutes = require("./v1/organizationRoutes");
const searchRoutes = require("./v1/searchRoutes");
const connectionsRoutes = require("./v1/connectionRoutes")

const router = express.Router();

// Version 1 routes
router.use("/v1/auth", authRoutes);
router.use("/v1/user", userRoutes);
router.use("/v1/organization", organizationRoutes);
router.use("/v1/search", searchRoutes);
router.use("/v1/connections", connectionsRoutes);

module.exports = router;
