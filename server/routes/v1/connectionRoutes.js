const express = require("express");
const { protect } = require("../../middleware/authMiddleware");
const {
  sendConnectionRequest,
  approveConnectionRequest,
  rejectOrRemoveConnection,
  getConnectionRequests,
} = require("../../controllers/connectionsController");
const router = express.Router();

router.get("/", protect, getConnectionRequests);
router.post("/send", protect, sendConnectionRequest);
router.post("/approve", protect, approveConnectionRequest);
router.post("/reject-remove", protect, rejectOrRemoveConnection);

module.exports = router;
