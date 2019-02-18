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
            localStorage.user = JSON.stringify(payload);
            state.user = payload;
        },
        showErrorMessage: (state, payload) => {
            state.errorMessage = payload;
        },
        changeScannedDocumentNumber: (state, payload) => {
            state.scannedDocumentNumber = payload;
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
