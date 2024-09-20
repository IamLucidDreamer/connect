const User = require("../models/User"); // Adjust the path as needed

// Search users based on body parameters like name and location
const searchUsers = async (req, res) => {
  try {
    // Get search parameters from the request body
    const { name, city, state, country } = req.body;

    // Build the query object dynamically
    const query = {};

    // Search by name (firstName or lastName)
    if (name) {
      query.$or = [
        { firstName: new RegExp(name, "i") }, // Case-insensitive search
        { lastName: new RegExp(name, "i") }
      ];
    }

    // Search by city
    if (city) {
      query["address.city"] = new RegExp(city, "i"); // Case-insensitive search
    }

    // Search by state
    if (state) {
      query["address.state"] = new RegExp(state, "i");
    }

    // Search by country
    if (country) {
      query["address.country"] = new RegExp(country, "i");
    }

    // Execute the search query
    const users = await User.find(query)
      .select("firstName lastName _id profilePicture") // Exclude sensitive fields
      .lean();

    // Return search results
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error searching users", error: err.message });
  }
};

module.exports = { searchUsers };


module.exports = { searchUsers };
