import server from "../helpers/apiCall";

export const sendConnectionRequest = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.post("/connections/send", data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const acceptConnectionRequest = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.post("/connections/approve", data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const rejectConnectionRequest = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.post("/connections/reject-remove", data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getConnectionRequests = async (status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await server.get(
        `/connections?${status ? `status=${status}` : ""}
        }`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
