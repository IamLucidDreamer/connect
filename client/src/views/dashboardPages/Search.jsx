import React, { useEffect, useState } from "react";
import {
  getFilterValues,
  searchWithFilters,
} from "../../services/searchService";

const Search = () => {
  const [filterValue, setFilerValue] = useState({});
  const [users, setUsers] = useState([]);

  const getFilterValuesFn = async () => {
    try {
      const response = await getFilterValues();
      if (response.status >= 200 && response.status < 300) {
        setFilerValue(response.data?.data);
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

  useEffect(() => {
    getFilterValuesFn();
    searchUsers();
  }, []);

  console.log(users?.users, "Hellow");

  return (
    <div>
      Search
      <div>
        {users?.users?.map((user) => {
          return <div key={user._id}>{user.firstName}</div>;
        })}
      </div>
    </div>
  );
};

export default Search;
