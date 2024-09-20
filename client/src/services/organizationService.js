import server from "../helpers/apiCall";

export const getOrganizationDetails = async (organizationId) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/organization/${organizationId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
