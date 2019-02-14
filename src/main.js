import 'core-js'; // ie11
import Vue from 'vue';
import bModal from 'bootstrap-vue/es/components/modal/modal';

import App from './App';
import router from './router';
import store from './store';
import axiosInstance from './api';

import './styles/app.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.component('b-modal', bModal);
Vue.prototype.$http = axiosInstance;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
