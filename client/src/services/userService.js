import server from "../helpers/apiCall";

export const getUser = async (userId) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/user/${userId}`)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });
};
