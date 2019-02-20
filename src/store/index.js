import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        isMenuShown: false,
        errorMessage: '',
        isErrorShown: false,
        isScanScreenShown: false,
        scannedDocument: null,
    },

    mutations: {
        toggleMenu: state => {
            state.isMenuShown = !state.isMenuShown;
        },
        hideMenu: state => {
            state.isMenuShown = false;
        },
        logIn: (state, payload) => {
            localStorage.user = JSON.stringify(payload);
            state.user = payload;
        },
        showErrorMessage: (state, payload) => {
            state.errorMessage = payload;
            state.isErrorShown = true;
        },
        clearErrorMessage: state => {
            state.errorMessage = '';
            state.isErrorShown = false;
        },
        changeScannedDocument: (state, payload) => {
            state.scannedDocument = payload;
        },
        showScanScreen: state => {
            state.isScanScreenShown = true;
        },
        hideScanScreen: state => {
            state.isScanScreenShown = false;
            state.errorMessage = '';
            state.isErrorShown = false;
        },
    },

    getters: {
        userArea: state => {
            if (state.user) {
                return state.user.area.description;
            }
            if (localStorage.user) {
                return JSON.parse(localStorage.user).area.description;
            }
            return '';
        },
    },
});

export default store;
