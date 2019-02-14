import axios from 'axios';
import store from '../store';

const axiosInstance = axios.create({
    baseURL: 'https://api200.azure-api.net/dilogic/',
    withCredentials: true,
    headers: { 'Ocp-Apim-Subscription-Key': 'b5feaf37a83544bc9b9a16fc86ab0d85' },
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
