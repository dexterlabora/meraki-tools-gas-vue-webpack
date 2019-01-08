<template id="page-reports">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title>
            <h3>Reports</h3>
          </v-card-title>
          <v-card-text>
            <div>
              <v-btn fab fixed bottom center dark color="primary" @click="onReportToSheet">
                <v-icon>view_list</v-icon>
              </v-btn>
              <v-flex xs12 sm6 md6 pt-2 d-flex>
                <v-select
                  v-model="selectedGroup"
                  :items="groups"
                  item-text="group"
                  return-object
                  label="Group"
                  outline
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md6 pt-2 d-flex>
                <v-select
                  v-model="selectedReport"
                  :items="reports.filter(r => r.group === selectedGroup.group)"
                  item-text="title"
                  return-object
                  label="Reports"
                  outline
                ></v-select>
              </v-flex>
              <v-flex
                xs12
                sm6
                md6
                pt-2
                d-flex
                v-for="component in selectedReport.formComponents"
                :key="component.title"
              >
                <component :is="component"></component>
              </v-flex>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import SsidSelector from "../shared/SsidSelector";
import DeviceSelector from "../shared/DeviceSelector";
import DevicesSelector from "../shared/DevicesSelector";
import TimespanSelector from "../shared/TimespanSelector";
import * as reports from "../../meraki-custom-reports.ts";

export default Vue.extend({
  template: "#page-reports",
  components: {
    SsidSelector,
    DeviceSelector,
    DevicesSelector
  },
  data() {
    return {
      selectedGroup: "",
      selectedReport: {
        title: "",
        action: "",
        formComponents: [],
        group: ""
      }
    };
  },
  computed: {
    org: function() {
      return this.$store.state.org;
    },
    net: function() {
      return this.$store.state.net;
    },
    nets: function() {
      return this.$store.state.nets;
    },
    device: function() {
      return this.$store.state.device;
    },
    devices: function() {
      return this.$store.state.device;
    },
    ssid: function() {
      return this.$store.state.ssid;
    },
    timespan: function() {
      return this.$store.state.timespan;
    },
    // Meraki Report Handlers
    reports: function() {
      return [
        {
          title: "List Device Clients",
          action: async () =>
            await this.$meraki
              .getDeviceClients({
                serial: this.device.serial,
                $queryParameters: { timespan: this.timespan }
              })
              .then(res => res.data),
          formComponents: [DeviceSelector, TimespanSelector],
          group: "Clients"
        },
        {
          title: "List Network Clients",
          action: async () =>
            await reports
              .getDevicesClients({
                serials: this.devices.map(d => d.serial),
                $queryParameters: { timespan: this.timespan }
              })
              .then(res => res.data),
          formComponents: [DevicesSelector, TimespanSelector],
          group: "Clients"
        },
        {
          title: "List Network Device",
          action: async () =>
            await this.$meraki
              .getNetworkDevice({
                networkId: this.net.id,
                serial: this.device.serial
              })
              .then(res => res.data),
          formComponents: [DeviceSelector],
          group: "Devices"
        },
        {
          title: "List Network Devices",
          action: async () =>
            await this.$meraki
              .getNetworkDevices({ networkId: this.net.id })
              .then(res => res.data),
          formComponents: [],
          group: "Devices"
        },
        {
          title: "List Device Uplink",
          action: async () =>
            await this.$meraki
              .getNetworkDeviceUplink({
                networkId: this.net.id,
                serial: this.device.serial
              })
              .then(res => res.data),
          formComponents: [DeviceSelector],
          group: "Devices"
        },
        {
          title: "List Organization SSIDs",
          action: async () =>
            await reports
              .getNetworksSsids({ networkIds: this.nets.map(n => n.id) })
              .then(res => res.data),
          formComponents: [],
          group: "SSIDs"
        },
        {
          title: "List Network SSIDs",
          action: async () =>
            await this.$meraki
              .getNetworkSsids({ networkId: this.net.id })
              .then(res => res.data),
          formComponents: [],
          group: "SSIDs"
        },
        {
          title: "List An SSID",
          action: async () =>
            await this.$meraki
              .getNetworkSsid({
                networkId: this.net.id,
                number: this.ssid.number
              })
              .then(res => res.data),
          formComponents: [SsidSelector],
          group: "SSIDs"
        },
        {
          title: "List Network",
          action: async () =>
            await this.$meraki
              .getNetwork({ id: this.net.id })
              .then(res => res.data),
          formComponents: [],
          group: "Networks"
        },
        {
          title: "List Networks",
          action: async () =>
            await this.$meraki
              .getOrganizationNetworks({ organizationId: this.org.id })
              .then(res => res.data),
          formComponents: [],
          group: "Networks"
        },
        {
          title: "List Organization",
          action: async () =>
            await this.$meraki
              .getOrganization({ id: this.org.id })
              .then(res => res.data),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "List Organizations",
          action: async () =>
            await this.$meraki.getOrganizations().then(res => res.data),
          formComponents: [],
          group: "Organizations"
        }
      ];
    },
    // Dynamic Selectors
    groups: function() {
      return this.reports.filter(g => g.group);
    },
    groupReports() {
      return this.reports.filter(g => this.reports[selectedGroup]);
    }
  },
  methods: {
    onReportToSheet() {
      this.selectedReport.action().then(res => {
        console.log("onReportToSheet data", res);
        if (typeof google !== "undefined") {
          this.$utilities.writeData(res, google);
        }
      });
    }
  }
});
</script>
