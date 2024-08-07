const User = require("../models/User");
const {
  STATUS_SUCCESS,
  STATUS_BAD_REQUEST,
  STATUS_SERVER_ERROR,
  ERRORS,
} = require("../config/constants");
const logger = require("../utils/logger");

// Education CRUD operations
const addEducation = async (req, res) => {
  const { userId, education } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    user.education.push(education);
    await user.save();

    res.status(STATUS_SUCCESS).json({
      message: "Education added successfully",
      education: user.education,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(STATUS_SERVER_ERROR).json({ message: "Error adding education" });
  }
};

const getEducation = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    res.status(STATUS_SUCCESS).json({ education: user.education });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error fetching education details" });
  }
};

const updateEducation = async (req, res) => {
  const { userId, educationId, education } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    const eduIndex = user.education.findIndex(
      (e) => e._id.toString() === educationId
    );
    if (eduIndex === -1) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Education record not found" });
    }

    user.education[eduIndex] = { ...user.education[eduIndex], ...education };
    await user.save();

    res.status(STATUS_SUCCESS).json({
      message: "Education updated successfully",
      education: user.education,
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error updating education" });
  }
};

const deleteEducation = async (req, res) => {
  const { userId, educationId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    user.education = user.education.filter(
      (e) => e._id.toString() !== educationId
    );
    await user.save();

    res.status(STATUS_SUCCESS).json({
      message: "Education deleted successfully",
      education: user.education,
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error deleting education" });
  }
};

// Professional CRUD operations
const addProfessional = async (req, res) => {
  const { userId, professional } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    user.professional.push(professional);
    await user.save();

    res.status(STATUS_SUCCESS).json({
      message: "Professional details added successfully",
      professional: user.professional,
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error adding professional details" });
  }
};

const getProfessional = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    res.status(STATUS_SUCCESS).json({ professional: user.professional });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error fetching professional details" });
  }
};

const updateProfessional = async (req, res) => {
  const { userId, professionalId, professional } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    const profIndex = user.professional.findIndex(
      (p) => p._id.toString() === professionalId
    );
    if (profIndex === -1) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Professional record not found" });
    }

    user.professional[profIndex] = {
      ...user.professional[profIndex],
      ...professional,
    };
    await user.save();

    res.status(STATUS_SUCCESS).json({
      message: "Professional details updated successfully",
      professional: user.professional,
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error updating professional details" });
  }
};

const deleteProfessional = async (req, res) => {
  const { userId, professionalId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    user.professional = user.professional.filter(
      (p) => p._id.toString() !== professionalId
    );
    await user.save();

    res.status(STATUS_SUCCESS).json({
      message: "Professional details deleted successfully",
      professional: user.professional,
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error deleting professional details" });
  }
};

const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    const currentUser = await User.findById(req.user._id);

    if (currentUser.following.includes(req.params.id)) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You are already following this user" });
    }

    currentUser.following.push(req.params.id);
    userToFollow.followers.push(req.user._id);

    await currentUser.save();
    await userToFollow.save();

    res.status(STATUS_SUCCESS).json({ message: "User followed successfully" });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);

    if (!userToUnfollow) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    const currentUser = await User.findById(req.user._id);

    if (!currentUser.following.includes(req.params.id)) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "You are not following this user" });
    }

    currentUser.following = currentUser.following.filter(
      (userId) => userId.toString() !== req.params.id
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (userId) => userId.toString() !== req.user._id
    );

    await currentUser.save();
    await userToUnfollow.save();

    res
      .status(STATUS_SUCCESS)
      .json({ message: "User unfollowed successfully" });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  }
};

const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "followers",
      "name email"
    );

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    res.status(STATUS_SUCCESS).json({ followers: user.followers });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  }
};

const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "following",
      "name email"
    );

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    res.status(STATUS_SUCCESS).json({ following: user.following });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
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
  deleteProfessional,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
