const User = require('../models/User');
const { STATUS_SUCCESS, STATUS_BAD_REQUEST, STATUS_SERVER_ERROR } = require('../config/constants');
const logger = require('../utils/logger');

// Education CRUD operations
const addEducation = async (req, res) => {
    const { userId, education } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'User not found' });
        }

        user.education.push(education);
        await user.save();

        res.status(STATUS_SUCCESS).json({ message: 'Education added successfully', education: user.education });
    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_SERVER_ERROR).json({ message: 'Error adding education' });
    }
};

const getEducation = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'User not found' });
        }

        res.status(STATUS_SUCCESS).json({ education: user.education });
    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_SERVER_ERROR).json({ message: 'Error fetching education details' });
    }
};

const updateEducation = async (req, res) => {
    const { userId, educationId, education } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'User not found' });
        }

        const eduIndex = user.education.findIndex(e => e._id.toString() === educationId);
        if (eduIndex === -1) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'Education record not found' });
        }

        user.education[eduIndex] = { ...user.education[eduIndex], ...education };
        await user.save();

        res.status(STATUS_SUCCESS).json({ message: 'Education updated successfully', education: user.education });
    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_SERVER_ERROR).json({ message: 'Error updating education' });
    }
};

const deleteEducation = async (req, res) => {
    const { userId, educationId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'User not found' });
        }

        user.education = user.education.filter(e => e._id.toString() !== educationId);
        await user.save();

        res.status(STATUS_SUCCESS).json({ message: 'Education deleted successfully', education: user.education });
    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_SERVER_ERROR).json({ message: 'Error deleting education' });
    }
};

// Professional CRUD operations
const addProfessional = async (req, res) => {
    const { userId, professional } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'User not found' });
        }

        user.professional.push(professional);
        await user.save();

        res.status(STATUS_SUCCESS).json({ message: 'Professional details added successfully', professional: user.professional });
    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_SERVER_ERROR).json({ message: 'Error adding professional details' });
    }
};

const getProfessional = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'User not found' });
        }

        res.status(STATUS_SUCCESS).json({ professional: user.professional });
    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_SERVER_ERROR).json({ message: 'Error fetching professional details' });
    }
};

const updateProfessional = async (req, res) => {
    const { userId, professionalId, professional } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'User not found' });
        }

        const profIndex = user.professional.findIndex(p => p._id.toString() === professionalId);
        if (profIndex === -1) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'Professional record not found' });
        }

        user.professional[profIndex] = { ...user.professional[profIndex], ...professional };
        await user.save();

        res.status(STATUS_SUCCESS).json({ message: 'Professional details updated successfully', professional: user.professional });
    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_SERVER_ERROR).json({ message: 'Error updating professional details' });
    }
};

const deleteProfessional = async (req, res) => {
    const { userId, professionalId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(STATUS_BAD_REQUEST).json({ message: 'User not found' });
        }

        user.professional = user.professional.filter(p => p._id.toString() !== professionalId);
        await user.save();

        res.status(STATUS_SUCCESS).json({ message: 'Professional details deleted successfully', professional: user.professional });
    } catch (error) {
        logger.error(error.message);
        res.status(STATUS_SERVER_ERROR).json({ message: 'Error deleting professional details' });
    }
};

module.exports = {
    addEducation,
    getEducation,
    updateEducation,
    deleteEducation,
    addProfessional,
    getProfessional,
    updateProfessional,
    deleteProfessional
};
