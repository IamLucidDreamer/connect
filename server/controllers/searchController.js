const User = require("../models/User");
const Connection = require("../models/Connection");
const logger = require("../utils/logger");
const { STATUS_BAD_REQUEST, STATUS_SUCCESS } = require("../config/constants");

const searchUsers = async (req, res) => {
  try {
    const { name } = req.body;
    const { limit = 10, skip = 0 } = req.query;

    const query = {};

    if (name) {
      query.$or = [
        { firstName: new RegExp(name, "i") },
        { lastName: new RegExp(name, "i") },
      ];
    }

    const users = await User.find(query)
      .select("firstName lastName _id profilePicture")
      .lean()
      .limit(limit)
      .skip(skip);

    res
      .status(STATUS_SUCCESS)
      .json({ message: "Search Results Fetched Successfully", data: users });
  } catch (err) {
    logger.error(err.message);
    res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Error searching users", error: err.message });
  } finally {
    logger.info("Search Users API called");
  }
};

const getFilterValues = async (req, res) => {
  try {
    const cities = await User.distinct("address.city");
    const states = await User.distinct("address.state");
    const countries = await User.distinct("address.country");

    res.status(STATUS_SUCCESS).json({
      message: "Filter values fetched successfully",
      data: { cities, states, countries },
    });
  } catch (err) {
    logger.error(err.message);
    res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Error fetching filter values", error: err.message });
  } finally {
    logger.info("Get Filter Values API called");
  }
};

const searchUsersWithFilters = async (req, res) => {
  try {
    const { name, city, state, country } = req.body;
    const { limit = 10, skip = 0 } = req.query;

    const query = {};

    if (name) {
      query.$or = [
        { firstName: new RegExp(name, "i") },
        { lastName: new RegExp(name, "i") },
      ];
    }

    if (city) {
      query["address.city"] = new RegExp(city, "i");
    }

    if (state) {
      query["address.state"] = new RegExp(state, "i");
    }

    if (country) {
      query["address.country"] = new RegExp(country, "i");
    }

    const users = await User.find(query)
      .select("firstName lastName _id profilePicture")
      .lean()
      .limit(limit)
      .skip(skip);

    const count = await User.countDocuments(query);

    // Use Promise.all to resolve all the connection status checks
    const usersWithConnections = await Promise.all(
      users.map(async (user) => {
        const connection = await Connection.findOne({
          $or: [
            { receiver: req.user._id, sender: user._id },
            { sender: req.user._id, receiver: user._id },
          ],
        });

        return {
          ...user,
          connectionStatus: connection ? connection.status : "none",
        };
      })
    );

    res.status(STATUS_SUCCESS).json({
      message: "Search Results Fetched Successfully",
      data: { users: usersWithConnections, count },
    });
  } catch (err) {
    logger.error(err.message);
    res
      .status(STATUS_BAD_REQUEST)
      .json({ message: "Error searching users", error: err.message });
  } finally {
    logger.info("Search Users with Filters API called");
  }
};


module.exports = { searchUsers, getFilterValues, searchUsersWithFilters };
