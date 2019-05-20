<template id="page-reports-auto-oas">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card pb-4>
          <v-card-title>
            <h3>Generated Reports</h3>
            <v-spacer></v-spacer>
            <v-btn icon @click="showSearchDialog=true">
              <v-icon color="grey lighten-1">search</v-icon>
            </v-btn>
            <v-dialog v-model="showSearchDialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <v-autocomplete
                    class="font-weight-light"
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
                    allowOverflow
                  ></v-autocomplete>
                </v-card-title>
                <v-card-actions>
                  <v-btn color="primary" flat @click="showSearchDialog=false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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

              <div>
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
                  >
                    <template slot="selection" slot-scope="data">{{ data.item.title }}</template>
                    <template slot="item" slot-scope="data">{{ data.item.operationId}}</template>
                  </v-select>
                </v-flex>
              </div>

              <div v-if="report.requiredSelectors">
                <div v-if="report.requiredSelectors.length">
                  <h4>Required</h4>
                  <v-flex
                    xs12
                    sm6
                    md6
                    pt-2
                    d-flex
                    v-for="c in report.requiredSelectors"
                    :key="c.component.title"
                  >
                    <component
                      :is="c.component"
                      v-bind="c.attributes"
                      v-dynamic-events="c.knownEvents"
                    ></component>
                  </v-flex>
                </div>
              </div>
              <div v-if="report.optionalSelectors">
                <div v-if="report.optionalSelectors.length">
                  <hr>
                  <h4>Optional</h4>
                  <v-flex
                    xs12
                    sm6
                    md6
                    pt-2
                    d-flex
                    v-for="c in report.optionalSelectors"
                    :key="c.component.title"
                  >
                    <component
                      :is="c.component"
                      v-bind="c.attributes"
                      v-dynamic-events="c.knownEvents"
                    ></component>
                  </v-flex>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-flex xs12 sm12 md12 pt-2>
          <v-card>
            <v-card-title>
              <h3>JSON Results</h3>
              <v-btn
                absolute
                right
                dark
                color="primary"
                @click="onSaveFile"
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
import axios from "axios";
import getFunctionArguments from "get-function-arguments";
import lodash from "lodash";
import SwaggerParser from "swagger-parser";
import VueJsonPretty from "vue-json-pretty";

