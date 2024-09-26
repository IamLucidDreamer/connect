import server from "../helpers/apiCall";

export const search = async (keyword, query) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/search/${query ? query : ""}`, { name: keyword })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getFilterValues = async () => {
  return new Promise((resolve, reject) => {
    server
      .get("/search/filter-values")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const searchWithFilters = async (filters, query) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/search/filter/${query ? query : ""}`, filters)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
