import server from "../helpers/apiCall";

export const getUserNotifications = async (limit, skip) => {
  return new Promise((resolve, reject) => {
    server
      .get(`/notifications?limit=${limit}&skip=${skip}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const markNotificationAsRead = async (notificationIds) => {
  return new Promise((resolve, reject) => {
    server
      .post(`/notifications/mark-read`, {
        notifications: [...notificationIds],
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};