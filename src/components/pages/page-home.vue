<template id="page-home">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-img src="https://meraki.cisco.com/img/cisco-meraki-logo.jpg" aspect-ratio="2.75"></v-img>
          <v-card-title>
            <h3>Getting Started</h3>
          </v-card-title>
          <v-card-text p1>
            <v-flex xs12 md12 pt-4>
              <p>
                Update your API key.
                <span>
                  <v-btn icon to="/apikey">
                    <v-icon>lock</v-icon>
                  </v-btn>
                </span>
              </p>
              <p>
                Generate a report by selecting a cell in the sheet, then select
                a report to run
              </p>
              <p>Use the tools to update network.</p>
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
  }
});
</script>
