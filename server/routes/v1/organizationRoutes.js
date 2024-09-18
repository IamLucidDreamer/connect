const express = require("express");
const { protect, authorize } = require("../../middleware/authMiddleware");
const {
  getOrganization,
  getAllOrganizationsNames,
  createOrganizationsInBulk,
  sendOtpForAdminAssignment,
  verifyOtpAndAssignAdmin,
  updateOrganization,
  joinOrganization,
} = require("../../controllers/organizationController");

const router = express.Router();

router.get("/:organizationId", protect, getOrganization);
router.get("/get-all/names", getAllOrganizationsNames);
router.post("/bulk-create", createOrganizationsInBulk);
router.post("/send-otp", protect, sendOtpForAdminAssignment);
router.post("/verify-otp", protect, verifyOtpAndAssignAdmin);
router.put("/update/:organizationId", protect, updateOrganization);
router.post("/join/:organizationId", protect, joinOrganization);

module.exports = router;
