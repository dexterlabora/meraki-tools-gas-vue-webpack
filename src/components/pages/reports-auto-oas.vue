<template id="page-reports-auto-oas">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card pb-4>
          <v-card-title>
            <h3>Meraki Reports</h3>

            <!--
              v-model="selectedReport"
              @click:clear="onClearReport"
            -->

            <v-autocomplete
              class="mt-2"
              :items="reports"
              :filter="customFilter"
              @change="onSearch"
              hide-details
              hide-no-data
              hide-selected
              clearable
              item-text="name"
              item-value="symbol"
              label="Search reports.."
              solo
            >
              <template v-slot:no-data>
                <v-list-tile>
                  <v-list-tile-title>Search Reports</v-list-tile-title>
                </v-list-tile>
              </template>
              <template v-slot:selection="{ item, selected }" class="selected">{{item.shortTitle}}</template>
              <template v-slot:item="{ item }">
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.shortTitle"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="item.summary"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </v-autocomplete>
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
                <v-flex xs12 sm6 md6 pt-2 d-flex v-if="selectedReport.title">
                  <v-select
                    v-model="selectedReport"
                    :items="groupReports"
                    item-text="title"
                    return-object
                    label="Reports"
                    outline
                  >
                    <template slot="item" slot-scope="data">{{ data.item.shortTitle}}</template>
                    <template
                      slot="selection"
                      slot-scope="data"
                      class="selected"
                    >{{ data.item.title}}</template>
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

        <v-flex xs12 sm12 md12 pt-2 v-if="report.looperParam">
          <v-card>
            <v-card-title>
              <h3>Looper</h3>
            </v-card-title>

            <v-card-text p1>
              <p>
                Run multiple reports based on the selected items.
                This will override the default selector.
                <i>Some reports may not be appropriate for the selection.</i>
              </p>
              <v-flex
                xs12
                sm6
                md6
                pt-2
                d-flex
                v-for="c in report.looperSelectors"
                :key="c.component.title"
              >
                <component
                  :is="c.component"
                  v-bind="c.attributes"
                  v-dynamic-events="c.knownEvents"
                  :key="report.title"
                ></component>
              </v-flex>
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-flex>

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
import OrganizationsSelector from "../shared/meraki-selectors/OrganizationsSelector";
import NetSelector from "../shared/NetSelector";
import NetworksSelector from "../shared/meraki-selectors/NetworksSelector";
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
    },
    showSearchDialog(val) {
      if (!val) {
        return;
      }

      this.$nextTick(() => {
        console.log(
          "showSearchDialog this.$refs.search.$el",
          this.$refs.search.$el
        );
        this.$refs.search.$el.querySelector("input").focus();
      });
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

      // **********
      // SET Parameters
      // **********

      if (report.parameters) {
        // Filter unneeded parameters
        report.adjustedParams = report.parameters.filter(
          p =>
            !p.name.includes("startingAfter") &&
            !p.name.includes("endingBefore") &&
            !p.name.includes("t0") &&
            !p.name.includes("t1")
        );
        // Normalize the parameter names for global variables, store a single object
        report.adjustedParams = report.adjustedParams.map(p => {
          p.name = this.adjustMerakiParam(report.path, p.name);
          return p;
        });

        // Extract Params into unique objects
        report.pathParams = this.getSwaggerPathParams(report.adjustedParams);
        report.queryParams = this.getSwaggerQueryParams(report.adjustedParams);

        // Required Selectors
        report.requiredSelectors = this.getSelectors(
          report.adjustedParams.filter(p => p.required)
        );

        // Optional / Query Selectors
        report.optionalSelectors = this.getSelectors(
          report.adjustedParams.filter(p => !p.required)
        );

        // Looper Parameters
        let pathParamNames = [];
        report.pathParams.forEach(p => pathParamNames.push(p.name));

        report.looperParam = this.getIterableParam(pathParamNames);
        // Looper Selectors
        if (report.looperParam) {
          report.looperSelectors = this.getSelectors([report.looperParam]);
          report.looperParamVals = this.getComponentParamVals([
            report.looperParam
          ]);
        }

        // **********
        // SET Selectors
        // **********

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
      // SET Actions
      // **********

      report.actions = [];
      if (!report.adjustedParams) {
        console.log("no params for report.path", report.path);
        report.actions[0] = report.path;
        return report;
      }

      // Collect the parameter values
      report.paramVals = this.getComponentParamVals(report.adjustedParams);

      // Set Actions - TEST

      let newPath = this.getPathWithValues(report.path, report.paramVals);
      let newQueryString = this.getPathQueryWithValues(
        report.queryParams,
        report.paramVals
      );
      //console.log("newPath", newPath);
      //console.log("newQueryString", newQueryString);
      report.actions[0] = newPath + newQueryString;

      // Create Action for each looper param
      if (report.looperParam) {
        let looperVals = report.looperParamVals[report.looperParam.name];
        console.log("no looperParmVals found");
        if (!looperVals) {
          return report;
        }

        if (looperVals.length > 0) {
          report.actions = []; // reset actions to use loop param instead
          for (let looperVal of looperVals) {
            let paramVals = report.paramVals;
            paramVals[report.looperParam.iterate] = looperVal;

            let newPath = this.getPathWithValues(report.path, paramVals);
            let newQueryString = this.getPathQueryWithValues(
              report.queryParams,
              paramVals
            );
            const action = newPath + newQueryString;

            report.actions.push(action);
          }
        }
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
        networkIds: {
          component: NetworksSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["networks"]
            ? this.formData["networks"].map(n => n.id)
            : undefined
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
        organizationIds: {
          component: OrganizationsSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["organizations"]
            ? this.formData["organizations"].map(o => o.id)
            : undefined
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
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["devices"]
            ? this.formData["devices"].map(d => d.serial)
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
      if (!report) {
        return;
      }
      console.log("onSearch event", report.group);
      this.selectedGroup = report.group; //{ group: report.group };
      this.selectedReport = report;
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
      this.filteredPaths = [];

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
        report.shortTitle = _.startCase(path.operationId.replace("get", ""));
        report.operationId = path.operationId;
        report.description = path.description;
        report.group = path.tags[0];
        report.parameters = path.parameters;
        this.swaggerReports.push(report);
      });
    },
    getIterableParam(pathParams) {
      // pathParams = ['networkId', 'serial']

      // Specific param to iterate
      if (pathParams.includes("serial")) {
        // special because serial also requires networkId typically
        return {
          name: "serials",
          description: "list of device serials",
          type: "array",
          in: "path",
          iterate: "serial"
        };
      }

      // Catch All, only allow iterations when there is only one path parameter. This could be improved if required.
      if (pathParams.length > 1) {
        return;
      }
      if (pathParams.includes("organizationId")) {
        return {
          name: "organizationIds",
          description: "list of organization IDs",
          type: "array",
          in: "path",
          iterate: "organizationId"
        };
      }
      if (
        pathParams.includes("networkId")
        /*
         && 
        !pathParams.includes("serial") &&
        !pathParams.include("bluetoothClientId") &&
        !pathParams.include("actionBatchId") // Maybe better logic here
        */
      ) {
        return {
          name: "networkIds",
          description: "list of network IDs",
          type: "array",
          in: "path",
          iterate: "networkId"
        };
      }
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
    getPathWithValues(path, values) {
      console.log("getPathWithValues path, values", path, values);
      if (!values) {
        return path;
      }
      let newPath = path.replace(/\{\w+\}/gi, n => {
        let param = n.replace(/[{}]/g, "");
        let newValues = values[this.adjustMerakiParam(path, param)];
        console.log("getPathWithValues values", newValues);
        return newValues;
      });
      return newPath;
    },
    getPathQueryWithValues(queryParams, paramVals) {
      // Append Query with Values
      let query = "";
      if (!queryParams || !paramVals) {
        return query;
      }
      if (queryParams.length > 0) {
        queryParams.forEach((qp, i) => {
          if (!paramVals[qp.name]) {
            return;
          }
          if (i > 0 && query !== "") {
            query = query + "&" + qp.name + "=" + paramVals[qp.name];
          } else {
            query = "?" + qp.name + "=" + paramVals[qp.name];
          }
        });
        return query;
      } else {
        return query;
      }
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
    runAction(action, count, extraData) {
      //**
      // Run Report based on environment
      //**
      // Google Apps Script
      if (process.env.VUE_APP_SERVICE === "gas") {
        const url = `${this.apiUrl}/${action}`;
        const options = {
          method: "get",
          headers: { "X-Cisco-Meraki-API-Key": this.apiKey },
          contentType: "application/json",
          followRedirects: true
        };
        google.script.run
          .withSuccessHandler(res => {
            let data;
            console.log("runAction gasRequest .fetch res: ", res);
            try {
              data = JSON.parse(res.body);
              //
            } catch (error) {
              console.log("unable to parse body, returning default body");
              data = res.body;
            }
            return this.handleResponse(data, count, extraData);
          })
          .withFailureHandler(error => {
            console.log("GAS via OAS error: ", error);
            return this.handleError(error, "onRunReport");
          })
          .fetch(url, options);
      } else {
        // AXIOS
        const options = {
          method: "get",
          baseURL: this.apiUrl,
          url: action,
          headers: {
            "X-Cisco-Meraki-API-Key": this.apiKey
          }
        };
        axios(options)
          .then(res => this.handleResponse(res.data, count, extraData))
          //.then(res => res.data)
          .catch(e => {
            this.handleError(e);
          });
      }
    },

    async onRunReport() {
      this.$store.commit("setLoading", true);
      // auto cancel loader (to avoid hangining)
      setTimeout(() => this.$store.commit("setLoading", false), 1000);

      this.reportData = []; // Clear Current Report

      // Check if looper actions exist

      // Loops through each action in series, and adjusts the headers
      for (let [i, action] of this.report.actions.entries()) {
        let extraData = {};

        if (Object.keys(this.report.looperParamVals).length > 0) {
          if (this.report.looperParamVals[this.report.looperParam.name]) {
            const currentVal = this.report.looperParamVals[
              this.report.looperParam.name
            ][i]; // assuming only one looper param
            if (currentVal) {
              extraData[this.report.looperParam.iterate] = currentVal;
            }
          }
        }

        extraData["reportAction"] = action; // Create option to toggle this

        const results = await this.runAction(action, i, extraData);
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
    isIterable(array) {
      return Array.isArray(array) || array.length;
    },
    /*
    isIterable(obj) {
      // checks for null and undefined
      if (obj == null) {
        return false;
      }
      return typeof obj[Symbol.iterator] === "function";
    },
    */
    handleResponse(res, count, extraData) {
      if (!res) {
        console.log("handleResponse No Response");
        return;
      }

      // modify report to adjust for Meraki parameters
      let adjustedReport = this.adjustMerakiReport(this.report.path, res);

      // attach extra data to report

      if (extraData) {
        if (Array.isArray(adjustedReport)) {
          adjustedReport = adjustedReport.map(
            i => (i = { ...i, ...extraData })
            /*
              (i[this.report.looperParam.iterate] = this.report.paramVals[
                this.report.looperParam.iterate
              ])
              */
          );
        } else {
          adjustedReport = { ...adjustedReport, ...extraData };
          /*
          adjustedReport[this.report.looperParam.iterate] = this.report.paramVals[
            this.report.looperParam.iterate
          ];
          */
        }
      }

      // send to report
      this.$store.commit("setLoading", false);
      if (count > 0) {
        this.toReport(adjustedReport, "", true);
      } else {
        this.toReport(adjustedReport);
      }
      //return adjustedReport;
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
    onClearReport() {
      this.selectedReport = {
        title: "",
        path: "",
        pathParams: [],
        requiredSelectors: [],
        optionalSelectors: [],
        paramVals: {},
        group: "All"
      };
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

.input-group--select__autocomplete {
  background-color: rgb(219, 118, 63);
  height: 0px !important;
}

.input-group--select.input-group--focused .input-group--select__autocomplete {
  height: 30px !important;
  background-color: rgb(219, 118, 63);
}
/*
.selectDropDown {
  background-color: rgb(219, 118, 63);
  border: solid 1px #e6e6ea;
  font-size: 14px;
}
.selected {
  background-color: rgb(164, 243, 127);
  font-size: 14px;
}

.v-text-field--box .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
  background-color: rgb(164, 187, 37);
}
.v-select .selections {
  background-color: rgb(40, 37, 187);
}
*/
/*
$input-height: 40px;
*/
/*
.v-select.v-text-field {
  background-color: aqua;

  height: auto !important;
  max-height: 40px !important;
}

.v-text-field .v-input__control .v-input__slot{
  background-color: rgb(99, 213, 71);
  min-height: 30px !important;
}
*/
</style>