const express = require("express");
const { protect } = require("../../middleware/authMiddleware");
const { getPresignedUrl } = require("../../controllers/awsController");

const router = express.Router();

router.get("/get-presigned-url", protect, getPresignedUrl);

module.exports = router;