// Dynamic Components
import ActionBatchSelector from "../shared/meraki-selectors/ActionBatchSelector";
import ClientSelector from "../shared/meraki-selectors/ClientSelector";
import DeviceSelector from "../shared/meraki-selectors/DeviceSelector";
import DevicesSelector from "../shared/meraki-selectors/DevicesSelector";
import OrgSelector from "../shared/OrgSelector";
import NetSelector from "../shared/NetSelector";
import MethodSelector from "../shared/meraki-selectors/MethodSelector";
import ModelSelector from "../shared/meraki-selectors/ModelSelector";
import SsidSelector from "../shared/meraki-selectors/SsidSelector";
import SwitchPortSelector from "../shared/meraki-selectors/SwitchPortSelector";
import VlanSelector from "../shared/meraki-selectors/VlanSelector";
import TimespanSelector from "../shared/meraki-selectors/TimespanSelector";
import ToggleSelector from "../shared/meraki-selectors/ToggleSelector";
import ZoneSelector from "../shared/meraki-selectors/ZoneSelector";
import InputSelector from "../shared/meraki-selectors/InputSelector";
import FirewalledServiceSelector from "../shared/meraki-selectors/FirewalledServiceSelector.vue";
import BleClientSelector from "../shared/meraki-selectors/BleClientSelector.vue";

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
  mounted() {
    this.initReports();
  },
  watch: {
    org() {
      this.initReports();
    },
    reports() {
      if (!this.selectedReport.title) return;
      this.selectedReport = this.reports.find(
        r => r.title == this.selectedReport.title
      );
    },
    selectedGroup() {
      if (!this.groupReports) {
        return;
      }
      this.selectedReport = this.groupReports[0]; // set default report
    },
    selectedReport() {
      this.formData = {}; // reset form data
      this.formData.org = this.org;
      this.formData.net = this.net;
    }
  },
  directives: {
    DynamicEvents: {
      bind: (el, binding, vnode) => {
        const allEvents = binding.value;
        if (!allEvents) {
          return;
        }
        Object.keys(allEvents).forEach(event => {
          // register handler in the dynamic component
          vnode.componentInstance.$on(event, eventData => {
            const targetEvent = allEvents[event];
            vnode.context[targetEvent]({
              event: event,
              eventData,
              eventData
            });
          });
        });
      },
      unbind: function(el, binding, vnode) {
        vnode.componentInstance.$off();
      }
    }
  },
  data() {
    return {
      showSearchDialog: false,
      browseByGroup: false,
      selectedGroup: "",
      selectedReport: {
        title: "",
        path: "",
        pathParams: [],
        requiredSelectors: [],
        optionalSelectors: [],
        paramVals: {},
        group: "All"
      },
      parsedSwagger: {},
      swaggerReports: [],
      filteredPaths: [],
      reportData: [],
      formData: {}
    };
  },

  computed: {
    loading: function() {
      return this.$store.state.loading;
    },
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    apiUrl: function() {
      return this.$store.state.apiUrl;
    },
    org: function() {
      return this.$store.state.org;
    },
    net: function() {
      return this.$store.state.net;
    },
    reportItems: function() {
      return this.reports.filter(r => r.group === this.selectedGroup.group);
    },
    /**
     * Creates a computed report based off of generated template and selector formData
     */
    report: function() {
      // Copy selected report template
      let report = this.selectedReport;

      // Adjust Meraki Path Params
      if (report.parameters) {
        // Filter unneeded parameters
        report.adjustedParams = report.parameters.filter(
          p =>
            !p.name.includes("startingAfter") &&
            !p.name.includes("endingBefore") &&
            !p.name.includes("t0") &&
            !p.name.includes("t1")
        );
        // Normalize the parameter names for global variables
        report.adjustedParams = report.adjustedParams.map(p => {
          p.name = this.adjustMerakiParam(report.path, p.name);
          return p;
        });
      }

      // **********
      // SET Selectors
      // **********

      if (report.adjustedParams) {
        // Required Selectors
        report.requiredSelectors = this.getSelectors(
          report.adjustedParams.filter(p => p.required)
        );

        // Optional / Query Selectors
        report.optionalSelectors = this.getSelectors(
          report.adjustedParams.filter(p => !p.required)
        );
      }

      // **********
      // SET Parameters
      // **********
      report.pathParams = this.getSwaggerPathParams(report.adjustedParams);
      report.queryParams = this.getSwaggerQueryParams(report.adjustedParams);

      // **********
      // SET Action
      // **********

      // Collect the parameter values
      if (!report.adjustedParams) {
        report.action = report.path;
        return report;
      }
      report.paramVals = this.getComponentParamVals(report.adjustedParams);

      // Adjust Path with Values
      let newPath = report.path.replace(/\{\w+\}/gi, n => {
        let param = n.replace(/[{}]/g, "");
        return report.paramVals[this.adjustMerakiParam(report.path, param)];
      });
      report.action = newPath;

      // Append Query with Values
      if (!report.queryParams) {
        return report;
      }
      if (report.queryParams.length > 0) {
        let query = "";
        report.queryParams.forEach((qp, i) => {
          if (!report.paramVals[qp.name]) {
            return;
          }
          if (i > 0 && query !== "") {
            query = query + "&" + qp.name + "=" + report.paramVals[qp.name];
          } else {
            query = "?" + qp.name + "=" + report.paramVals[qp.name];
          }
        });
        report.action = report.action + query;
      }
      return report;
    },
    reports: function() {
      return this.swaggerReports;
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
    deviceSelectorAttributes() {
      if (this.selectedReport["path"].includes("cameras")) {
        return { model: "MV" };
      }
      if (this.selectedReport["path"].includes("switch")) {
        return { model: "MS" };
      }
      if (this.selectedReport["path"].includes("appliance")) {
        return { model: "MX" };
      }
      if (this.selectedReport["path"].includes("radio")) {
        return { model: "MR" };
      }
      if (this.selectedReport["path"].includes("connectionStats")) {
        return { model: "MR" };
      }
      if (this.selectedReport["path"].includes("wireless")) {
        return { model: "MR" };
      } else {
        return {};
      }
    },
    /**
     * Maps a Meraki API parameter to a Vue component with additional options and value path.
     */
    paramComponentMap() {
      // Use only adjusted param names here
      return {
        networkId: {
          //component: // Using global state
          paramVal: this.net ? this.net.id : undefined
        },
        bluetoothClientId: {
          component: BleClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["bluetoothClient"]
            ? this.formData["bluetoothClient"]["id"]
            : undefined
        },
        includeConnectivityHistory: {
          component: ToggleSelector,
          attributes: {
            label: "Include Connectivity History",
            param: "includeConnectivityHistory"
          },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["includeConnectivityHistory"]
        },
        organizationId: {
          //component: // using global state
          paramVal: this.org ? this.org.id : undefined
        },
        actionBatchId: {
          component: ActionBatchSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["actionBatch"]
            ? this.formData["actionBatch"]["id"]
            : undefined
        },
        service: {
          component: FirewalledServiceSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["firewalledService"]
        },
        method: {
          component: MethodSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["method"]
        },
        idOrMacOrIp: {
          component: ClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["client"]
            ? this.formData["client"]["id"]
            : undefined
        },
        // TODO: use adjusted param
        mac: {
          component: ClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["client"]
            ? this.formData["client"]["mac"]
            : undefined
        },
        clientId: {
          component: ClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["client"]
            ? this.formData["client"]["id"]
            : undefined
        },
        clientMac: {
          component: ClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["client"]
            ? this.formData["client"]["mac"]
            : undefined
        },
        serial: {
          component: DeviceSelector,
          attributes: this.deviceSelectorAttributes, //{ model: "MV" } WORKS,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["device"]
            ? this.formData["device"]["serial"]
            : undefined
        },
        serials: {
          component: DevicesSelector,
          attributes: this.deviceSelectorAttributes,
          paramVal: this.formData["devices"]
            ? this.formData["devices"].filter(d => d.serial)
            : undefined
        },
        ssidNumber: {
          component: SsidSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["ssid"]
            ? this.formData["ssid"]["number"]
            : undefined
        },
        switchPortNumber: {
          component: SwitchPortSelector,
          attributes: { device: this.formData["device"] },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["switchPort"]
            ? this.formData["switchPort"]["number"]
            : undefined
        },
        timespan: {
          component: TimespanSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["timespan"]
        },
        vlanId: {
          component: VlanSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["vlan"]
            ? this.formData["vlan"]["id"]
            : undefined
        },
        connectivityHistoryTimespan: {
          component: TimespanSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["timespan"]
        },
        zoneId: {
          component: ZoneSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["zone"]
            ? this.formData["zone"]["id"]
            : undefined
        }
      };
    }
  },
  methods: {
    // *****
    // UI
    // *****
    onSearch(report) {
      console.log("onSearch event", report.group);
      this.selectedGroup = report.group; //{ group: report.group };
      this.showSearchDialog = false;
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.title.toLowerCase();
      const textTwo = item.group.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    // *****
    // SWAGGER Reports
    // *****
    initReports() {
      this.parseMerakiSwagger(this.org.id).then(parsed => {
        this.parsedSwagger = parsed;
        this.generateSwaggerReports(parsed);
      });
    },
    parseMerakiSwagger(orgId) {
      if (!this.$merakiSdk.OpenAPISpecController || !orgId) {
        // Public OAS
        return axios
          .get(this.apiUrl + "/openapiSpec")
          .then(res => {
            return res.data;
          })
          .catch(e => console.log("axios openapiSpec get error ", e));
      } else {
        // Org specific OAS
        return this.$merakiSdk.OpenAPISpecController.getOrganizationOpenapiSpec(
          orgId
        )
          .then(res => {
            // Parsing Swagger Spec
            return SwaggerParser.parse(res)
              .then(r => {
                return r;
              })
              .catch(e => console.log("SwaggerParser error ", e));
          })
          .catch(e => this.handleError(e));
      }
    },
    generateSwaggerReports(parsedSwagger) {
      if (!parsedSwagger) {
        return;
      }
      this.swaggerReports = [];

      // Extract API paths
      let paths = Object.keys(parsedSwagger.paths);
      paths.forEach(path => {
        // Only use GET methods
        if (parsedSwagger.paths[path]["get"]) {
          this.filteredPaths.push({
            ...parsedSwagger.paths[path]["get"],
            ...{ path: path }
          });
        }
      });

      // Define swagger report template
      this.filteredPaths.forEach(path => {
        let report = {};
        report.title = path.summary;
        report.path = path.path;
        report.operationId = path.operationId;
        report.description = path.description;
        report.group = path.tags[0];
        report.parameters = path.parameters;
        this.swaggerReports.push(report);
      });
    },
    adjustMerakiParam(path, param) {
      // The order of evaluation can have an impact

      if (param === "mac" && path.includes("/admins/{id}")) {
        return "adminId";
      }
      if (param === "mac" && path.includes("/clients/{mac}")) {
        return "clientMac";
      }
      if (param === "network_id") {
        return "networkId";
      }
      if (param === "number" && path.includes("/ssids/{number}")) {
        return "ssidNumber";
      }
      if (param === "number" && path.includes("/switchPorts/{number}")) {
        return "switchPortNumber";
      }
      if (param === "id" && path.includes("/actionBatches/{id}")) {
        return "actionBatchId";
      }
      if (param === "id" && path.includes("/bluetoothClients/{id}")) {
        return "bluetoothClientId";
      }
      if (param === "id" && path.includes("/sm/user/{id}")) {
        return "userId";
      }
      if (param === "id" && path.includes("/httpServers/webhookTests/{id}")) {
        return "httpServerId";
      }
      if (param === "id" && path.includes("/httpServers/{id}")) {
        return "httpServerId";
      }
      if (param === "id" && path.includes("/merakiAuthUsers/{id}")) {
        return "merakiAuthUserId";
      }
      // These should stay at the bottom
      if (param === "id" && path.includes("/organizations/{id}")) {
        return "organizationId";
      }
      if (param === "id" && path.includes("/networks/{id}")) {
        return "networkId";
      }
      if (param === "zone_id") {
        return "zoneId";
      }
      return param;
    },
    getSelectors(paramObjects) {
      if (!paramObjects) {
        return;
      }
      let selectors = [];
      // Assign selector for each known parameter
      paramObjects.forEach(p => {
        if (this.paramComponentMap[p.name] !== undefined) {
          if (!this.paramComponentMap[p.name].component) {
            return;
          }
          selectors.push(this.paramComponentMap[p.name]);
        } else {
          // Assign a dynamic Input Selector for unkown parameters
          console.log("getSelectors no component found for param p", p);
          selectors.push({
            component: InputSelector,
            attributes: {
              label: p.name,
              description: p.description
            },
            knownEvents: { onChange: "handleSelectorEvent" }
          });
        }
      });
      return selectors;
    },
    // Store selector data in formData
    handleSelectorEvent(event) {
      this.formData = {
        ...this.formData,
        ...event.eventData
      };
    },
    getComponentParamVals(params) {
      if (!params) {
        return;
      }
      let paramVals = {};
      params.forEach(p => {
        if (this.paramComponentMap[p.name]) {
          paramVals[p.name] = this.paramComponentMap[p.name].paramVal;
        } else {
          paramVals[p.name] = this.formData[p.name];
        }
      });
      return paramVals;
    },

    getSwaggerPathParams(params) {
      if (!params || params === undefined) {
        return;
      }
      return params.filter(p => p.in === "path");
    },
    getSwaggerQueryParams(params) {
      if (!params || params === undefined) {
        return;
      }
      return params.filter(p => p.in === "query");
    },
    generateReportAction(path, pathParams) {
      if (!pathParams) {
        return path;
      }
      var paramNames = Object.keys(pathParams);
      if (paramNames.length > 0) {
        var mapping = {};
        paramNames.forEach((e, i) => (mapping[`{${e}}`] = pathParams[e]));
        let newPath = path.replace(/\{\w+\}/gi, n => mapping[n]);
        return newPath;
      } else {
        return path;
      }
    },
    onRunReport() {
      this.$store.commit("setLoading", true);
      this.reportData = []; // Clear Current Report

      // Run Report based on environment
      if (process.env.VUE_APP_SERVICE === "gas") {
        const url = `${this.apiUrl}/${this.report.action}`;
        const options = {
          method: "get",
          headers: { "X-Cisco-Meraki-API-Key": this.apiKey },
          contentType: "application/json",
          followRedirects: true
        };
        google.script.run
          .withSuccessHandler(res => {
            let data;
            console.log("on RunReport gasRequest .fetch res: ", res);
            try {
              data = JSON.parse(res.body);
              //
            } catch (error) {
              console.log("unable to parse body, returning default body");
              data = res.body;
            }
            this.handleResponse(data);
          })
          .withFailureHandler(error => {
            console.log("GAS via OAS error: ", error);
            return this.handleError(error, "onRunReport");
          })
          .fetch(url, options);
      } else {
        const options = {
          method: "get",
          baseURL: this.apiUrl,
          url: this.report.action,
          headers: {
            "X-Cisco-Meraki-API-Key": this.apiKey
          }
        };

        axios(options)
          .then(res => this.handleResponse(res.data))
          .catch(e => {
            this.handleError(e);
          });
      }
    },
    // Used for dynamic report response -- logic not used for report templates
    parseSwaggerPaths(swagger) {
      let paths = swagger["paths"];
      //console.log("organization Open API paths", paths);
      let report = [];
      try {
        // get paths
        Object.keys(paths).forEach(function(path, index) {
          // get details for each path resource
          Object.keys(paths[path]).forEach((p, i) => {
            let summary = paths[path][p]["summary"];
            let description = paths[path][p]["description"];
            let operationId = paths[path][p]["operationId"];
            let params = paths[path][p]["parameters"] || [];
            let method = Object.keys(paths[path])[i];

            // pathParams
            let pathParams = [];
            let filteredPathParams = params.filter(p => p.in.includes("path"));
            filteredPathParams.forEach(p => pathParams.push(p.name));
            pathParams = JSON.stringify(pathParams);

            // queryParams
            let queryParams = [];
            let filteredQueryParams = params.filter(p =>
              p.in.includes("query")
            );
            filteredQueryParams.forEach(p => queryParams.push(p.name));
            queryParams = JSON.stringify(queryParams);

            // bodyModel
            let bodyModel = [];
            let filteredBodyModel = params.filter(p => p.in.includes("body"));
            filteredBodyModel.forEach(p => bodyModel.push(p.name));
            bodyModel = JSON.stringify(bodyModel);

            // create report
            report.push({
              summary,
              path,
              method,
              operationId,
              pathParams,
              queryParams,
              bodyModel
              //description //this data has chararcter conflicts with the sheet
            });
          });
        });
        return report;
      } catch (error) {
        this.handleError(error, "parseSwaggerPaths");
      }
    },
    adjustMerakiReport(path, res) {
      if (path.includes("/openapiSpec")) {
        return this.parseSwaggerPaths(res);
      }
      return res;
    },
    handleResponse(res) {
      // modify report
      let modifiedReport = this.adjustMerakiReport(this.report.path, res);
      // send to report
      this.$store.commit("setLoading", false);
      this.toReport(modifiedReport);
    },
    toReport(report, headers, noHeaders) {
      // format all responses into an array
      if (!Array.isArray(report)) {
        report = [report];
      }
      // store report data
      this.reportData = [...this.reportData, ...report] || [];
      this.$utilities.writeData(this.reportData, headers, noHeaders);
    },
    onSaveFile() {
      this.$utilities.saveFile(this.reportData, this.selectedReport.title);
    },
    handleError(error, errorTitle) {
      this.$store.commit("setLoading", false);
      console.log(errorTitle);
      if (error.errorCode === 400) {
        console.log("Bad request, often due to missing a required parameter.");
        this.$store.commit("setSnackbar", {
          msg: "Bad request, often due to missing a required parameter.",
          color: "danger"
        });
      } else if (error.errorCode === 401) {
        console.log("No valid API key provided.");
        this.$store.commit("setSnackbar", {
          msg: "No valid API key provided.",
          color: "danger"
        });
      } else if (error.errorCode >= 500 && error.errorCode < 600) {
        console.log("Server error");
        this.$store.commit("setSnackbar", {
          msg: "Server error or invalid parameters",
          color: "danger"
        });
      } else if (error.errorCode === 404) {
        console.log(
          "The requested resource doesn't exist or you do not have permission"
        );
        this.$store.commit("setSnackbar", {
          msg:
            "The requested resource doesn't exist or you do not have permission",
          color: "danger"
        });
      } else {
        console.log("Welp, that's not good: ", error);
        this.$store.commit("setSnackbar", {
          msg:
            "That didn't go well.. Not sure if it was your or me... Did you forget a parameter?",
          color: "danger"
        });
      }
      return;
    }
  }
});
</script>
<style scoped>
.v-autocomplete {
  text-size: smaller;
}
</style>