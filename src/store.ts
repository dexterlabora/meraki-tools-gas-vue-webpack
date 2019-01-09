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
    apiKey: "093b24e85df15a3e66f1fc359f4c48493eaa1b73", // Meraki Sandbox
    apiUrl: "https://api.meraki.com/api/v0",
    client: {},
    clients: [],
    device: {},
    devices: [],
    net: {},
    nets: [],
    org: {},
    orgs: [],
    ssid: {},
    ssids: [],
    timespan: "7200",
    loading: false
  },
  mutations: {
    setApiKey: (state, payload) => {
      state.apiKey = payload;
      meraki.setApiKey(payload);
    },
    setApiUrl(state, payload) {
      state.apiUrl = payload;
      meraki.setDomain(payload);
    },
    setClient(state, payload) {
      state.client = payload;
    },
    setClients: (state, payload) => (state.clients = payload),
    setDevice(state, payload) {
      state.device = payload;
    },
    setDevices: (state, payload) => (state.devices = payload),
    setOrg(state, payload) {
      state.org = payload;
    },
    setOrgs: (state, payload) => (state.orgs = payload),
    setNet(state, payload) {
      state.net = payload;
    },
    setNets: (state, payload) => (state.nets = payload),
    setSsid(state, payload) {
      state.ssid = payload;
    },
    setSsids: (state, payload) => (state.ssids = payload),
    setClients: (state, payload) => (state.clients = payload),
    setTimespan(state, payload) {
      state.timespan = payload;
    },
    setAdminMode: (state, payload) => (state.adminMode = payload),
    setLoading: (state, payload) => (state.loading = payload)
  },
  plugins: []
});
