<template id="report-ssids">
  <div>
    <v-btn fab fixed bottom center dark color="primary" @click="onRunReport">
      <v-icon>view_list</v-icon>
    </v-btn>
    <v-flex xs12 sm12 d-flex>
      <v-select
        v-model="selectedReport"
        :items="reports"
        item-text="title"
        return-object
        label="SSID Reports"
        outline
      ></v-select>
    </v-flex>
    <v-flex xs12 sm12 d-flex>
      <v-switch label="Org-wide Search" v-model="isOrgSearch" v-if="orgSearchToggle"></v-switch>
    </v-flex>
    <v-flex xs12 sm12 d-flex>
      <v-select
        v-bind:items="ssids"
        item-text="name"
        item-value="number"
        return-object
        v-model="ssid"
        label="SSID"
        v-if="ssidSelector"
      ></v-select>
    </v-flex>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#report-ssids",
  data() {
    return {
      //orgs: []
      ssidSelector: false,
      isOrgSearch: false,
      orgSearchToggle: false,
      selectedReport: {
        title: "",
        action: "",
        formComponents: []
      },
      ssid: {},
      ssids: []
    };
  },
  created: function() {
    this.fetchSsids();
  },
  watch: {
    net: function() {
      //copy the ssid into the form
      this.fetchSsids();
    },
    "selectedReport.formComponents"() {
      if (!this.selectedReport.formComponents.length) {
        this.ssidSelector = false;
        return;
      }
      if (this.selectedReport.formComponents.includes("ssidSelector")) {
        this.ssidSelector = true;
      } else {
        this.ssidSelector = false;
      }

      if (this.selectedReport.formComponents.includes("orgSearchToggle")) {
        this.orgSearchToggle = true;
      } else {
        this.orgSearchToggle = false;
      }
    }
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
    nets: function() {
      return this.$store.state.nets;
    },
    reports: function() {
      return [
        {
          title: "List Organization SSIDs",
          action: () => this.reportNetworksSsids(this.apiKey, this.nets),
          formComponents: []
        },
        {
          title: "List Network SSIDs",
          action: () => this.reportNetworkSsids(this.apiKey, this.net.id),
          formComponents: []
        },
        {
          title: "List An SSID",
          action: () =>
            this.reportNetworkSsid(this.apiKey, this.net.id, this.ssid.number),
          formComponents: ["ssidSelector"]
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
    fetchSsids() {
      meraki.getNetworkSsids(this.apiKey, this.net.id).then(res => {
        this.ssids = res;
        this.ssid = this.ssids[0]; // set default ssid
      });
    },
    // REPORTS

    reportNetworkSsids(apiKey, netId) {
      meraki.getNetworkSsids(apiKey, netId).then(ssids => {
        this.writeSheet(ssids);
      });
    },
    async reportNetworksSsids(apiKey, nets) {
      var ssids = [];
      for (var i = 0; i < nets.length; i++) {
        try {
          const api = await meraki
            .getNetworkSsids(apiKey, nets[i].id)
            .then(res => {
              console.log("pushing ssid, ", res);
              ssids = ssids.concat(res);
            })
            .catch(err => {
              console.log("getSsids error: ", err);
            });
        } catch {
          console.log("try report catch");
          continue;
        }
      }
      this.writeSheet(ssids);
    },
    reportNetworkSsid(apiKey, netId, ssidNumber) {
      meraki.getNetworkSsid(apiKey, netId, ssidNumber).then(res => {
        this.writeSheet(res);
      });
    }
  }
});
</script>
