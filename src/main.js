import "material-design-icons-iconfont/dist/material-design-icons.css"; // works in dev but not build -- css loader issue?
//import "font-awesome/css/font-awesome.min.css"; // Ensure you are using css-loader
//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";
import './plugins/vuetify'
import Router from "./router.ts";
import App from "./app.vue";
import Store from "./store.ts";

//import { setDomain } from "./meraki-api.js";

import * as meraki from "./meraki-api.js";
meraki.setDomain("https://merakidemo.internetoflego.com/meraki/proxy");
//meraki.setDomain("https://api.meraki.com/api/v0");
meraki.setApiKey("093b24e85df15a3e66f1fc359f4c48493eaa1b73");
Vue.prototype.$meraki = meraki;

import "./plugins/vuetify";

new Vue({
  router: Router,
  store: Store,
  el: "#app",
  render: h => h(App)
}).$mount("#app");
