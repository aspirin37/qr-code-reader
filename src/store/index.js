import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isMenuShown: false,
        errorMessage: '',
        user: null,
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
        ErrorMessage: state => {
            state.errorMessage = '';
        },
    },
});

export default store;
