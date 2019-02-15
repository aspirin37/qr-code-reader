import axios from 'axios';
import store from '../store';

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    headers: { 'Ocp-Apim-Subscription-Key': process.env.API_TOKEN },
});

axiosInstance.interceptors.request.use(
    config => config,
    error => {
        store.commit('showErrorMessage', error);
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    response => response.data,
    error => {
        store.commit('showErrorMessage', error);
        return Promise.reject(error);
    },
);

export default axiosInstance;