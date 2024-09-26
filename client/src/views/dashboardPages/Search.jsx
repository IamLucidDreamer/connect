import React, { useEffect, useState } from "react";
import { getFilterValues, searchWithFilters } from "../../services/searchService";

const Search = () => {
  const [filterValue, setFilerValue] = useState({});

  const getFilterValuesFn = async () => {
    try {
      const response = await getFilterValues();
      if (response.status >= 200 && response.status < 300) {
        setFilerValue(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await searchWithFilters();
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilterValuesFn();
    searchUsers();
  }, []);

  console.log(filterValue);

  return (
    <div>
      Search
      <div></div>
    </div>
  );
};

export default Search;
