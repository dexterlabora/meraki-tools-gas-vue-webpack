import Vue from "vue";
//import "./plugins/vuetify.ts";
import Router from "./router.ts";
import App from "./app.vue";
import Store from "./store.ts";

import Vuetify from "vuetify";
Vue.use(Vuetify, {
  iconfont: "md"
});

import * as meraki from "./meraki-api.js";
//meraki.setDomain("https://mp.meraki.com/api/v0");

// For Local Development
console.log("process.env.VUE_APP_SERVICE ", process.env.VUE_APP_SERVICE);
if (process.env.VUE_APP_SERVICE == "axios") {
  Store.commit(
    "setApiUrl",
    "https://merakidemo.internetoflego.com/meraki/proxy"
  );
  meraki.setService("axios");
}

meraki.setApiKey(Store.state.apiKey);
Vue.prototype.$meraki = meraki;

import * as utilities from "./utilities.ts";
Vue.prototype.$utilities = utilities;

new Vue({
  router: Router,
  store: Store,
  el: "#app",
  created() {
    this.$meraki.setDomain(this.$store.state.apiUrl);
    this.$meraki.setApiKey(this.$store.state.apiKey);
  },
  render: h => h(App)
}).$mount("#app");
