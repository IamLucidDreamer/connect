const Organization = require("../models/Organization");
const User = require("../models/User");
const UserOrganizationRelation = require("../models/UserOrganizationRelation");
const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_SERVER_ERROR,
  ERRORS,
  STATUS_NOT_FOUND,
} = require("../config/constants");
const logger = require("../utils/logger");
const sendEmail = require("../utils/sendEmails");

const getUsersOrganizations = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(STATUS_BAD_REQUEST).json({
        message: "User ID is required.",
      });
    }

    const userOrganizations = await UserOrganizationRelation.find({
      userId,
    }).populate("organizationId");

    if (userOrganizations.length === 0) {
      return res.status(STATUS_SUCCESS).json({
        message: "User has not joined any organizations.",
        data: [],
      });
    }

    res.status(STATUS_SUCCESS).json({
      message: "User organizations fetched successfully.",
      data: userOrganizations,
    });
  } catch (error) {
    logger.error("Error fetching user organizations:", error);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Get user organizations API called");
  }
};

const getOrganization = async (req, res) => {
  const { organizationId } = req.params;

  if (!organizationId) {
    return res.status(STATUS_BAD_REQUEST).json({
      message: "Organization ID is required.",
    });
  }

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(STATUS_NOT_FOUND).json({
        message: "Organization not found.",
      });
    }

    res.status(STATUS_SUCCESS).json({
      message: "Organization fetched successfully.",
      data: organization,
    });
  } catch (error) {
    logger.error("Error fetching organization:", error);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Get organization API called");
  }
};

const getAllOrganizationsNames = async (req, res) => {
  try {
    const organizations = await Organization.find().select(["name", "_id"]);
    res.status(STATUS_SUCCESS).json({
      message: "Organization Name fetched successfully",
      data: [...organizations] || [],
    });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Get all organizations names fetched");
  }
};

const createOrganizationsInBulk = async (req, res) => {
  const { organizations } = req.body; // Expecting an array of organizations

  // Validate the request body
  if (!Array.isArray(organizations) || organizations.length === 0) {
    return res.status(STATUS_BAD_REQUEST).json({
      message: "Please provide an array of organizations.",
    });
  }

  try {
    // Prepare organization documents without admin and members fields
    const organizationDocs = organizations.map((org) => {
      return {
        name: org.name,
        type: org.type,
        email: org.email,
        website: org.website,
        location: org.location,
        contactNumber: org.contactNumber,
        establishmentYear: org.establishmentYear,
        registeredGovtId: org.registeredGovtId,
        industry: org.industry,
      };
    });
    const createdOrganizations = await Organization.insertMany(
      organizationDocs
    );

    res.status(STATUS_CREATED).json({
      message: `${createdOrganizations.length} organizations created successfully`,
      data: createdOrganizations,
    });
  } catch (error) {
    logger.error("Error creating organizations in bulk:", error);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Bulk organization creation API called");
  }
};

const sendOtpForAdminAssignment = async (req, res) => {
  const { email, organizationId, password } = req.body;

  // Validate inputs
  if (!email || !organizationId || !password) {
    return res.status(STATUS_BAD_REQUEST).json({
      message: "Email, Password, and Organization ID are required.",
    });
  }

  try {
    // Check if the organization exists
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(STATUS_NOT_FOUND).json({
        message: "Organization not found.",
      });
    }

    if (organization.email !== email) {
      return res.status(STATUS_BAD_REQUEST).json({
        message:
          "Email does not match with the organization email. Contact Support if you are the organization Admin.",
      });
    }

    // Check if the user exists
    let user = await User.findOne({ email });

    // If user does not exist, create a new user
    if (!user) {
      user = new User({
        email,
        password,
        firstName: organization.name,
        lastName: "Admin",
        isEmailVerified: false, // Initially not verified
        role: "user", // Initial role
      });

      // Save the new user
      await user.save();
      logger.info(`New user created with email: ${email}`);
    }

    // Generate OTP and save to user
    const otp = user.generateOTP();
    await user.save();

    // Send OTP to user's email
    await sendEmail(
      user.email,
      "Email Verification OTP to claim your Organization",
      "../templates/otpEmail.html",
      { OTP: otp }
    );

    res.status(STATUS_SUCCESS).json({
      message: "OTP sent successfully to the user's email.",
      data: {
        userId: user._id,
        otpVerificationId: user.otpVerificationId,
        organizationId: organization._id,
      },
    });
  } catch (error) {
    logger.error("Error sending OTP for admin assignment:", error);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("OTP for admin assignment API called");
  }
};

