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

import ClientSelector from "../shared/ClientSelector";
import DeviceSelector from "../shared/DeviceSelector";
import DevicesSelector from "../shared/DevicesSelector";
import SsidSelector from "../shared/SsidSelector";
import TimespanSelector from "../shared/TimespanSelector";

import * as reports from "../../meraki-custom-reports.ts";

export default Vue.extend({
  template: "#page-reports",
  components: {
    ClientSelector,
    DeviceSelector,
    DevicesSelector,
    SsidSelector,
    TimespanSelector
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
    client: function() {
      return this.$store.state.client;
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
    device: function() {
      return this.$store.state.device;
    },
    devices: function() {
      return this.$store.state.devices;
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
        // Admins
        {
          title: "List the dashboard administrators",
          action: async () =>
            await this.$meraki
              .getOrganizationAdmins({
                organizationId: this.org.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Admins"
        },
        // Alert Settings
        {
          title: "Network Alert Settings",
          action: async () =>
            await this.$meraki
              .getNetworkAlertSettings({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Alert Settings"
        },
        // Bluetooth Clients
        {
          title: "List the Bluetooth clients seen by APs in this networks",
          action: async () =>
            await this.$meraki
              .getNetworkBluetoothClients({
                networkId: this.net.id,
                $queryParameters: {
                  timespan: this.timespan,
                  includeConnectivityHistory: true,
                  perPage: 20
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Bluetooth Clients"
        },
        // Clients
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
          title: "List the security events",
          action: async () =>
            await this.$meraki
              .getNetworkClientSecurityEvents({
                networkId: this.net.id,
                clientId: this.client.mac,
                $queryParameters: {
                  timespan: this.timespan,
                  perPage: 100
                }
              })
              .then(res => res.data),
          formComponents: [DevicesSelector, ClientSelector, TimespanSelector],
          group: "Clients"
        },
        // Configuration Templates
        {
          title: "List the configuration templates for this organization",
          action: async () =>
            await this.$meraki
              .getOrganizationConfigTemplates({
                organizationId: this.org.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Configuration Templates"
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
        // Group Policies
        {
          title: "List the group policies in a network",
          action: async () =>
            await this.$meraki
              .getNetworkGroupPolicies({
                id: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Group Policies"
        },
        // Firewalled Services
        {
          title: "List the appliance services and their accessibility rules",
          action: async () =>
            await this.$meraki
              .getNetworkFirewalledServices({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Firewalled Services"
        },
        // SSIDS
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
        },
        // Static Routes
        {
          title: "List the static routes for this network",
          action: async () =>
            await this.$meraki
              .getNetworkStaticRoutes({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Static Routes"
        },

        // wireless health
        {
          // getNetworkConnectionStats query: ?t0={{t0}}&t1={{t1}}&vlan&ssid
          title: "Network Connection Stats",
          action: async () =>
            await this.$meraki
              .getNetworkConnectionStats({
                networkId: this.net.id,
                $queryParameters: {
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Wireless Health"
        },
        {
          title:
            "Aggregated connectivity info for this network, grouped by node",
          action: async () =>
            await this.$meraki
              .getNetworkDevicesConnectionStats({
                networkId: this.net.id,
                $queryParameters: {
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Wireless Health"
        },
        {
          title: "Aggregated connectivity info for a given AP on this network",
          action: async () =>
            await this.$meraki
              .getNetworkDeviceConnectionStats({
                networkId: this.net.id,
                serial: this.device.serial,
                $queryParameters: {
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [DeviceSelector, TimespanSelector],
          group: "Wireless Health"
        },
        {
          title:
            "Aggregated connectivity info for this network, grouped by clients",
          action: async () =>
            await this.$meraki
              .getNetworkClientsConnectionStats({
                networkId: this.net.id,
                serial: this.device.serial,
                $queryParameters: {
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Wireless Health"
        },
        {
          title: "Aggregated latency info for this network",
          action: async () =>
            await this.$meraki
              .getNetworkLatencyStats({
                networkId: this.net.id,
                serial: this.device.serial,
                $queryParameters: {
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Wireless Health"
        },
        {
          title: "Aggregated latency info for this network, grouped by node",
          action: async () =>
            await this.$meraki
              .getNetworkDevicesLatencyStats({
                networkId: this.net.id,
                serial: this.device.serial,
                $queryParameters: {
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Wireless Health"
        },
        {
          title: "Aggregated latency info for a given AP on this network",
          action: async () =>
            await this.$meraki
              .getNetworkDeviceLatencyStats({
                networkId: this.net.id,
                serial: this.device.serial,
                $queryParameters: {
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [DeviceSelector, TimespanSelector],
          group: "Wireless Health"
        },
        {
          title: "Aggregated latency info for this network, grouped by clients",
          action: async () =>
            await this.$meraki
              .getNetworkClientsLatencyStats({
                networkId: this.net.id,
                $queryParameters: {
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Wireless Health"
        },
        {
          title: "List of all failed client connection events on this network",
          action: async () =>
            await this.$meraki
              .getNetworkFailedConnections({
                networkId: this.net.id,
                $queryParameters: {
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Wireless Health"
        },
        {
          title: "List Network VLANs",
          action: async () =>
            await this.$meraki
              .getNetworkVlans({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "VLANs"
        },
        {
          title: "Returns the enabled status of VLANs for the network",
          action: async () =>
            await this.$meraki
              .getNetworkVlansEnabledState({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "VLANs"
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
