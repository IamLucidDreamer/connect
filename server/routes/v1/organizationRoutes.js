const express = require("express");
const { protect, authorize } = require("../../middleware/authMiddleware");
const {
  createOrganization,
  updateOrganization,
  getOrganization,
  joinOrganization,
} = require("../../controllers/organizationController");

const router = express.Router();

router.post("/", protect, authorize("admin"), createOrganization);
router.put("/:id", protect, authorize("admin"), updateOrganization);
router.get("/:id", protect, getOrganization);
router.post("/join/:id", protect, joinOrganization);

module.exports = router;
