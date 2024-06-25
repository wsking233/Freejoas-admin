import axios from 'axios';
import CookieManager from './cookieManager';
import config from '../config';

const baseURL = config.baseURL;
const apiVersion = config.apiVersion;
// const token = CookieManager().getCookie('token');

const axiosInstance = axios.create({
    baseURL: `${baseURL}${apiVersion}`,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  axiosInstance.interceptors.request.use(
    // Add a request interceptor
    async (axiosConfig) => {
      // Get the token from the cookie
      const token = CookieManager().getCookie('token');
      if (token) {
        // Set the Authorization header
        axiosConfig.headers.Authorization = `Bearer ${token}`;
      }
      return axiosConfig;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosInstance;


