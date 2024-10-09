const express = require("express");
const { protect } = require("../../middleware/authMiddleware");
const {
  getOrganization,
  getAllOrganizationsNames,
  createOrganizationsInBulk,
  sendOtpForAdminAssignment,
  verifyOtpAndAssignAdmin,
  updateOrganization,
  joinOrganization,
  getUsersOrganizations,
  getMembers,
  approveMember,
  getMembersToApprove,
} = require("../../controllers/organizationController");

const router = express.Router();

router.get("/for-users", protect, getUsersOrganizations );
router.get("/:organizationId", protect, getOrganization);
router.get("/get-names", getAllOrganizationsNames);
router.post("/bulk-create", createOrganizationsInBulk);
router.post("/send-otp", sendOtpForAdminAssignment);
router.post("/verify-otp", verifyOtpAndAssignAdmin);
router.put("/update/:organizationId", protect, updateOrganization);
router.post("/join/:organizationId", protect, joinOrganization);

router.get('/members/:organizationId', protect, getMembers);
router.get('/members-to-approve/:organizationId', protect, getMembersToApprove);
router.post('/approve-member/:organizationId', protect, approveMember);

module.exports = router;
