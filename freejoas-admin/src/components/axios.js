import axios from 'axios';
import CookieManager from './cookieManager';
import config from '../config';

const baseURL = config.baseURL;
const apiVersion = config.apiVersion;
const token = CookieManager().getCookie('token');

const axiosInstance = axios.create({
    baseURL: `${baseURL}${apiVersion}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    },
});

export default axiosInstance;


