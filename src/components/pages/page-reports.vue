<template id="page-reports">
  <v-container>
    <v-layout fluid>
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
              <div>
                <v-flex xs12 sm6 md6 pt-2 d-flex>
                  <v-autocomplete
                    style="{text-size:5px}"
                    prepend-inner-icon="search"
                    v-model="selectedReport"
                    return-object
                    :items="reports"
                    :filter="customFilter"
                    item-text="title"
                    label="Search"
                    outline
                    dense
                    @change="onSearch"
                    hide-selected
                  ></v-autocomplete>
                </v-flex>
              </div>
              <v-flex xs12 sm6 md6>
                <v-btn
                  round
                  small
                  color="secondary"
                  @click="browseByGroup = !browseByGroup"
                >Browse by Group</v-btn>
              </v-flex>
              <div v-if="browseByGroup">
                <v-flex xs12 sm6 md6 pt-2 d-flex>
                  <v-select
                    v-model="selectedGroup"
                    :items="groups"
                    item-text="group"
                    label="Group"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6 pt-2 d-flex>
                  <v-select
                    v-model="selectedReport"
                    :items="groupReports"
                    item-text="title"
                    return-object
                    label="Reports"
                    outline
                    search-input
                  ></v-select>
                </v-flex>
              </div>

              <v-flex
                xs12
                sm6
                md6
                pt-2
                d-flex
                v-for="component in selectedReport.formComponents"
                :key="component.component.title"
              >
                <component :is="component.component" v-bind="component.attributes"></component>
              </v-flex>
            </div>
          </v-card-text>
        </v-card>

        <v-flex xs12 sm12 md12 pt-2 v-if="displayJson">
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
import MethodSelector from "../shared/MethodSelector";
import VueJsonPretty from "vue-json-pretty";