const verifyOtpAndAssignAdmin = async (req, res) => {
  const { email, organizationId, otp, otpVerificationId } = req.body;

  if (!email || !organizationId || !otp) {
    return res.status(STATUS_BAD_REQUEST).json({
      message: "Email, Organization ID, and OTP are required.",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(STATUS_NOT_FOUND).json({
        message: "User not found.",
      });
    }

    if (
      user.otp !== otp ||
      user.otpExpires < Date.now() ||
      user.otpVerificationId !== otpVerificationId
    ) {
      return res.status(STATUS_BAD_REQUEST).json({
        message: "OTP is invalid or expired.",
      });
    }

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(STATUS_NOT_FOUND).json({
        message: "Organization not found.",
      });
    }

    let userOrganizationRelation = await UserOrganizationRelation.findOne({
      userId: user._id,
      organizationId,
    });

    if (userOrganizationRelation) {
      userOrganizationRelation.role = "admin";
      await userOrganizationRelation.save();
    } else {
      userOrganizationRelation = new UserOrganizationRelation({
        userId: user._id,
        organizationId,
        role: "admin",
        isApproved: true,
      });
      await userOrganizationRelation.save();
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpVerificationId = undefined;
    user.isEmailVerified = true;
    await user.save();

    const responseUser = user.toJSON();
    const responseOrganization = organization.toObject();

    res.status(STATUS_SUCCESS).json({
      message:
        "User has been successfully assigned as the admin of the organization.",
      data: {
        user: responseUser,
        organization: { ...responseOrganization, isAdmin: true },
      },
    });
  } catch (error) {
    logger.error("Error verifying OTP and assigning admin:", error);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Verify OTP and assign admin API called");
  }
};

const updateOrganization = async (req, res) => {
  const { organizationId, updates } = req.body;
  const userId = req.user._id;

  if (!userId || !organizationId || !updates) {
    return res.status(STATUS_BAD_REQUEST).json({
      message: "User ID, Organization ID, and updates are required.",
    });
  }

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(STATUS_NOT_FOUND).json({
        message: "Organization not found.",
      });
    }

    const userOrganizationRelation = await UserOrganizationRelation.findOne({
      userId,
      organizationId,
      role: "admin",
    });

    if (!userOrganizationRelation) {
      return res.status(STATUS_FORBIDDEN).json({
        message: "You are not authorized to update this organization.",
      });
    }

    const restrictedFields = ["name", "email"];
    restrictedFields.forEach((field) => {
      if (updates[field]) {
        delete updates[field];
      }
    });

    Object.keys(updates).forEach((key) => {
      organization[key] = updates[key];
    });

    await organization.save();

    res.status(STATUS_SUCCESS).json({
      message: "Organization updated successfully.",
      data: organization,
    });
  } catch (error) {
    logger.error("Error updating organization:", error);
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  } finally {
    logger.info("Organization update API called");
  }
};

const joinOrganization = async (req, res) => {
  const { organizationId, role = "member" } = req.body;
  const { userId } = req.user;

  if (!userId || !organizationId) {
    return res.status(400).send("User ID and Organization ID are required.");
  }

  if (!["member", "admin"].includes(role)) {
    return res
      .status(400)
      .send('Invalid role. Valid roles are "member" and "admin".');
  }

  try {
    const userExists = await User.exists({ _id: userId });
    const organizationExists = await Organization.exists({
      _id: organizationId,
    });

    if (!userExists) {
      return res.status(404).send("User not found.");
    }

    if (!organizationExists) {
      return res.status(404).send("Organization not found.");
    }

    const userOrganization = new UserOrganization({
      userId,
      organizationId,
      role,
    });

    await userOrganization.save();

    res.status(201).send("User has successfully joined the organization.");
  } catch (error) {
    // Handle unique constraint error (duplicate entry)
    if (error.code === 11000) {
      return res
        .status(409)
        .send("User is already a member of this organization.");
    }

    console.error("Error joining organization:", error);
    res
      .status(500)
      .send("An error occurred while trying to join the organization.");
  } finally {
    logger.info("User joining organization API Called");
  }
};

const getMembers = async (req, res) => {
  const { organizationId } = req.params;
  try {
    const members = await UserOrganizationRelation.find({
      organizationId,
      isApproved: true,
    }).populate("userId", "firstName lastName email");

    res.status(STATUS_SUCCESS).json({
      message: "Members fetched successfully.",
      data: members,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    res
      .status(STATUS_SERVER_ERROR)
      .send("An error occurred while trying to fetch members.");
  } finally {
    logger.info("Get members API called");
  }
};

const getMembersToApprove = async (req, res) => {
  const { organizationId } = req.params;
  try {
    const members = await UserOrganizationRelation.find({
      organizationId,
      isApproved: false,
    }).populate("userId", "firstName lastName email");

    res.status(STATUS_SUCCESS).json({
      message: "Members awaiting approval fetched successfully.",
      data: members,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    res
      .status(STATUS_SERVER_ERROR)
      .send("An error occurred while trying to fetch members.");
  } finally {
    logger.info("Get members API called");
  }
};

const approveMember = async (req, res) => {
  const { organizationId } = req.params;
  const { userId } = req.body;
  try {
    const userOrganization = await UserOrganizationRelation.findOne({
      userId,
      organizationId,
    });

    if (!userOrganization) {
      return res.status(STATUS_NOT_FOUND).send("User is not a member of this organization.");
    }

    userOrganization.isApproved = true;
    await userOrganization.save();

    res.status(STATUS_SUCCESS).send("User has been approved.");
  } catch (error) {
    console.error("Error approving member:", error);
    res
      .status(STATUS_SERVER_ERROR)
      .send("An error occurred while trying to approve member.");
  } finally {
    logger.info("Approve member API called");
  }
};

module.exports = {
  getUsersOrganizations,
  getOrganization,
  getAllOrganizationsNames,
  createOrganizationsInBulk,
  sendOtpForAdminAssignment,
  verifyOtpAndAssignAdmin,
  updateOrganization,
  joinOrganization,
  getMembers,
  getMembersToApprove,
  approveMember
};
