import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import * as meraki from "./meraki-api.js";
import * as merakiSdk from "./lib";

const configuration = merakiSdk.Configuration;

Vue.use(Vuex);
// *****
// Central State Mangement
// In addition to storing the state of the UI, the Google Scripts will use the environment variables as stored.
// *****
export default new Vuex.Store({
  state: {
    apiKey: "", // Meraki Sandbox
    apiUrl: "https://api.meraki.com/api/v0",
    actionBatch: {},
    actionBatches: [],
    beta: false,
    bleClient: {},
    bleClients: [],
    client: {},
    clients: [],
    device: {},
    devices: [],
    displayJson: false,
    firewalledService: "",
    input: "",
    method: "",
    model: "",
    net: {},
    nets: [],
    org: {},
    orgs: [],
    ssid: {},
    ssids: [],
    switchPort: {},
    switchPorts: [],
    timespan: "7200",
    t0: 0,
    t1: 0,
    vlan: {},
    vlans: [],
    zone: {},
    zones: [],
    loading: false
  },
  mutations: {
    setApiKey: (state, payload) => {
      state.apiKey = payload;
      meraki.setApiKey(payload);
      configuration.xCiscoMerakiAPIKey = payload;
    },
    setApiUrl(state, payload) {
      state.apiUrl = payload;
      meraki.setDomain(payload);
      configuration.BASEURI = payload;
    },
    setActionBatch(state, payload) {
      state.actionBatch = payload;
    },
    setActionBatches: (state, payload) => (state.actionBatches = payload),
    setClient(state, payload) {
      state.client = payload;
    },
    setClients: (state, payload) => (state.clients = payload),
    setBleClient(state, payload) {
      state.bleClient = payload;
    },
    setBeta(state, payload) {
      state.beta = payload;
    },
    setBleClients: (state, payload) => (state.bleClients = payload),
    setDevice(state, payload) {
      state.device = payload;
    },
    setDevices: (state, payload) => (state.devices = payload),
    setDisplayJson: (state, payload) => (state.displayJson = payload),
    setNet(state, payload) {
      state.net = payload;
    },
    setInput(state, payload) {
      state.input = payload;
    },
    setMethod: (state, payload) => (state.method = payload),
    setModel: (state, payload) => (state.model = payload),
    setNets: (state, payload) => (state.nets = payload),
    setOrg(state, payload) {
      state.org = payload;
    },

    setOrgs: (state, payload) => (state.orgs = payload),
    setFirewalledService: (state, payload) =>
      (state.firewalledService = payload),
    setSsid(state, payload) {
      state.ssid = payload;
    },
    setSsids: (state, payload) => (state.ssids = payload),
    setTimespan(state, payload) {
      state.timespan = payload;
    },
    setT0(state, payload) {
      state.t0 = payload;
    },
    setT1(state, payload) {
      state.t1 = payload;
    },
    setSwitchPort: (state, payload) => (state.switchPort = payload),
    setSwitchPorts: (state, payload) => (state.switchPorts = payload),
    setVlan: (state, payload) => (state.vlan = payload),
    setVlans: (state, payload) => (state.vlans = payload),
    setZone(state, payload) {
      state.zone = payload;
    },
    setZones: (state, payload) => (state.zones = payload),
    setLoading: (state, payload) => (state.loading = payload)
  },
  plugins: [
    createPersistedState({
      getState: key => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3 })
    })
  ]
});
