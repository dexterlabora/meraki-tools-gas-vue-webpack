import Vue from "vue";
//import "./plugins/vuetify.ts";
import Router from "./router.ts";
//import App from "./app.axios.vue";
import App from "./app.vue";
import Store from "./store.ts";

import Vuetify from "vuetify";
Vue.use(Vuetify, {
  iconfont: "md"
});

// old
import * as meraki from "./meraki-api.js";
//meraki.setDomain("https://mp.meraki.com/api/v0");
meraki.setApiKey(
  Store.state.apiKey || "093b24e85df15a3e66f1fc359f4c48493eaa1b73"
); // demo API key

import merakiSdk from "./lib";

const configuration = merakiSdk.Configuration;

// For Local Development
console.log("process.env.VUE_APP_SERVICE ", process.env.VUE_APP_SERVICE);
if (process.env.VUE_APP_SERVICE == "dev") {
  Store.commit("setApiUrl", "http://localhost:8085/api");
  meraki.setService("dev");
}

Vue.prototype.$meraki = meraki;
Vue.prototype.$merakiSdk = merakiSdk;

import * as utilities from "./utilities.js";
Vue.prototype.$utilities = utilities;

new Vue({
  router: Router,
  store: Store,
  el: "#app",
  created() {
    // old
    this.$meraki.setDomain(this.$store.state.apiUrl);
    this.$meraki.setApiKey(this.$store.state.apiKey);

    // new
    configuration.xCiscoMerakiAPIKey = this.$store.state.apiKey;
    configuration.BASEURI = this.$store.state.apiUrl;
  },
  render: h => h(App)
}).$mount("#app");
