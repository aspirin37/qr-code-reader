import 'core-js'; // ie11
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import VueAppInsights from './application-insights';

// if (process.env.NODE_ENV === 'production') {
//   Vue.use(VueAppInsights, {
//     config: {
//       instrumentationKey: process.env.APP_INS_KEY,
//       enableDebug: (process.env.APP_INS_DEBUG).toLowerCase() === "true",
//       verboseLogging: (process.env.APP_INS_VERBOSE).toLowerCase() === "true",
//       isCookieUseDisabled: true,
//     },
//     router
//   });
// }

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
