import api from "./api";

export const registerUser = (data) => api.post('/auth/register', data);