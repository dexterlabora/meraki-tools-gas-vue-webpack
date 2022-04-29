// import Vue from "vue";
// import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css";

// Vue.use(Vuetify);

// export default new Vuetify({
//   icons: {
//     iconfont: "md"
//   }
// });


// src/plugins/vuetify.js

import Vue from 'vue'
//import Vuetify from 'vuetify/lib' // results in Error: Line 25: Unexpected token ...
import Vuetify from 'vuetify'
//import '/src/assets/vuetify/style.css'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: "md"
  }
}

export default new Vuetify(opts)