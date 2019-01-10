<template id="page-home">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title>
            <v-img class="white--text" height="200px" contain :src="logo"></v-img>
          </v-card-title>
          <v-card-text p1>
            <h3>Getting Started</h3>
            <v-flex xs12 md12 pt-4>
              <p>
                <v-btn icon to="/settings">
                  <v-icon>lock</v-icon>
                </v-btn>Update your API key.
              </p>
              <p>
                <v-btn icon to="/reports">
                  <v-icon>view_list</v-icon>
                </v-btn>Generate a Report into the active cell.
              </p>

              <p>
                <v-btn icon to="/tools">
                  <v-icon>build</v-icon>
                </v-btn>Use the Tools to make changes.
              </p>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#page-home",
  data() {
    return {};
  },
  computed: {
    logo() {
      return "https://meraki.cisco.com/img/products/appliances/overview/license.jpg";
      //return require("../../assets/meraki-m-logo.png");
    }
  }
});
</script>
