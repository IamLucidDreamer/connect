import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

export const reSendOtp = async (userId) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/resend-otp`, {
        userId: userId,
      })
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });

export const signup = async (values) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/register`, values)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });

export const verifyOtp = async (values) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/verify-otp`, values)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });

export const forgotPassword = async (values) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/forgot-password`, values)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });

export const resetPassword = async (values) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/reset-password`, values)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });

export const login = async (values) =>
  await new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/auth/login`, values)
      .then((response) => {
        resolve(response);
      })
      .catch(reject);
  });
