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
              <v-btn
                fab
                fixed
                bottom
                left
                dark
                :loading="loading"
                color="primary"
                @click="onRunReport"
                v-if="selectedReport.action"
              >
                <v-icon>play_arrow</v-icon>
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
                  :items="reportItems"
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

        <v-flex xs12 sm12 md12 pt-2 v-if="reportData.length > 0">
          <v-card>
            <v-card-title>
              <h3>JSON Results</h3>
              <v-btn
                absolute
                right
                dark
                color="primary"
                @click="saveFile"
                v-if="selectedReport.action"
              >
                <v-icon>save_alt</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text p1>
              <vue-json-pretty showLength :data="reportData"></vue-json-pretty>
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-flex>
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
import ZoneSelector from "../shared/ZoneSelector";
import VueJsonPretty from "vue-json-pretty";

import * as reports from "../../meraki-custom-reports.ts";

export default Vue.extend({
  template: "#page-reports",
  components: {
    ClientSelector,
    DeviceSelector,
    DevicesSelector,
    SsidSelector,
    TimespanSelector,
    VueJsonPretty
  },
  data() {
    return {
      selectedGroup: "",
      selectedReport: {
        title: "",
        action: "",
        formComponents: [],
        group: ""
      },
      reportData: []
    };
  },
  watch: {
    selectedGroup() {
      this.selectedReport = this.reportItems[0];
    }
  },
  computed: {
    loading: function() {
      return this.$store.state.loading;
    },
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
    zone: function() {
      return this.$store.state.zone;
    },
    reportItems: function() {
      return this.reports.filter(r => r.group === this.selectedGroup.group);
    },
    // Meraki Report Handlers
    reports: function() {
      return [
        // Admins
        {
          title: "Administrators of Organization",
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
          title: "Clients seen in Network",
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
        // Cameras
        {
          title: "Video link for a camera",
          action: async () =>
            await this.$meraki
              .getNetworkCameraVideoLink({
                networkId: this.net.id,
                serial: this.device.serial,
                $queryParameters: {
                  timespan: this.timespan
                }
              })
              .then(res => res.data),
          formComponents: [DeviceSelector, TimespanSelector],
          group: "Cameras"
        },
        // Clients
        {
          title: "Device Clients",
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
          title: "Network Clients",
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
          title: "Security events",
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
          title: "Configuration Templates for Organization",
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
          title: "Network Device",
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
          title: "Network Devices",
          action: async () =>
            await this.$meraki
              .getNetworkDevices({ networkId: this.net.id })
              .then(res => res.data),
          formComponents: [],
          group: "Devices"
        },
        {
          title: "Device Uplink",
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
          title: "Group Policies in a Network",
          action: async () =>
            await this.$meraki
              .getNetworkGroupPolicies({
                id: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Group Policies"
        },
        // HTTP Servers
        {
          title: "HTTP servers for a Network",
          action: async () =>
            await this.$meraki
              .getNetworkHttpServers({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "HTTP Servers (Webhooks)"
        },
        // Firewalled Services
        {
          title: "Appliance services and rules",
          action: async () =>
            await this.$meraki
              .getNetworkFirewalledServices({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Firewalled Services"
        },
        // Meraki Auth
        {
          title: "Splash or RADIUS Meraki Auth users for a Network",
          action: async () =>
            await this.$meraki
              .getNetworkMerakiAuthUsers({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Meraki Auth"
        },
        // MR L3 Firewall Rules
        {
          title: "L3 Firewall Rules for an SSID",
          action: async () =>
            await this.$meraki
              .getNetworkSsidL3FirewallRules({
                networkId: this.net.id,
                number: this.ssid.number
              })
              .then(res => res.data),
          formComponents: [SsidSelector],
          group: "MR L3 Firewall Rules"
        },
        // MX Cellular Firewall Rules
        {
          title: "Cellular firewall rules for a Network",
          action: async () =>
            await this.$meraki
              .getNetworkCellularFirewallRules({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "MX Cellular Firewall Rules"
        },
        // MX L3 Firewall Rules
        {
          title: "L3 Firewall Rules for a Network",
          action: async () =>
            await this.$meraki
              .getNetworkL3FirewallRules({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "MX L3 Firewall Rules"
        },
        // MX VPN Firewall Rules
        {
          title: "Site-to-site VPN Firewall Rules",
          action: async () =>
            await this.$meraki
              .getOrganizationVpnFirewallRules({
                organizationId: this.org.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "MX VPN Firewall Rules"
        },
        // Networks
        {
          title: "Network",
          action: async () =>
            await this.$meraki
              .getNetwork({ id: this.net.id })
              .then(res => res.data),
          formComponents: [],
          group: "Networks"
        },
        {
          title: "Networks",
          action: async () =>
            await this.$meraki
              .getOrganizationNetworks({ organizationId: this.org.id })
              .then(res => res.data),
          formComponents: [],
          group: "Networks"
        },
        {
          title: "Bluetooth Settings",
          action: async () =>
            await this.$meraki
              .getNetworkBluetoothSettings({ id: this.net.id })
              .then(res => res.data),
          formComponents: [],
          group: "Networks"
        },
        // MS Access Policies
        {
          title: "MS Access Policies for a Network",
          action: async () =>
            await this.$meraki
              .getNetworkAccessPolicies({
                id: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Networks"
        },
        {
          title: "Traffic Analysis",
          action: async () =>
            await this.$meraki
              .getNetworkTraffic({
                id: this.net.id,
                $queryParameters: {
                  timespan: this.timespan
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Networks"
        },
        {
          title: "Air Marshal",
          action: async () =>
            await this.$meraki
              .getNetworkAirMarshal({
                id: this.net.id,
                $queryParameters: {
                  timespan: this.timespan
                }
              })
              .then(res => res.data),
          formComponents: [TimespanSelector],
          group: "Networks"
        },
        // Organizations
        {
          title: "Organization",
          action: async () =>
            await this.$meraki
              .getOrganization({ id: this.org.id })
              .then(res => res.data),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organizations",
          action: async () =>
            await this.$meraki.getOrganizations().then(res => res.data),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization License State",
          action: async () =>
            await this.$meraki
              .getOrganizationLicenseState({ id: this.org.id })
              .then(res => res.data),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization Inventory",
          action: async () =>
            await this.$meraki
              .getOrganizationInventory({ id: this.org.id })
              .then(res => res.data),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization Device Status",
          action: async () =>
            await this.$meraki
              .getOrganizationDeviceStatuses({ id: this.org.id })
              .then(res => res.data),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization SNMP Settings",
          action: async () =>
            await this.$meraki
              .getOrganizationSnmp({ id: this.org.id })
              .then(res => res.data),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization Thirdparty VPN Peers",
          action: async () =>
            await this.$meraki
              .getOrganizationThirdPartyVPNPeers({ id: this.org.id })
              .then(res => res.data),
          formComponents: [],
          group: "Organizations"
        },
        // Sense
        {
          title: "Aggregate analytics overview",
          action: async () =>
            await this.$meraki
              .getDeviceCameraAnalyticsOverview({
                serial: this.device.serial,
                $queryParameters: {
                  timespan: this.timespan
                }
              })
              .then(res => res.data),
          formComponents: [DeviceSelector, TimespanSelector],
          group: "Sense"
        },
        {
          title: "Configured analytic zones for this camera",
          action: async () =>
            await this.$meraki
              .getDeviceCameraAnalyticsZones({
                serial: this.device.serial,
                $queryParameters: {
                  timespan: this.timespan
                }
              })
              .then(res => res.data),
          formComponents: [DeviceSelector, TimespanSelector],
          group: "Sense"
        },
        {
          title: "Historical records for analytic zones",
          action: async () =>
            await this.$meraki
              .getDeviceCameraAnalyticsZoneHistory({
                serial: this.device.serial,
                zoneId: this.zone.zoneId,
                $queryParameters: {
                  perPage: "100",
                  t0: Math.round(new Date() / 1000) - this.timespan,
                  t1: Math.round(new Date() / 1000)
                }
              })
              .then(res => res.data),
          formComponents: [DeviceSelector, ZoneSelector, TimespanSelector],
          group: "Sense"
        },
        {
          title: "Recent record for analytics zones",
          action: async () =>
            await this.$meraki
              .getDeviceCameraAnalyticsRecent({
                serial: this.device.serial,
                $queryParameters: {
                  timespan: this.timespan
                }
              })
              .then(res => res.data),
          formComponents: [DeviceSelector, TimespanSelector],
          group: "Sense"
        },
        {
          title: "Live state from camera of analytics zones",
          action: async () =>
            await this.$meraki
              .getDeviceCameraAnalyticsRecent({
                serial: this.device.serial,
                $queryParameters: {
                  timespan: this.timespan
                }
              })
              .then(res => res.data),
          formComponents: [DeviceSelector, TimespanSelector],
          group: "Sense"
        },
        // Splash Settings
        {
          title: "Splash Settings for an SSID",
          action: async () =>
            await this.$meraki
              .getNetworkSsidSplashSettings({
                networkId: this.net.id,
                number: this.ssid.number
              })
              .then(res => res.data),
          formComponents: [SsidSelector],
          group: "Splash Settings"
        },
        // SSIDS
        {
          title: "Organization SSIDs",
          action: async () =>
            await reports
              .getNetworksSsids({ networkIds: this.nets.map(n => n.id) })
              .then(res => res.data),
          formComponents: [],
          group: "SSIDs"
        },
        {
          title: "Network SSIDs",
          action: async () =>
            await this.$meraki
              .getNetworkSsids({ networkId: this.net.id })
              .then(res => res.data),
          formComponents: [],
          group: "SSIDs"
        },
        {
          title: "An SSID",
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
        // Syslog Servers
        {
          title: "Syslog servers of a Network",
          action: async () =>
            await this.$meraki
              .getNetworkSyslogServers({
                networkId: this.net.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "Syslog Servers"
        },

        // SAML
        {
          title: "SAML roles for Organization",
          action: async () =>
            await this.$meraki
              .getOrganizationSamlRoles({
                organizationId: this.org.id
              })
              .then(res => res.data),
          formComponents: [],
          group: "SAML"
        },
        // Static Routes
        {
          title: "Static Routes for this Network",
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
          title: "Aggregated connectivity by Network Device",
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
          title: "Aggregated connectivity by Network Client",
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
          title: "Aggregated Latency for Network",
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
          title: "Aggregated Latency by Network Node",
          action: async () =>
            await this.$meraki
              .getNetworkDevicesLatencyStats({
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
          title: "Aggregated Latency by Network AP",
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
          title: "of all failed client connection events on this network",
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
          title: "VLANs of Network",
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
          title: "VLANs of Organization",
          action: async () =>
            await reports
              .getNetworksVlans({
                networks: this.nets.map(n => n.id)
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
    onRunReport() {
      this.$store.commit("setLoading", true);
      this.selectedReport
        .action()
        .then(res => {
          if (!Array.isArray(res)) {
            res = [res];
          }
          this.reportData = res;
          this.reportToSheet();
        })
        .catch(e => {
          console.log("onRunReport error ", e);
        })
        .finally(() => {
          this.$store.commit("setLoading", false);
        });
    },
    saveFile() {
      const data = JSON.stringify(this.reportData);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = `meraki-report ${this.selectedReport.title}.json`;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    reportToSheet() {
      if (typeof google !== "undefined") {
        this.$utilities.writeData(this.reportData, google);
      }
    }
  }
});
</script>
<style>
.v-list__tile__content {
  font-size: small;
}
</style>