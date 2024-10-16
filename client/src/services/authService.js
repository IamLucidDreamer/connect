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

export const signup = async (values, organization) =>
  await new Promise((resolve, reject) => {
    if (!organization) {
      axios
        .post(`${BASE_URL}/auth/register`, values)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    } else {
      values.organizationId = values.organizationName;
      axios
        .post(`${BASE_URL}/organization/send-otp`, values)
        .then((response) => {
          sessionStorage.setItem("organizationId", JSON.stringify(values?.organizationId));
          sessionStorage.setItem("userEmail", JSON.stringify(values?.email));
          resolve(response);
        })
        .catch(reject);
    }
  });

export const verifyOtp = async (values) =>
  await new Promise((resolve, reject) => {
    const organizationId = JSON.parse(sessionStorage.getItem("organizationId"));
    if (!organizationId) {
      axios
        .post(`${BASE_URL}/auth/verify-otp`, values)
        .then((response) => {
          resolve(response);
        })
        .catch(reject);
    } else {
      values.organizationId = organizationId;
      values.email = JSON.parse(sessionStorage.getItem("userEmail"));
      axios
        .post(`${BASE_URL}/organization/verify-otp`, values)
        .then((response) => {
          localStorage.removeItem("organizationId");
          localStorage.removeItem("userEmail");
          resolve(response);
        })
        .catch(reject);
    }
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
