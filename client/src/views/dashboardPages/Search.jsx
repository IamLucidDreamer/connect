import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getFilterValues,
  searchWithFilters,
} from "../../services/searchService";
import ConnectionButtons from "../../components/connections/ConnectionButtons";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const searchKeyword = useSelector((state) => state.search.searchKeyword);
  const loggedInUser = useSelector((state) => state.user);
  const [filterValue, setFilterValue] = useState({});
  const [filter, setFilter] = useState({});
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

  console.log(filter);

  const searchUsers = async () => {
    try {
      const response = await searchWithFilters({
        name: searchKeyword,
        ...filter,
      });
      if (response.status >= 200 && response.status < 300) {
        setUsers(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFilterValuesFn();
    searchUsers();
  }, []);

  useEffect(() => {
    searchUsers();
  }, [filter, searchKeyword]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl mb-4 font-regular">Search Results</h2>
      <div className="flex justify-between items-center my-6">
        <div className="flex gap-2 items-center ">
          <h3>Country :</h3>
          <select
            className="bg-none border-b border-gray-500 p-0.5 rounded-lg"
            onChange={(e) =>
              setFilter({ ...filter, countries: e.target.value })
            }
          >
            <option value={null}>Remove</option>
            {filterValue?.countries?.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <h3>State :</h3>
          <select
            className="bg-none border-b border-gray-500 p-0.5 rounded-lg"
            onChange={(e) => setFilter({ ...filter, states: e.target.value })}
          >
            <option value={null}>Remove</option>
            {filterValue?.states?.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <h3>City :</h3>
          <select
            className="bg-none border-b border-gray-500 p-0.5 rounded-lg"
            onChange={(e) => setFilter({ ...filter, cities: e.target.value })}
          >
            <option value={null}>Remove</option>
            {filterValue?.cities?.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {users?.users?.map((user) => (
          <div
            key={user._id}
            className="rounded-xl shadow-lg bg-white/60 p-4 backdrop-blur-2xl flex items-center justify-center flex-col"
          >
            {user?._id === loggedInUser?._id && (
              <h1 className="absolute top-4 right-4 border rounded-full px-2 border-primary bg-primary bg-opacity-5 text-primary text-xs">
                You
              </h1>
            )}

            <img
              src={
                user.profilePicture ||
                "https://static.vecteezy.com/system/resources/previews/000/422/799/original/avatar-icon-vector-illustration.jpg"
              }
              alt={`${user.firstName} ${user.lastName}`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex items-center">
              <div>
                <h2 className="text-lg font-semibold text-center">
                  {user.firstName} {user.lastName}
                </h2>
                <h2 className="text-center font-medium">
                  {user.introLine || "Alumns User"}
                </h2>
                <p className="text-gray-500 capitalize text-center">
                  {user._id !== loggedInUser._id &&
                    `Connection :
                  ${
                    user.connectionStatus === "none"
                      ? "Not Connected"
                      : user.connectionStatus
                  }`}
                </p>
              </div>
            </div>
            {user._id !== loggedInUser._id ? (
              <ConnectionButtons user={user} updateFn={searchUsers} />
            ) : (
              <button
                onClick={() => {
                  navigate(`/dashboard/profile`);
                }}
                className="text-white bg-primary text-sm px-4 py-2 rounded-md hover:bg-blue-800 mt-4"
              >
                View Profile
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
