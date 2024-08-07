const Organization = require("../models/Organization");
const User = require("../models/User");
const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_SERVER_ERROR,
  ERRORS,
} = require("../config/constants");

const createOrganization = async (req, res) => {
  const { name, description } = req.body;

  try {
    const organization = new Organization({
      name,
      description,
      admin: req.user._id,
      members: [req.user._id],
    });

    await organization.save();

    res.status(STATUS_CREATED).json({
      message: "Organization created successfully",
      organization,
    });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  }
};

const updateOrganization = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const organization = await Organization.findById(id);

    if (!organization) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Organization not found" });
    }

    if (organization.admin.toString() !== req.user._id.toString()) {
      return res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: "Not authorized" });
    }

    organization.name = name || organization.name;
    organization.description = description || organization.description;

    await organization.save();

    res.status(STATUS_SUCCESS).json({
      message: "Organization updated successfully",
      organization,
    });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  }
};

const getOrganization = async (req, res) => {
  const { id } = req.params;

  try {
    const organization = await Organization.findById(id).populate(
      "admin members",
      "-password"
    );

    if (!organization) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Organization not found" });
    }

    res.status(STATUS_SUCCESS).json({ organization });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  }
};

const joinOrganization = async (req, res) => {
  const { id } = req.params;

  try {
    const organization = await Organization.findById(id);

    if (!organization) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Organization not found" });
    }

    if (organization.members.includes(req.user._id)) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json({ message: "Already a member" });
    }

    organization.members.push(req.user._id);
    await organization.save();

    res.status(STATUS_SUCCESS).json({
      message: "Joined organization successfully",
      organization,
    });
  } catch (error) {
    res
      .status(STATUS_SERVER_ERROR)
      .json({ message: error.message || ERRORS.SERVER.INTERNAL_ERROR });
  }
};

module.exports = {
  createOrganization,
  updateOrganization,
  getOrganization,
  joinOrganization,
};
