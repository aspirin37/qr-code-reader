import Vue from 'vue';
import Router from 'vue-router';
import ScanTTN from '@/pages/ScanTTN';
import ShipmentConfirmation from '@/pages/ShipmentConfirmation';
import CarList from '@/pages/CarList';
import LogIn from '@/pages/LogIn';
import Warning from '@/pages/Warning';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/warning',
            name: 'Warning',
            component: Warning,
        },
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
            path: '/shipment-confirmation',
            name: 'Shipment confirmation',
            component: ShipmentConfirmation,
        },
        {
            path: '/car-list',
            name: 'Car list',
            component: CarList,
        },
        {
            path: '*',
            redirect: '/log-in',
        },
    ],
});
