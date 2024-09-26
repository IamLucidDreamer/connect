import server from "../helpers/apiCall";

export const sendConnectionRequest = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.post("/connections", data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const acceptConnectionRequest = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.put("/connections/approve", data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const rejectConnectionRequest = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.put("/connections/reject-remove", data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getConnectionRequests = async (status, blocked) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.get(
        `/connections?${status ? `status=${status}` : ""}${
          blocked ? `&blocked=${blocked}` : ""
        }`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
