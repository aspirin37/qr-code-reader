import 'core-js'; // ie11
import Vue from 'vue';
import bModal from 'bootstrap-vue/es/components/modal/modal';

import App from './App';
import router from './router';
import store from './store';
import VueAppInsights from './application-insights';

import './styles/app.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.component('b-modal', bModal);

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

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
