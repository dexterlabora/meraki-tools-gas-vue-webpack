<template id="page-home">
  <v-container fluid>
    <v-layout column>
      <v-flex>
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
                </v-btn>Update your API key
              </p>
              <p>
                <v-btn icon to="/reports">
                  <v-icon>view_list</v-icon>
                </v-btn>Generate a Report
              </p>

              <p>
                <v-btn icon to="/tools">
                  <v-icon>build</v-icon>
                </v-btn>Network Tools
              </p>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex class="mt-4">
        <v-card>
          <v-card-title>
            <h3>About</h3>
          </v-card-title>
          <v-card-text>
            <p>
              <a
                href="https://developer.cisco.com/docs/meraki-tools-google-sheets-add-on/"
                target="_blank"
              >Website</a>
            </p>

            <p>
              <a
                href="https://developer.cisco.com/docs/meraki-tools-google-sheets-add-on/#!privacy-and-terms"
                target="_blank"
              >Privacy Policy</a>
            </p>
            <p>
              This tool was created to demonstrate the power of the
              <a
                href="https://meraki.io/api"
                target="_blank"
              >Meraki Dashboard API</a>.
            </p>
            <p>
              The dynamic reports are generated using the
              <a
                href="https://github.com/meraki/openapi"
                target="_blank"
              >Meraki OpenAPI specification</a>.
            </p>
            <p>As Meraki releases new API endpoints, the app will automatically generate updated reports.</p>
            <p>
              Custom reports and tools are created using the
              <a
                href="https://developer.cisco.com/meraki/api/#/node-js"
                target="_blank"
              >Meraki Node SDK</a>.
            </p>
            <p>
              <a
                href="https://github.com/dexterlabora/meraki-tools-gas-vue-webpack"
                target="_blank"
              >Project Source Code</a>
            </p>
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
      //return "img/meraki-m-logo.png";
    }
  }
});
</script>
