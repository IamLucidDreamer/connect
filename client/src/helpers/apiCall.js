import axios from 'axios';
import { getAuthToken } from './auth';
import { refreshToken } from './apiCallHerlper';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

export const server = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 600000,
  headers: {
    'Access-Control-Allow-Origin': process.env.REACT_APP_BASE_URL,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

server.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (process.env.REACT_APP_API_WITH_CREDENTIALS === 'true') {
      config.withCredentials = true;
    }
    return config;
  },
  (error) => Promise.reject(error),
);


server.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const newAccessToken = await refreshToken()
      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return server(originalRequest)
      }
    }
    return Promise.reject(error)
  }
)

export default server;