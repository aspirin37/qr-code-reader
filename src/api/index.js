import axios from 'axios';
import store from '../store';
import trackError from './track-error';

const headers = {
    'Ocp-Apim-Subscription-Key': process.env.API_TOKEN || null,
};

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    headers,
});

axiosInstance.interceptors.request.use(
    config => {
        store.commit('showPageLoader');
        return config;
    },
    error => {
        store.commit('showErrorMessage', error.message);
        trackError(error);

        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    response => {
        store.commit('hidePageLoader');
        return response.data;
    },
    error => {
        const message = error.response && error.response.data.Error ? error.response.data.Error.message : error.message;

        store.commit('showErrorMessage', message);
        store.commit('hidePageLoader');
        trackError(error);

        return Promise.reject(error);
    },
);

export default axiosInstance;
