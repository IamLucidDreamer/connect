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
    deleteProfessional
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

module.exports = router;
