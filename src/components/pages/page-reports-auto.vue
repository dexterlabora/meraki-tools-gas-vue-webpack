<template id="page-reports-auto">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <p>BETA - These reports are dynamically generated and have not been fully tested</p>
        <v-card pb-4>
          <v-card-title>
            <h3>Generated Reports</h3>
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
                v-if="selectedReport.title"
              >
                <v-icon>play_arrow</v-icon>
              </v-btn>

              <v-flex xs12 sm6 md6>
                <v-autocomplete
                  prepend-inner-icon="search"
                  v-model="selectedReport"
                  return-object
                  :items="reports"
                  :filter="customFilter"
                  color="white"
                  item-text="title"
                  label="Search"
                  outline
                  @change="onSearch"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-btn
                  round
                  color="secondary"
                  @click="browseByGroup = !browseByGroup"
                >Browse by Group</v-btn>
              </v-flex>
              <div v-if="browseByGroup">
                <v-flex xs12 sm6 md4 pt-2 d-flex>
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
import getFunctionArguments from "get-function-arguments";
import lodash from "lodash";

import ActionBatchSelector from "../shared/ActionBatchSelector";
import ClientSelector from "../shared/ClientSelector";
import DeviceSelector from "../shared/DeviceSelector";
import DevicesSelector from "../shared/DevicesSelector";
import OrgSelector from "../shared/OrgSelector";
import NetSelector from "../shared/NetSelector";
import MethodSelector from "../shared/MethodSelector";
import ModelSelector from "../shared/ModelSelector";
import SsidSelector from "../shared/SsidSelector";
import SwitchPortSelector from "../shared/SwitchPortSelector";
import VlanSelector from "../shared/VlanSelector";
import TimespanSelector from "../shared/TimespanSelector";
import ZoneSelector from "../shared/ZoneSelector";
import InputSelector from "../shared/InputSelector";
import VueJsonPretty from "vue-json-pretty";
import FirewalledServiceSelector from "../shared/FirewalledServiceSelector.vue";

