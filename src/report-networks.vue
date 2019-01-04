<template id="report-networks">
  <div>
    <v-btn fab fixed bottom center dark color="primary" @click="onRunReport">
      <v-icon>view_list</v-icon>
    </v-btn>
    <v-select
      v-model="selectedReport"
      :items="reports"
      item-text="title"
      return-object
      label="Reports"
      outline
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#report-networks",
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
    net: function() {
      return this.$store.state.net;
    },
    reports: function() {
      return [
        {
          title: "List Organizations Networks",
          action: () =>
            meraki
              .getOrganizationNetworks(this.apiKey, this.org.id)
              .then(res => {
                this.writeSheet(res);
              })
        },
        {
          title: "This Network",
          action: () =>
            meraki.getNetwork(this.apiKey, this.net.id).then(res => {
              this.writeSheet(res);
            })
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
    }
  }
});
</script>
