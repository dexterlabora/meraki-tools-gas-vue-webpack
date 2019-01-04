<template id="report-organizations">
  <div>
    <v-btn fab fixed bottom center dark color="primary" @click="onRunReport">
      <v-icon>view_list</v-icon>
    </v-btn>
    <v-select
      v-model="selectedReport"
      :items="reports"
      item-text="title"
      return-object
      label="Organization Reports"
      outline
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
import json2csv from "json2csv";
export default Vue.extend({
  template: "#report-organizations",
  data() {
    return {
      //orgs: []
      selectedReport: {}
    };
  },
  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    org: function() {
      return this.$store.state.org;
    },
    reports: function() {
      return [
        {
          title: "List All Organizations",
          action: this.reportOrganizations
        },
        {
          title: "This Organization",
          action: this.reportOrganization
        }
      ];
    }
  },
  methods: {
    writeSheet(json) {
      const csv = json2csv.parse(json);
      google.script.run.writeCsvData(csv);
    },
    onRunReport() {
      this.selectedReport.action();
    },
    reportOrganizations() {
      console.log("running reportOrganizations");
      this.$meraki.getOrganizations(this.apiKey).then(res => {
        this.writeSheet(res);
      });
    },
    reportOrganization() {
      this.$meraki.getOrganization(this.apiKey, this.org.id).then(res => {
        this.writeSheet(res);
      });
    }
  }
});
</script>
