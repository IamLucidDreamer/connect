import server from "../helpers/apiCall";

export const reSendOtp = async (userId) =>
  await new Promise((resolve, reject) => {
    server
      .post("/resend-otp", {
        userId: userId,
      })
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });


export const signup = async (values) =>
  await new Promise((resolve, reject) => {
    server
      .post("/auth/register", values)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });

export const verifyOtp = async (values) =>
  await new Promise((resolve, reject) => {
    server
      .post("/auth/verify-otp", values)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });

export const forgotPassword = async (values) =>
  await new Promise((resolve, reject) => {
    server
      .post("/forgot-password", values)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });

export const login = async (values) =>
  await new Promise((resolve, reject) => {
    server
      .post("/auth/login", values)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });
