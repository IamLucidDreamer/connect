import React, { useEffect, useState } from "react";
import {
  getFilterValues,
  searchWithFilters,
} from "../../services/searchService";
import {
    sendConnectionRequest,
    cancelConnectionRequest,
} from "../../services/connectionService";

const Search = () => {
  const [filterValue, setFilterValue] = useState({});
  const [users, setUsers] = useState([]);

  const getFilterValuesFn = async () => {
    try {
      const response = await getFilterValues();
      if (response.status >= 200 && response.status < 300) {
        setFilterValue(response.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await searchWithFilters();
      if (response.status >= 200 && response.status < 300) {
        setUsers(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendRequest = async (userId) => {
    // try {
    //   const response = await sendConnectionRequest(userId);
    //   if (response.status >= 200 && response.status < 300) {
    //     alert("Connection request sent successfully");
    //     searchUsers(); // Refresh the users list
    //   }
    // } catch (error) {
    //   console.error("Error sending connection request:", error);
    // }
  };

  const handleCancelRequest = async (userId) => {
    // try {
    //   const response = await cancelConnectionRequest(userId);
    //   if (response.status >= 200 && response.status < 300) {
    //     alert("Connection request cancelled successfully");
    //     searchUsers(); // Refresh the users list
    //   }
    // } catch (error) {
    //   console.error("Error cancelling connection request:", error);
    // }
  };

  useEffect(() => {
    getFilterValuesFn();
    searchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users?.users?.map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center">
              <img
                src={user.profilePicture || "/default-profile.png"}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500">{user.connectionStatus}</p>
              </div>
            </div>
            <div className="mt-4">
              {user.connectionStatus === "none" ? (
                <button
                  onClick={() => handleSendRequest(user._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send Connection Request
                </button>
              ) : (
                <button
                  onClick={() => handleCancelRequest(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Cancel Connection Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
