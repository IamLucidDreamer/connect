const express = require("express");
const { protect } = require("../../middleware/authMiddleware");
const { searchUsers } = require("../../controllers/searchController");
const router = express.Router();

router.post("/", searchUsers);

module.exports = router;
