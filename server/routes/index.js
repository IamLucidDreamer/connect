const express = require("express");
const authRoutes = require("./v1/authRoutes");
const userRoutes = require("./v1/userRoutes");
const organizationRoutes = require("./v1/organizationRoutes");

const router = express.Router();

// Version 1 routes
router.use("/v1/auth", authRoutes);
router.use("/v1/user", userRoutes);
router.use("/v1/organization", organizationRoutes);

module.exports = router;
