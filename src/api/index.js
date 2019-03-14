import axios from 'axios';
import store from '../store';

const headers = process.env.API_TOKEN ? { 'Ocp-Apim-Subscription-Key': process.env.API_TOKEN } : null;

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    headers,
});

axiosInstance.interceptors.request.use(
    config => config,
    error => {
        store.commit('showErrorMessage', error.message);
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    response => response.data,
    error => {
        const message = error.response.data.Error ? error.response.data.Error.message : error.message;
        store.commit('showErrorMessage', message);
        return Promise.reject(error);
    },
);

export default axiosInstance;
