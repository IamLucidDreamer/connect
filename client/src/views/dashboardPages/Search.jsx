import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getFilterValues,
  searchWithFilters,
} from "../../services/searchService";
import {
  sendConnectionRequest,
  rejectConnectionRequest,
  acceptConnectionRequest,
} from "../../services/connectionService";
import { toast } from "react-toastify";

const Search = () => {
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
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
      const response = await searchWithFilters({
        name: searchKeyword,
        ...filterValue,
      });
      if (response.status >= 200 && response.status < 300) {
        setUsers(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendRequest = async (receiverId) => {
    try {
      const response = await sendConnectionRequest({ receiverId });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Connection request sent successfully");
        searchUsers(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  const handleCancelRequest = async (connectionId) => {
    try {
      const response = await rejectConnectionRequest({ connectionId });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Connection request cancelled successfully");
        searchUsers(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error cancelling connection request:", error);
    }
  };

  const handleAcceptRequest = async (connectionId) => {
    try {
      const response = await acceptConnectionRequest({ connectionId });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Connection request accepted successfully");
        searchUsers(); // Refresh the users list
      }
    } catch (error) {
      console.error("Error accepting connection request:", error);
    }
  };

  useEffect(() => {
    getFilterValuesFn();
    searchUsers();
  }, []);

  useEffect(() => {
    searchUsers();
  }, [filterValue, searchKeyword]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Users</h1>
      <div className="flex justify-between items-center my-6">
        <select
          onChange={(e) =>
            setFilterValue({ ...filterValue, countries: e.target.value })
          }
        >
          <option value={null}>Remove</option>
          {filterValue?.countries?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          onChange={(e) =>
            setFilterValue({ ...filterValue, states: e.target.value })
          }
        >
          <option value={null}>Remove</option>
          {filterValue?.states?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          onChange={(e) =>
            setFilterValue({ ...filterValue, cities: e.target.value })
          }
        >
          <option value={null}>Remove</option>
          {filterValue?.cities?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
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
                <p className="text-gray-500 capitalize">
                  {user.connectionStatus}
                </p>
              </div>
            </div>
            <div className="mt-4 space-x-2">
              {user.connectionStatus === "none" && (
                <button
                  onClick={() => handleSendRequest(user._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Send Connection Request
                </button>
              )}

              {user.connectionStatus === "pending" &&
                user.actionRequired === "accept" && (
                  <button
                    onClick={() => handleAcceptRequest(user.connectionId)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Accept Request
                  </button>
                )}

              {user.connectionStatus === "pending" &&
                user.actionRequired === "waiting" && (
                  <button
                    onClick={() => handleCancelRequest(user.connectionId)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Cancel Request
                  </button>
                )}

              {user.connectionStatus === "pending" &&
                user.actionRequired === "accept" && (
                  <button
                    onClick={() => handleAcceptRequest(user.connectionId)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Accept Request
                  </button>
                )}

              {user.connectionStatus === "accepted" && (
                <button
                  onClick={() => handleCancelRequest(user.connectionId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove Connection
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
