import Vue from "vue";
import Router from "./router.ts";
import App from "./app.vue";
import Store from "./store.js";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify, {
  iconfont: "md"
});

console.log("process.env.VUE_APP_SERVICE ", process.env.VUE_APP_SERVICE);
if (process.env.VUE_APP_SERVICE === "dev") {
  console.log("Running in developmnet mode");
} else {
  console.log("Running in production mode");
  // hide all console.log() outputs. (complies with Google and general security best practices)
  if (google) {
    // Log to "USER" Google Apps Logs
    //console.log = Logger.log; // doesn't work
  } else {
    console.log = () => "";
  }
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
    merakiSdk.Configuration.xCiscoMerakiAPIKey = this.$store.state.apiKey;
    merakiSdk.Configuration.BASEURI = this.$store.state.apiUrl;
  },
  render: h => h(App)
}).$mount("#app");
