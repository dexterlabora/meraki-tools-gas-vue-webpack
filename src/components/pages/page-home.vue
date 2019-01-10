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
                Update your API key.
                <span>
                  <v-btn icon to="/settings">
                    <v-icon>lock</v-icon>
                  </v-btn>
                </span>
              </p>
              <p>
                Generate a report by selecting a cell in the sheet, then select
                a report to run
              </p>
              <p>Use the tools to update the network.</p>
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
