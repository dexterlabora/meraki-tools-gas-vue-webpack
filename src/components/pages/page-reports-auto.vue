<template id="page-reports-auto">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title>
            <h3>Reports</h3>
          </v-card-title>
          <v-card-text>
            <div>
              <v-btn @click="test">test</v-btn>
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
                <v-btn @click="browseByGroup = !browseByGroup">Browse by Group</v-btn>
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

import ClientSelector from "../shared/ClientSelector";
import DeviceSelector from "../shared/DeviceSelector";
import DevicesSelector from "../shared/DevicesSelector";
import OrgSelector from "../shared/OrgSelector";
import NetSelector from "../shared/NetSelector";
import SsidSelector from "../shared/SsidSelector";
import TimespanSelector from "../shared/TimespanSelector";
import ZoneSelector from "../shared/ZoneSelector";
import InputSelector from "../shared/InputSelector";
import VueJsonPretty from "vue-json-pretty";

import getFunctionArguments from "get-function-arguments";
//import * as rg from "../../report-generator.ts";
//const reportGenerator = rg.reportGenerator;

export default Vue.extend({
  template: "#page-reports-auto",
  components: {
    InputSelector,
    ClientSelector,
    DeviceSelector,
    DevicesSelector,
    SsidSelector,
    TimespanSelector,
    VueJsonPretty,
    OrgSelector,
    NetSelector
  },
  mounted() {
    this.onGenerateReports();
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
      reports: [],
      reportData: []
      //reports: []
    };
  },
  watch: {
    reports() {
      // refresh report with updated params
      if (!this.selectedReport.title) return;
      this.selectedReport = this.reports.find(
        r => r.title == this.selectedReport.title
      );
    }
  },
  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
    },
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
    },
    paramComponents() {
      return {
        clientId: ClientSelector,
        clientMac: ClientSelector,
        serial: DeviceSelector,
        serials: DevicesSelector,
        ssidNum: SsidSelector,
        timespan: TimespanSelector,
        input: InputSelector,
        networkId: NetSelector,
        organizationId: OrgSelector
      };
    },
    params() {
      return {
        clientId: this.client.mac,
        clientMac: this.client.mac,
        serial: this.device.serial,
        serials: this.serials,
        ssidNum: this.ssid.number,
        timespan: this.timespan,
        input: this.input,
        networkId: this.net.id,
        organizationId: this.org.id,
        startingAfter: "", // Left blank intentionally
        endingBefore: "", // Left blank intentionally
        perPage: "200" // ToDo - tie this to selector
      };
    }
  },
  methods: {
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
    generateReports(library) {
      let reports = [];
      this.getControllerNames(library).forEach(c => {
        this.getMethodNames(library[c])
          .filter(m => m.includes("get"))
          .forEach(m => {
            let r = {};
            r.group = c;
            r.title = m.replace(/([A-Z])/g, " $1").replace("get ", "");
            r.action = library[c][m];

            r.params = this.getParamNames(library[c][m]).filter(
              p => !p.includes("callback")
            );

            r.formComponents = [];
            r.params.forEach(p => {
              if (!this.paramComponents[p]) {
                return;
              }
              r.formComponents.push(this.paramComponents[p]);
            });

            // moves param map to single argument
            /*
            if (r.params) {
              r.params = r.params[0];
            }
            */
            console.log("r ", r); // DEBUGGING
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
    },
    test() {
      let test = this.$merakiSdk.DevicesController.getNetworkDevice(
        this.net.id,
        this.device.serial
      )
        .then(res => console.log("test", res))
        .catch(e => console.log(e));
    },

    onGenerateReports() {
      //this.reports = this.generateReports(merakiSdk);
      this.reports = this.generateReports(this.$merakiSdk);
    },
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
      //this.$store.commit("setLoading", true);
      console.log("this.selectedReport.params", this.selectedReport.params);
      let params = this.selectedReport.params;
      let paramVals = [];
      params.forEach(p => paramVals.push(this.params[p]));
      console.log("onRunReport params", params);
      console.log("onRunReport paramsVals", paramVals);
      this.selectedReport.action // if method only requires one paramater, extram param object to just single value
        .apply(null, paramVals)
        //.action(Object.values(this.selectedReport.params))
        /*
        .action(
          this.selectedReport.params.length > 0
            ? this.selectedReport.params
            : Object.values(this.selectedReport.params)[0]
        )
        */
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