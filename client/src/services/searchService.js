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
