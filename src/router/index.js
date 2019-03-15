import Vue from 'vue';
import Router from 'vue-router';
import ScanTTN from '@/pages/ScanTTN';
import ShipmentAcceptance from '@/pages/ShipmentAcceptance';
import ShipmentConfirmation from '@/pages/ShipmentConfirmation';
import DocumentsAtWork from '@/pages/DocumentsAtWork';
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
            path: '/shipment-acceptance',
            name: 'Shipment acceptance',
            component: ShipmentAcceptance,
        },
        {
            path: '/shipment-confirmation',
            name: 'Shipment confirmation',
            component: ShipmentConfirmation,
        },
        {
            path: '/documents-at-work',
            name: 'Documents at work',
            component: DocumentsAtWork,
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
