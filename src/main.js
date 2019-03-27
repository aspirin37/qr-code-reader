import Vue from 'vue';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import BSpinner from 'bootstrap-vue/es/components/spinner/spinner';
import VueAppInsights from './application-insights';

import App from './App';
import router from './router';
import store from './store';
import axiosInstance from './api';

import './styles/app.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';

if (process.env.NODE_ENV === 'production') {
    Vue.use(VueAppInsights, {
        config: {
            instrumentationKey: process.env.APP_INS_KEY,
            enableDebug: process.env.APP_INS_DEBUG.toLowerCase() === 'true',
            verboseLogging: process.env.APP_INS_VERBOSE.toLowerCase() === 'true',
            isCookieUseDisabled: true,
        },
        router,
    });
}

Vue.component('b-modal', bModal);
Vue.component('b-spinner', BSpinner);
Vue.prototype.$http = axiosInstance;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
