const express = require('express');
const { protect } = require('../../middleware/authMiddleware');
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
} = require('../../controllers/userController');

const router = express.Router();

// Education routes
router.post('/education', protect, addEducation);
router.get('/education/:userId', protect, getEducation);
router.put('/education', protect, updateEducation);
router.delete('/education', protect, deleteEducation);

// Professional routes
router.post('/professional', protect, addProfessional);
router.get('/professional/:userId', protect, getProfessional);
router.put('/professional', protect, updateProfessional);
router.delete('/professional', protect, deleteProfessional);

// Follow routes
router.post('/follow/:id', protect, followUser);
router.post('/unfollow/:id', protect, unfollowUser);
router.get('/followers/:userId', protect, getFollowers);
router.get('/following/:userId', protect, getFollowing);

// Recommendation route
router.get('/recommendations', protect, getRecommendationList);

module.exports = router;
