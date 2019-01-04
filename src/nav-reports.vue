<template id="nav-reports">
  <v-select
    v-model="selectedReport"
    :items="reports"
    item-text="title"
    return-object
    label="Reports"
    outline
  ></v-select>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#nav-reports",
  data() {
    return {
      selectedReport: {},
      reports: [
        {
          title: "Organizations",
          path: "/report-organizations"
        },
        {
          title: "Networks",
          path: "/report-networks"
        },
        {
          title: "SSIDs",
          path: "/report-ssids"
        },
        {
          title: "Clients",
          path: "/report-clients"
        },
        {
          title: "Devices",
          path: "/report-devices"
        },
        {
          title: "VLANs",
          path: "/report-vlans"
        }
      ]
    };
  },
  watch: {
    selectedReport() {
      this.$router.push(this.selectedReport.path);
    }
  }
});
</script>
