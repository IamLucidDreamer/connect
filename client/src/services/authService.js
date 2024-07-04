import { serverUnauth } from "../helpers/apiCall";

export const sendOtp = async (phoneNumber) => await new Promise((resolve, reject) => {
    serverUnauth
        .post('/send-otp', {
            phoneNumber: phoneNumber,
        })
        .then((response) => {
            resolve(response);
        })
        .catch(reject);
});

export const signup = async (values) => await new Promise((resolve, reject) => {
    serverUnauth
        .post('/signup', values)
        .then((response) => {
            resolve(response);
        })
        .catch(reject);
});

export const forgotPassword = async (values) => await new Promise((resolve, reject) => {
    serverUnauth
        .post('/forgot-password', values)
        .then((response) => {
            resolve(response);
        })
        .catch(reject);
});

export const login = async (values) => await new Promise((resolve, reject) => {
    serverUnauth
        .post('/signin', values)
        .then((response) => {
            resolve(response);
        })
        .catch(reject);
});