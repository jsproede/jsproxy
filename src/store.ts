import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requests: [],
    requestIndex: -1,
  },
  mutations: {
    selectRequest(state: any, { id }): void {
      state.requestIndex = id;
    },
    addRequest(state: any, payload): void {
      state.requests.push(payload.req);
    },
    clearRequests(state: any): void {
      state.requests = [];
    },
  },
  actions: {},
});
