import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        isMenuShown: false,
        isMenuShownFirstTime: false,
        errorMessage: '',
        isErrorShown: false,
        isScanScreenShown: false,
        isPageLoaderShown: false,
        scannedDocument: null,
    },

    mutations: {
        toggleMenu: state => {
            state.isMenuShown = !state.isMenuShown;
            state.isMenuShownFirstTime = false;
        },
        hideMenu: state => {
            state.isMenuShown = false;
            state.isMenuShownFirstTime = false;
        },
        initMenu: state => {
            state.isMenuShown = true;
            state.isMenuShownFirstTime = true;
        },
        logIn: (state, payload) => {
            state.user = payload;
        },
        showErrorMessage: (state, payload) => {
            if (!state.isErrorShown) {
                state.errorMessage = payload;
                state.isErrorShown = true;
            }
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
        showPageLoader: state => {
            state.isPageLoaderShown = true;
        },
        hidePageLoader: state => {
            state.isPageLoaderShown = false;
        },
    },
});

export default store;
