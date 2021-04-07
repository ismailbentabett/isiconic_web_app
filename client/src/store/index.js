import Vue from 'vue';
import Vuex from 'vuex';
import states from './states';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  states,
  mutations,
  actions,
  getters,


});


