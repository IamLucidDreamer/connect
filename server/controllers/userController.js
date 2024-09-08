const User = require("../models/User");
const {
  STATUS_SUCCESS,
  STATUS_BAD_REQUEST,
  STATUS_SERVER_ERROR,
  ERRORS,
} = require("../config/constants");
const logger = require("../utils/logger");

const getUser = async (req, res) => {
  const { userId } = req.params;
  const authenticatedUserId = req.user._id; // Assuming req.user contains the authenticated user data

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }
    const isSelf = authenticatedUserId.toString() === userId;

    const { password, otp, otpExpires, ...safeData } = user.toObject();
    const userData = isSelf
      ? { ...safeData }
      : {
          _id: user._id,
          firstName: user.firstName,
          middleName: user.middleName || null,
          lastName: user.lastName || null,
          email: user.email,
          emailVerified: user.isEmailVerified,
          bio: user.bio || null,
          gender: user.gender || null,
          profilePicture: user.profilePicture || null,
          education: user.education || null,
          professional: user.professional || null,
          socialLinks: user.socialLinks || null,
        };

    res.status(STATUS_SUCCESS).json({
      message: "User fetched successfully.",
      data: { user: userData },
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error fetching User details" });
  } finally {
    logger.info("Get User Details API Called");
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { user } = req.body;

  const { password, otp, otpExpires, refreshTokens, email, isEmailVerified, isPhoneVerified , ...safeData }  = user;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: safeData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(STATUS_NOT_FOUND).json({ message: "User not found" });
    }

    const { password, otp, otpExpires, refreshTokens, ...updatedSafeData } = updatedUser.toObject();

    res.status(STATUS_SUCCESS).json({ message: "User updated successfully", data: updatedSafeData });
  } catch (error) {
    logger.error(`Error updating user ${userId}: ${error.message}`);
    res.status(STATUS_SERVER_ERROR).json({ message: error.message });
  } finally {
    logger.info(`User Update API Called for userId: ${userId}`);
  }
};


// Education CRUD operations
const addEducation = async (req, res) => {
  const { education } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    user.education.push(education);
    await user.save();

    res.status(STATUS_SUCCESS).json({
      message: "Education added successfully",
      data: user.education || [],
    });
  } catch (error) {
    logger.error(error.message);
    res.status(STATUS_SERVER_ERROR).json({ message: "Error adding education" });
  } finally {
    logger.info("Education added API Called");
  }
};

const getEducation = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    res.status(STATUS_SUCCESS).json({
      message: "User Education details fetched successfully.",
      data: user.education || [],
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error fetching education details" });
  } finally {
    logger.info("Education Retrive API Called");
  }
};

const updateEducation = async (req, res) => {
  const { educationId, education } = req.body;
  const userId = req.user._id;

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
      data: user.education || [],
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error updating education" });
  } finally {
    logger.info("Education Update API Called");
  }
};

const deleteEducation = async (req, res) => {
  const { educationId } = req.body;
  const userId = req.user._id;

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
      data: user.education || [],
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error deleting education" });
  } finally {
    logger.info("Education Delete API Called");
  }
};

// Professional CRUD operations
const addProfessional = async (req, res) => {
  const { professional } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    user.professional.push(professional);
    await user.save();

    res.status(STATUS_SUCCESS).json({
      message: "Professional details added successfully",
      data: user.professional || [],
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error adding professional details" });
  } finally {
    logger.info("Professional Details Added API Called");
  }
};

const getProfessional = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    res.status(STATUS_SUCCESS).json({
      message: "User Professional details fetched successfully.",
      data: user.professional || [],
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error fetching professional details" });
  } finally {
    logger.info("Professional Details Retrive API Called");
  }
};

const updateProfessional = async (req, res) => {
  const { professionalId, professional } = req.body;
  const userId = req.user._id;

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
      data: user.professional || [],
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error updating professional details" });
  } finally {
    logger.info("Professional Details Update API Called");
  }
};

const deleteProfessional = async (req, res) => {
  const { professionalId } = req.body;
  const userId = req.user._id;

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
      data: user.professional || [],
    });
  } catch (error) {
    logger.error(error.message);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: "Error deleting professional details" });
  } finally {
    logger.info("Professional Details Delete API Called");
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
  } finally {
    logger.info("Follow User API Called");
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
  } finally {
    logger.info("Unfollow User API Called");
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
  } finally {
    logger.info("Get Followers API Called");
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
  } finally {
    logger.info("Get Following API Called");
  }
};

// Get a list of users to recommend to the current user
const getRecommendationList = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).populate("following");

    if (!currentUser) {
      return res.status(STATUS_BAD_REQUEST).json({ message: "User not found" });
    }

    // Fetch recommendations directly from the database
    const usersToRecommend = await User.find({
      _id: { $nin: [...currentUser.following, req.user._id] },
      organizations: { $in: currentUser.organizations },
      batch: currentUser.batch,
    }).select("name email");

    res.status(STATUS_SUCCESS).json({ recommendations: usersToRecommend });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Get Recommendation List API Called");
  }
};

module.exports = {
  getUser,
  updateUser,
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
};
