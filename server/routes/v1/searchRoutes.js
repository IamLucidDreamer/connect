const express = require("express");
const { protect } = require("../../middleware/authMiddleware");
const {
  searchUsers,
  getFilterValues,
  searchUsersWithFilters,
} = require("../../controllers/searchController");
const router = express.Router();

router.post("/", protect, searchUsers);
router.get("/filter-values", protect, getFilterValues);
router.post("/filter", protect, searchUsersWithFilters);

module.exports = router;
