const express = require("express");
const {
  protect,
  checkUserOrAdmin,
} = require("../../middleware/authMiddleware");
const {
  addEducation,
  getEducation,
  updateEducation,
  deleteEducation,
  addProfessional,
  getProfessional,
  updateProfessional,
  deleteProfessional,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getRecommendationList,
  getUser,
  updateUser,
} = require("../../controllers/userController");

const router = express.Router();

// User routes
router.get("/:userId", protect, getUser);
router.put("/update/:userId", protect, checkUserOrAdmin, updateUser);

// Education routes
router.post("/education", protect, checkUserOrAdmin, addEducation);
router.get("/education/:userId", protect, getEducation);
router.put("/education", protect, checkUserOrAdmin, updateEducation);
router.delete("/education", protect, checkUserOrAdmin, deleteEducation);

// Professional routes
router.post("/professional", protect, checkUserOrAdmin, addProfessional);
router.get("/professional/:userId", protect, getProfessional);
router.put("/professional", protect, checkUserOrAdmin, updateProfessional);
router.delete("/professional", protect, checkUserOrAdmin, deleteProfessional);

// Follow routes
router.post("/follow/:id", protect, followUser);
router.post("/unfollow/:id", protect, unfollowUser);
router.get("/followers/:userId", protect, getFollowers);
router.get("/following/:userId", protect, getFollowing);

// Recommendation route
router.get("/recommendations", protect, getRecommendationList);

module.exports = router;
