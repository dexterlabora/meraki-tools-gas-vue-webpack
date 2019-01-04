import Vue from "vue";
import Vuex from "vuex";
import * as meraki from "./meraki-api.js";
Vue.use(Vuex);
// *****
// Central State Mangement
// In addition to storing the state of the UI, the Google Scripts will use the environment variables as stored.
// *****
export default new Vuex.Store({
  state: {
    org: {},
    orgs: [],
    net: {},
    nets: [],
    clients: [],
    apiKey: "093b24e85df15a3e66f1fc359f4c48493eaa1b73", // Meraki Sandbox
    timespan: "",
    adminMode: false,
    loading: false
  },
  mutations: {
    setOrg(state, payload) {
      state.org = payload;
    },
    setOrgs: (state, payload) => (state.orgs = payload),
    setNet(state, payload) {
      state.net = payload;
    },
    setNets: (state, payload) => (state.nets = payload),
    setClients: (state, payload) => (state.clients = payload),
    setApiKey: (state, payload) => {
      state.apiKey = payload;
    },
    setTimespan(state, payload) {
      state.timespan = payload;
    },
    setAdminMode: (state, payload) => (state.adminMode = payload),
    setLoading: (state, payload) => (state.loading = payload)
  },
  plugins: []
});
