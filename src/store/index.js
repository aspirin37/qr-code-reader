import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isMenuShown: false,
        errorMessage: '',
        user: null,
        scannedDocumentNumber: null,
    },
    mutations: {
        toggleMenu: state => {
            state.isMenuShown = !state.isMenuShown;
        },
        hideMenu: state => {
            state.isMenuShown = false;
        },
        logIn: (state, payload) => {
            state.user = payload;
        },
        showErrorMessage: (state, payload) => {
            state.errorMessage = payload;
        },
        changeScannedDocumentNumber: (state, payload) => {
            state.scannedDocumentNumber = payload;
        },
    },
});

export default store;
