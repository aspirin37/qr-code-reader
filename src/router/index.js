import Vue from 'vue';
import Router from 'vue-router';
import QRCodeReader from '@/pages/QRCodeReader';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'QRCodeReader',
            component: QRCodeReader,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
