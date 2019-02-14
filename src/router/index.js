import Vue from 'vue';
import Router from 'vue-router';
import ScanTTN from '@/pages/ScanTTN';
import CarList from '@/pages/CarList';
import LogIn from '@/pages/LogIn';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/log-in',
            name: 'Log in',
            component: LogIn,
        },
        {
            path: '/scan-TTN',
            name: 'Scan TTN',
            component: ScanTTN,
        },
        {
            path: '/car-list/document/:documentNumber',
            name: 'Car list',
            component: CarList,
            props: true,
        },
        {
            path: '*',
            redirect: '/log-in',
        },
    ],
});
