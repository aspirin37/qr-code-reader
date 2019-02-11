import Vue from 'vue';
import Router from 'vue-router';
import QRCodeReader from '@/pages/QRCodeReader';
import store from '../store';

Vue.use(Router);

const router = new Router({
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

router.beforeEach((to, from, next) => {
    store.commit('hideMenu');
    next();
});

export default router;
