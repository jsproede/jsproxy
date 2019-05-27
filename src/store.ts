import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    urls: [],
  },
  mutations: {
    addUrl(state: any, payload): void {
      state.urls.push(payload.url);
    },
  },
  actions: {},
});
