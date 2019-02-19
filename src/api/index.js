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
        Promise.reject(response);
    },
);

axiosInstance.interceptors.response.use(
    response => {
        if (response.statusCode === 404) return Promise.reject(response);
        return response.data;
    },
    error => {
        store.commit('showErrorMessage', error);
        Promise.reject(response);
    },
);

export default axiosInstance;
