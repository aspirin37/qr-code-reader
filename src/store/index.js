import Vue from 'vue';
import Vuex from 'vuex';
//import {usersStore} from '@/users/usersStore';
//import {groupsStore} from '@/groups/groupsStore';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export default store;
