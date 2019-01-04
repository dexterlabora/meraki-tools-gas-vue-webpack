<template id="page-reports">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title>
            <h3>Reports</h3>
          </v-card-title>
          <v-card-text p1>
            <v-flex xs12 sm6 d-flex>
              <v-select
                v-model="selectedReport"
                :items="reports"
                item-text="title"
                return-object
                label="Reports"
                outline
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <component :is="selectedReport.path"></component>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import ReportOrganizations from "./report-organizations";

export default Vue.extend({
  template: "#page-reports",
  components: { ReportOrganizations },
  data() {
    return {
      selectedReport: {},
      reports: [
        {
          title: "Organizations",
          path: "report-organizations"
        },
        {
          title: "Networks",
          path: "report-networks"
        },
        {
          title: "SSIDs",
          path: "report-ssids"
        },
        {
          title: "Clients",
          path: "report-clients"
        },
        {
          title: "Devices",
          path: "report-devices"
        },
        {
          title: "VLANs",
          path: "report-vlans"
        }
      ]
    };
  },
  watch: {},
  methods: {}
});
</script>
