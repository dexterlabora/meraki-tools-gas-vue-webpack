import Vue from "vue";
import Router from "./router.ts";
import App from "./app.vue";
import Store from "./store.js";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

console.log("process.env.VUE_APP_SERVICE ", process.env.VUE_APP_SERVICE);
//console.log("process.env.VUE_APP_API_KEY", process.env.VUE_APP_API_KEY);
if (process.env.VUE_APP_SERVICE === "dev") {
  console.log("Running in developmnet mode");
} else {
  console.log("Running in production mode");


  //   if (google) {
  //     // Log to "USER" Google Apps Logs
  //     //console.log = Logger.log; // doesn't work
  //   } else {
  //     console.log = () => "google service not available";
  //   }
    console.log = function(e) {
      return e;
  

  }
  
}


// import merakiSdk from "meraki";
// Vue.prototype.$merakiSdk = merakiSdk;

import axios from 'axios';
Vue.prototype.$axios = axios;

import * as rh from './request-handler.js'
Vue.prototype.$rh = rh;

import * as utilities from "./utilities.js";

Vue.prototype.$utilities = utilities;

new Vue({
  router: Router,
  store: Store,
  el: "#app",
  computed:{
    apiKey(){
      return this.$store.state.apiKey
    }
  },

  created() {
    if (!this.$store.state.apiKey) {
      // set sandbox key if not defined
      // this.$store.commit(
      //   "setApiKey",
      //   "093b24e85df15a3e66f1fc359f4c48493eaa1b73"
      // );
      if (process.env.VUE_APP_API_KEY ) {
        this.$store.commit("setApiKey", process.env.VUE_APP_API_KEY);
      }
    
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

   // merakiSdk.Configuration.xCiscoMerakiAPIKey = this.$store.state.apiKey;
   // merakiSdk.Configuration.BASEURI = this.$store.state.apiUrl;

    this.$axios.defaults.baseURL = this.$store.state.apiUrl;
    //this.$axios.defaults.headers.common['X-Cisco-Meraki-API-Key'] = this.$store.state.apiKey;
    this.$axios.defaults.headers.post['Content-Type'] = 'application/json';

    // Applies updaed API Key to headers for each API request
    // this.$axios.interceptors.request.use(
    //   (config) => {
    //     let token = this.apiKey
    
    //     if (token) {
    //       config.headers['X-Cisco-Meraki-API-Key'] = `${ token }`
    //     }
    
    //     return config
    //   },
    
    //   (error) => {
    //     return Promise.reject(error)
    //   }
    // )
  },

  vuetify,
  render: h => h(App)
}).$mount("#app");
