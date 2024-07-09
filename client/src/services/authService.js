import server from "../helpers/apiCall";

export const sendOtp = async (phoneNumber) => await new Promise((resolve, reject) => {
    server
        .post('/send-otp', {
            phoneNumber: phoneNumber,
        })
        .then((response) => {
            resolve(response);
        })
        .catch(reject);
});

export const signup = async (values) => await new Promise((resolve, reject) => {
    server
        .post('/auth/register', values)
        .then((response) => {
            resolve(response);
        })
        .catch(reject);
});

export const forgotPassword = async (values) => await new Promise((resolve, reject) => {
    server
        .post('/forgot-password', values)
        .then((response) => {
            resolve(response);
        })
        .catch(reject);
});

export const login = async (values) => await new Promise((resolve, reject) => {
    server
        .post('/signin', values)
        .then((response) => {
            resolve(response);
        })
        .catch(reject);
});