import * as reports from "../../meraki-custom-reports.ts";
import MethodSelectorVue from "../shared/MethodSelector.vue";

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
      browseByGroup: false,
      selectedGroup: "",
      selectedReport: {
        title: "",
        action: "",
        formComponents: [],
        group: "All"
      },
      reportData: []
    };
  },
  computed: {
    loading: function() {
      return this.$store.state.loading;
    },
    client: function() {
      return this.$store.state.client;
    },
    displayJson: function() {
      return this.$store.state.displayJson;
    },
    org: function() {
      return this.$store.state.org;
    },
    method: function() {
      return this.$store.state.method;
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
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Admins"
        },
        // API Usage
        {
          title: "API requests made by an organization",
          action: async () =>
            await this.$meraki
              .getOrganizationApiRequests({
                organizationId: this.org.id,
                $queryParameters: {
                  timespan: this.timespan,
                  perPage: 1000,
                  method: this.method
                }
              })
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: TimespanSelector },
            { component: MethodSelector }
          ],
          group: "API Usage"
        },
        // Alert Settings
        {
          title: "Network Alert Settings",
          action: async () =>
            await this.$meraki
              .getNetworkAlertSettings({
                networkId: this.net.id
              })
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
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
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: DeviceSelector, attributes: { model: "MV" } },
            { component: TimespanSelector }
          ],
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
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: DeviceSelector },
            { component: TimespanSelector }
          ],
          group: "Clients"
        },
        {
          title: "Network Clients",
          action: async () => {
            try {
              let allClients = [];
              for (let d of this.devices) {
                let clients = await this.$meraki
                  .getDeviceClients({
                    serial: d.serial,
                    $queryParameters: { timespan: this.timespan }
                  })
                  .then(res => res.data);
                // add device details to report
                clients.map(c => {
                  c.usageSent = c.usage.sent;
                  c.usageRecv = c.usage.recv;
                  c.deviceName = d.name;
                  c.deviceSerial = d.serial;
                  c.deviceMac = d.mac;
                  c.deviceModel = d.model;
                  delete c.usage;
                  return c;
                });
                allClients = [...allClients, ...clients];
              }
              this.toReport(allClients);
              //return allClients;
            } catch (error) {
              console.log(error);
            }
          },
          formComponents: [
            { component: DevicesSelector },
            { component: TimespanSelector }
          ],
          group: "Clients"
        },
        {
          title: "Network Clients (streaming)",
          action: async () => {
            try {
              let allClients = [];
              //for (let [i, d] of this.devices) {

              for (let i = 0; i < this.devices.length; i++) {
                let d = this.devices[i];
                let clients = await this.$meraki
                  .getDeviceClients({
                    serial: d.serial,
                    $queryParameters: { timespan: this.timespan }
                  })
                  .then(res => res.data);
                // add device details to report
                clients.map(c => {
                  c.usageSent = c.usage.sent;
                  c.usageRecv = c.usage.recv;
                  c.deviceName = d.name;
                  c.deviceSerial = d.serial;
                  c.deviceMac = d.mac;
                  c.deviceModel = d.model;
                  delete c.usage;
                  return c;
                });
                if (i > 0) {
                  this.toReport(clients, true);
                } else {
                  this.toReport(clients);
                }

                //allClients = [...allClients, ...clients];
              }
              //this.toReport(allClients);
              //return allClients;
            } catch (error) {
              console.log(error);
            }
          },
          formComponents: [
            { component: DevicesSelector },
            { component: TimespanSelector }
          ],
          group: "Clients"
        },
        {
          title: "Organization Clients (streaming)",
          action: async () => {
            try {
              // loop through organization networks
              for (let n = 0; n < this.nets.length; n++) {
                const net = this.nets[n];
                console.log("Organization Clients net ", net);
                const devices = await this.$meraki
                  .getNetworkDevices({ networkId: net.id })
                  .then(res => res.data);

                // loop through network devices
                if (!devices) {
                  continue;
                }
                for (let i = 0; i < devices.length; i++) {
                  const device = devices[i];
                  // get clients for each device
                  const clients = await this.$meraki
                    .getDeviceClients({
                      serial: device.serial,
                      $queryParameters: { timespan: this.timespan }
                    })
                    .then(res => res.data)
                    .catch(e =>
                      console.log(
                        "error getting clients for serial",
                        device.serial,
                        e
                      )
                    );
                  // add device details to report
                  if (!clients) {
                    continue;
                  }
                  clients.map(c => {
                    c.usageSent = c.usage.sent;
                    c.usageRecv = c.usage.recv;
                    c.deviceName = device.name;
                    c.deviceSerial = device.serial;
                    c.deviceMac = device.mac;
                    c.deviceModel = device.model;
                    c.networkId = net.id;
                    c.networkName = net.name;
                    delete c.usage;
                    return c;
                  });
                  if (i > 0) {
                    this.toReport(clients, true);
                  } else {
                    this.toReport(clients);
                  }
                }
              }
            } catch (error) {
              console.log(error);
            }
          },
          formComponents: [{ component: TimespanSelector }],
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
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: ClientSelector },
            { component: TimespanSelector }
          ],
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: DeviceSelector }],
          group: "Devices"
        },
        {
          title: "Network Devices",
          action: async () =>
            await this.$meraki
              .getNetworkDevices({ networkId: this.net.id })
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: DeviceSelector }],
          group: "Devices"
        },
        // Devices
        {
          title: "Network Device Loss And Latency History",
          action: async () =>
            await this.$merakiSdk.DevicesController.getNetworkDeviceLossAndLatencyHistory(
              this.net.id,
              this.device.serial,
              "8.8.8.8"
            ).then(res => this.toReport(res.data)),
          formComponents: [{ component: DeviceSelector }],
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: SsidSelector }],
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "MX VPN Firewall Rules"
        },
        // Networks
        {
          title: "Network",
          action: async () =>
            await this.$meraki
              .getNetwork({ id: this.net.id })
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Networks"
        },
        {
          title: "Networks",
          action: async () =>
            await this.$meraki
              .getOrganizationNetworks({ organizationId: this.org.id })
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Networks"
        },
        {
          title: "Bluetooth Settings",
          action: async () =>
            await this.$meraki
              .getNetworkBluetoothSettings({ id: this.net.id })
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
          group: "Networks"
        },
        // Organizations
        {
          title: "Organization",
          action: async () =>
            await this.$meraki
              .getOrganization({ id: this.org.id })
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organizations",
          action: async () =>
            await this.$meraki
              .getOrganizations()
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization License State",
          action: async () =>
            await this.$meraki
              .getOrganizationLicenseState({ id: this.org.id })
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization Inventory",
          action: async () =>
            await this.$meraki
              .getOrganizationInventory({ id: this.org.id })
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization Device Status",
          action: async () =>
            await this.$meraki
              .getOrganizationDeviceStatuses({ id: this.org.id })
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization SNMP Settings",
          action: async () =>
            await this.$meraki
              .getOrganizationSnmp({ id: this.org.id })
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Organizations"
        },
        {
          title: "Organization Thirdparty VPN Peers",
          action: async () =>
            await this.$meraki
              .getOrganizationThirdPartyVPNPeers({ id: this.org.id })
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: DeviceSelector, attributes: { model: "MV" } },
            { component: TimespanSelector }
          ],
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
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: DeviceSelector, attributes: { model: "MV" } },
            { component: TimespanSelector }
          ],
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
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: DeviceSelector, attributes: { model: "MV" } },
            { component: ZoneSelector },
            { component: TimespanSelector }
          ],
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
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: DeviceSelector, attributes: { model: "MV" } },
            { component: TimespanSelector }
          ],
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
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: DeviceSelector, attributes: { model: "MV" } },
            { component: TimespanSelector }
          ],
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: SsidSelector }],
          group: "Splash Settings"
        },
        // SSIDS
        {
          title: "Organization SSIDs",
          action: async () =>
            await reports
              .getNetworksSsids({ networkIds: this.nets.map(n => n.id) })
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "SSIDs"
        },
        {
          title: "Network SSIDs",
          action: async () =>
            await this.$meraki
              .getNetworkSsids({ networkId: this.net.id })
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: SsidSelector }],
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "Static Routes"
        },
        // Switch Ports -- NEW LIBRARY
        {
          title: "Get Device Switch Ports",
          action: async () =>
            await this.$merakiSdk.SwitchPortsController.getDeviceSwitchPorts(
              this.device.serial
            ),
          formComponents: [
            { component: DeviceSelector, attributes: { model: "MS" } }
          ],
          group: "Switch Ports"
        },
        {
          title: "Get Network Switch Settings",
          action: async () =>
            await this.$merakiSdk.SwitchSettingsController.getNetworkSwitchSettings(
              this.net.id
            ),
          formComponents: [],
          group: "Switch Settings"
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
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
              .then(res => this.toReport(res.data)),
          formComponents: [
            { component: DeviceSelector },
            { component: TimespanSelector }
          ],
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
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
              .then(res => this.toReport(res.data)),
          formComponents: [{ component: TimespanSelector }],
          group: "Wireless Health"
        },
        {
          title: "VLANs of Network",
          action: async () =>
            await this.$meraki
              .getNetworkVlans({
                networkId: this.net.id
              })
              .then(res => this.toReport(res.data)),
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
              //.then(res => res.data)
              .then(res => this.toReport(res.data)),
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
              .then(res => this.toReport(res.data)),
          formComponents: [],
          group: "VLANs"
        }
      ];
    },

    // Dynamic Selectors
    groups: function() {
      let g = this.reports.filter(r => r.group);
      g.push({ group: "All" });
      return g;
    },
    groupReports() {
      return this.reports.filter(r => {
        if (r.group === this.selectedGroup) {
          return r;
        } else if (this.selectedGroup == "All") {
          return this.reports;
        }
      });
    }
  },
  methods: {
    onSearch(report) {
      console.log("onSearch event", report.group);
      this.selectedGroup = report.group; //{ group: report.group };
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.title.toLowerCase();
      const textTwo = item.group.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    onRunReport() {
      this.$store.commit("setLoading", true);
      this.reportData = []; // Clear Current Report
      this.selectedReport
        .action()
        /*
        .then(res => {
          if (!Array.isArray(res)) {
            res = [res];
          }
          this.reportData = res;
          console.log("onRunReport reportData ", res);
          this.reportToSheet();
        })
        */
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
    toReport(report, noHeaders) {
      // format all responses into an array
      if (!Array.isArray(report)) {
        report = [report];
      }
      // store data
      //this.reportData = report;
      this.reportData = [...this.reportData, ...report];
      console.log("reportToSheet report ", report);
      console.log("reportToSheet report, noHeaders ", noHeaders);
      //this.reportToSheet();
      this.$utilities.writeData(this.reportData, noHeaders);
    }
  }
});
</script>
<style>
.v-list__tile__content {
  font-size: small;
}
.auto-complete {
  flex: 1 1;
  margin-top: 0;
  min-width: 0;
  pointer-events: none;
  position: relative;
}
</style>