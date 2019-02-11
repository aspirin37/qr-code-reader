import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isMenuShown: false,
    },
    mutations: {
        toggleMenu: state => {
            state.isMenuShown = !state.isMenuShown;
        },
        hideMenu: state => {
            state.isMenuShown = false;
        },
    },
});

export default store;