export default Vue.extend({
  template: "#page-reports-auto",
  components: {
    ActionBatchSelector,
    InputSelector,
    ClientSelector,
    DeviceSelector,
    DevicesSelector,
    SsidSelector,
    SwitchPortSelector,
    VlanSelector,
    TimespanSelector,
    MethodSelector,
    ModelSelector,
    VueJsonPretty,
    OrgSelector,
    NetSelector
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
      //reports: []
    };
  },
  watch: {
    reports() {
      if (!this.selectedReport.title) return;
      this.selectedReport = this.reports.find(
        r => r.title == this.selectedReport.title
      );
    }
  },
  computed: {
    actionBatch: function() {
      return this.$store.state.actionBatch;
    },
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    loading: function() {
      return this.$store.state.loading;
    },
    client: function() {
      return this.$store.state.client;
    },
    bleClient: function() {
      return this.$store.state.bleClient;
    },
    org: function() {
      return this.$store.state.org;
    },
    method: function() {
      return this.$store.state.method;
    },
    model: function() {
      return this.$store.state.model;
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
    firewalledService: function() {
      return this.$store.state.firewalledService;
    },
    ssid: function() {
      return this.$store.state.ssid;
    },
    switchPorts: function() {
      return this.$store.state.switchPorts;
    },
    switchPort: function() {
      return this.$store.state.switchPort;
    },
    timespan: function() {
      return this.$store.state.timespan;
    },
    t0: function() {
      return this.$store.state.t0;
    },
    t1: function() {
      return this.$store.state.t1;
    },
    vlan: function() {
      return this.$store.state.vlan;
    },
    vlans: function() {
      return this.$store.state.vlans;
    },
    zone: function() {
      return this.$store.state.zone;
    },
    reportItems: function() {
      return this.reports.filter(r => r.group === this.selectedGroup.group);
    },

    // Group Selectors
    groups: function() {
      let groups = this.reports.filter(r => r.group);

      return groups.sort(function(a, b) {
        if (a.group < b.group) return -1;
        if (a.group > b.group) return 1;
        return 0;
      });
    },
    groupReports() {
      this.reports.sort(function(a, b) {
        if (a.group < b.group) return -1;
        if (a.group > b.group) return 1;
        return 0;
      });
      return this.reports.filter(r => {
        if (r.group === this.selectedGroup) {
          return r;
        } else if (this.selectedGroup == "All") {
          return this.reports;
        }
      });
    },

    paramComponentMap() {
      return {
        actionBatchId: {
          component: ActionBatchSelector,
          paramVal: this.actionBatch.id
        },
        service: {
          component: FirewalledServiceSelector,
          paramVal: this.firewalledService
        },
        method: {
          component: MethodSelector,
          paramVal: this.method
        },
        number: {
          component: SwitchPortSelector, // switches (may need to adjust this)
          paramVal: this.switchPort.number
        },
        idOrMacOrIp: {
          component: ClientSelector,
          paramVal: this.client.id
        },
        mac: {
          component: ClientSelector,
          paramVal: this.client.mac
        },
        clientId: {
          component: ClientSelector,
          paramVal: this.client.id
        },
        clientMac: {
          component: ClientSelector,
          paramVal: this.client.mac
        },
        serial: {
          component: DeviceSelector,
          paramVal: this.device.serial
        },
        serials: {
          component: DevicesSelector,
          paramVal: this.devices.filter(d => d.serial)
        },
        ssid: {
          component: SsidSelector,
          paramVal: this.ssid.number
        },
        ssidNum: {
          component: SsidSelector,
          paramVal: this.ssid.number
        },
        timespan: {
          component: TimespanSelector,
          paramVal: this.timespan
        },
        t1: {
          component: TimespanSelector,
          paramVal: this.t1
        },
        vlanId: {
          component: VlanSelector,
          paramVal: this.vlan.id
        },
        input: {
          component: InputSelector,
          paramVal: this.input
        },
        networkId: {
          component: "", // NetSelector,
          paramVal: this.net.id
        },
        organizationId: {
          component: "", //OrgSelector,
          paramVal: this.org.id
        },
        connectivityHistoryTimespan: {
          component: TimespanSelector,
          paramVal: this.timespan
        },
        zoneId: {
          component: ZoneSelector,
          paramVal: this.zone.id
        }
      };
    },

    /*
    get controllers 
    get methods forEach controller
    set method title
    set method group
    get params forEach method
    get paramSelectors forEach param
    get paramVals forEach param
    return report

    */
    /*
    reports() {
      let library = this.$merakiSdk;
      let reports = [];

      // Get Controllers
      let controllers = this.getControllerNames(library);

      // Get Methods
      let methods = [];
      controllers.forEach(c => {
        //methods.push(this.getMethodNames(library[c]));
        methods = [...methods, ...this.getMethodNames(library[c])];
        console.log("methods ", methods);
      });

      // Get Params
      // BROKEN 
      let params = [];
      methods.forEach(m => {
        // Set Params
        r.params = this.getParamNames(library[c][m]).filter(
          p => !p.includes("callback")
        );
        r.params = this.adjustMerakiParams(m, r.params);
      });
    

      //  Assign Title, Group, Selectors and ParamVals for each method
      methods
        .filter(m => m.includes("get"))
        .forEach(m => {
          let r = {};
          r.group = lodash.startCase(c).replace("Controller", "");
          r.title = m.replace(/([A-Z])/g, " $1").replace("get ", "");
          r.action = library[c][m];

          // Set Components and ParamVal
          r.formComponents = [];
          r.paramVals = [];
          r.params.forEach(p => {
            if (!this.paramComponentMap[p]) {
              return;
            }
            r.formComponents.push(this.paramComponentMap[p].component);
            r.paramVals.push(this.paramComponentMap[p].paramVal);
          });

          // DEBUGGING
          console.log("r ", r);
          console.log("r.params", r.params);
          console.log("r.paramVals", r.paramVals);
          console.log("r.formComponents", r.formComponents);

          reports.push(r);
        });

      reports.sort(function(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      return reports;
    }
    */

    reports() {
      let library = this.$merakiSdk;
      let reports = [];
      this.getControllerNames(library).forEach(c => {
        this.getMethodNames(library[c])
          .filter(m => m.includes("get"))
          .forEach(m => {
            let r = {};
            r.group = lodash.startCase(c).replace("Controller", "");
            r.title = m.replace(/([A-Z])/g, " $1").replace("get ", "");
            r.action = library[c][m];

            // Set Params
            r.params = this.getParamNames(library[c][m]).filter(
              p => !p.includes("callback")
            );
            r.params = this.adjustMerakiParams(m, r.params);

            // Set Components and Param
            r.formComponents = [];
            r.paramVals = [];
            r.params.forEach(p => {
              if (!this.paramComponentMap[p]) {
                return;
              }
              r.formComponents.push(this.paramComponentMap[p].component);
              r.paramVals.push(this.paramComponentMap[p].paramVal);
            });

            // DEBUGGING
            console.log("r ", r);
            console.log("r.params", r.params);
            console.log("r.formComponents", r.formComponents);

            reports.push(r);
          });
      });
      reports.sort(function(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      return reports;
    }
  },
  methods: {
    adjustMerakiParams(methodName, params) {
      params.forEach((p, i) => {
        if (p == "id" && methodName.includes("Network")) {
          params[i] = "networkId";
        }
        if (p == "id" && methodName.includes("Organization")) {
          params[i] = "organizationId";
        }
        if (p == "id" && methodName.includes("Bluetooth")) {
          params[i] = "bleClientId";
        }
        if (p == "timespan") {
          params = params.map(p => (p == "t0" ? p : undefined));
          params = params.map(p => (p == "t1" ? p : undefined));
        }
        if (p == "id" && methodName.includes("ActionBatch")) {
          params[i] = "actionBatchId";
        }
      });
      return params;
    },
    getParamNames(func) {
      return getFunctionArguments(func);
    },
    getControllerNames(library) {
      return Object.getOwnPropertyNames(library).filter(n =>
        n.includes("Controller")
      );
    },
    getMethodNames(controller) {
      return Object.getOwnPropertyNames(controller).filter(function(p) {
        return typeof controller[p] === "function";
      });
    },
    getSelectors(params) {
      let selectors = [];
      params.forEach(p => {
        selectors.push(this.paramComponentMap[p].components);
      });
      return selectors;
    },
    getParamVals(params) {
      let paramVals = [];
      params.forEach(p => {
        paramVals.push(this.paramComponentMap[p].paramsVal);
      });
      return paramVals;
    },

    test() {
      let test = this.$merakiSdk.DevicesController.getNetworkDevice(
        this.net.id,
        this.device.serial
      )
        .then(res => console.log("test", res))
        .catch(e => console.log(e));
    },

    // *****
    // UI
    // *****
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
      // Run Report
      this.selectedReport.action
        .apply(null, this.selectedReport.paramVals)
        .then(res => this.toReport(res)) // This is where I could add headers per report
        .catch(e => {
          console.log("onRunReport error ", e);
        })
        .finally(() => {
          this.$store.commit("setLoading", false);
        });
    },
    toReport(report, headers, noHeaders) {
      // format all responses into an array
      if (!Array.isArray(report)) {
        report = [report];
      }
      // store data
      //this.reportData = report;
      this.reportData = [...this.reportData, ...report];
      console.log("reportToSheet report ", report);
      console.log("reportToSheet report, headers ", headers);
      console.log("reportToSheet report, noHeaders ", noHeaders);
      //this.reportToSheet();
      this.$utilities.writeData(this.reportData, headers, noHeaders);
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