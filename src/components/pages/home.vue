<template id="page-home">
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <v-card>
          <v-card-title>
            <v-img
              class="white--text"
              height="200px"
              contain
              :src="logo"
            ></v-img>
          </v-card-title>
          <v-card-text p1>
            <h3>Getting Started</h3>
            <v-flex xs12 md12 pt-4>
              <p>
                <v-btn icon to="/settings"> <v-icon>lock</v-icon> </v-btn>Update
                your API key
              </p>
              <p>
                <v-btn icon to="/reports"> <v-icon>view_list</v-icon> </v-btn
                >Query the API with the Report Builder
              </p>
              <hr />
              <h4>Custom Cell Function</h4>

              <!-- <v-tooltip bottom style="opacity: 1 !important;">
                  <template v-slot:activator="{ on }">
                    <v-icon color="grey lighten-1" v-on="on" class="mr-2"
                      >info</v-icon
                    >
                  </template> -->

              <code>=merakiFetchReport(url, apiKey, title, refresh)</code>
              <div class="caption">
                Fetches a Meraki API endpoint and automatically formats the data into
                the adjacent cells.
                <p class="ml-4">
                  <i
                    >Note, returned data cannot be modified when using this
                    method and cells must be available for the insert without
                    conflict.
                  </i>
                </p>
                <p>
                <strong>Basic Usage</strong><br />
                <code
                  >=merakiFetchReport("/organizations")</code
                >
              
                </p>
                <p>
                 <strong>Advanced Usage</strong><br />
                <code>=merakiFetchReport("/organizations", "00000APIKEY00000", "MyReport","'_meraki_tools'!B1")</code>
                </p>
               

                <table>
                  <tbody>
                    <tr>
                      <td><strong>Parameter</strong></td>
                      <td><strong>Details</strong></td>
                    </tr>
                    <tr>
                      <td><code>url</code></td>
                      <td>
                        URL to pull JSON data from. This can either be a
                        complete or short API URL (i.e
                        <code
                          >"https://api.meraki.com/api/v1/organizations"</code
                        >
                        or <code>"/organizations"</code>) <br />
                      </td>
                    </tr>
                    <tr>
                      <td><code>apiKey</code></td>
                      <td>
                        API key for authorization. If left blank, it will default to
                        the stored key entered in the<v-btn icon to="/settings">
                          <v-icon small>lock</v-icon> </v-btn
                        >settings.
                      </td>
                    </tr>
                    <tr>
                      <td><code>title</code></td>
                      <td>The title text to display in the cell</td>
                    </tr>
                    <tr>
                      <td><code>refresh</code></td>
                      <td>
                        Triggers a refresh of the report when changed.
                        <p class="mt-2 ml-4">
                          <i>
                            Google does not permit the use of now() or random
                            functions to be used here. Instead, a hidden
                            <strong>_meraki_tools</strong> sheet is created and
                            stores a timestamp at cell
                            <strong>'_meraki_tools'!B1</strong> that gets
                            updated when the Refresh Reports function is run from the taskbar menu.
                          </i>
                        </p>
                        <p>
                          Optional: You can set a Google Sheet
                          <a
                            href="https://developers.google.com/apps-script/guides/triggers"
                            target="_blank"
                            >trigger</a
                          >
                          to call the <strong>refreshReports</strong> function
                          on a schedule.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                >Website</a
              >
            </p>

            <p>
              <a
                href="https://dexterlabora.github.io/meraki-tools-gas-vue-webpack"
                target="_blank"
                >Project Documentation</a
              >
            </p>

            <p>
              <a
                href="https://dexterlabora.github.io/meraki-tools-gas-vue-webpack/privacy-terms.html"
                target="_blank"
                >Privacy Policy</a
              >
            </p>
            <p>
              This tool was created to demonstrate the power of the
              <a href="https://meraki.io/api" target="_blank"
                >Meraki Dashboard API</a
              >.
            </p>
            <p>
              The reports options are generated using the
              <a href="https://github.com/meraki/openapi" target="_blank"
                >Meraki OpenAPI specification</a
              >.
            </p>
            <p>
              As Meraki releases new API endpoints, the app will automatically
              generate updated reports.
            </p>

            <p>
              <a
                href="https://github.com/dexterlabora/meraki-tools-gas-vue-webpack"
                target="_blank"
                >Project Source Code</a
              >
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
    },
  },
});
</script>
