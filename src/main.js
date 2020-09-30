import Vue from "vue";
import Router from "./router.ts";
import App from "./app.vue";
import Store from "./store.js";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

console.log("process.env.VUE_APP_SERVICE ", process.env.VUE_APP_SERVICE);
if (process.env.VUE_APP_SERVICE === "dev") {
  console.log("Running in developmnet mode");
} else {
  console.log("Running in production mode");

  if (google) {
    // Log to "USER" Google Apps Logs
    //console.log = Logger.log; // doesn't work
  } else {
    console.log = () => "google service not available";
  }
  // console.log = function(e) {
  //   return e;
  // }; // ********   DISABLES console.log
}
import merakiSdk from "meraki";
Vue.prototype.$merakiSdk = merakiSdk;

import * as utilities from "./utilities.js";

Vue.prototype.$utilities = utilities;

new Vue({
  router: Router,
  store: Store,
  el: "#app",

  created() {
    if (!this.$store.state.apiKey) {
      // set sandbox key if not defined
      this.$store.commit(
        "setApiKey",
        "093b24e85df15a3e66f1fc359f4c48493eaa1b73"
      );
    }
    //https://api-mp.meraki.com/api/v0
    // if (!this.$store.state.apiUrl) {
    //   // set sandbox key if not defined
    //   if (process.env.VUE_APP_SERVICE === "dev") {
    //     this.$store.commit("setApiUrl", "http://localhost:8080/api");
    //   } else {
    //     this.$store.commit("setApiUrl", "https://api-mp.meraki.com/api/v1");
    //   }
    // }

    if (process.env.VUE_APP_API_URL ) {
      this.$store.commit("setApiUrl", process.env.VUE_APP_API_URL);
    }

    merakiSdk.Configuration.xCiscoMerakiAPIKey = this.$store.state.apiKey;
    merakiSdk.Configuration.BASEURI = this.$store.state.apiUrl;
  },

  vuetify,
  render: h => h(App)
}).$mount("#app");
