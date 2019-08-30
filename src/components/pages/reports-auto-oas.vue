<template id="page-reports-auto-oas">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card pb-4>
          <v-card-title>
            Meraki Reports
            <v-spacer></v-spacer>

            <v-autocomplete
              class="mt-2"
              :items="reports"
              :filter="searchFilter"
              @change="onSearch"
              return-object
              hide-no-data
              hide-selected
              clearable
              item-text="name"
              item-value="symbol"
              filled
              solo
              rounded
            >
              <template v-slot:label>
                <p>
                  <i>Search reports ...</i>
                </p>
              </template>
              <template v-slot:selection="{ item, selected }" class="selected">
                <label class="caption">{{item.shortTitle}}</label>
              </template>
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.shortTitle" class="caption"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.summary" class="body-2"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-card-title>
          <v-card-text>
            <div>
              <!--
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
              -->

              <v-speed-dial
                fab
                fixed
                bottom
                center
                color="primary"
                open-on-hover
                :loading="loading"
              >
                <template v-slot:activator>
                  <v-btn color="blue darken-2" dark fab @click="onRunReport('overwrite')">
                    <v-icon>play_arrow</v-icon>
                  </v-btn>
                </template>

                <!-- Beta 
                <v-btn round color="gray" @click="onRunReport('newRows')">
                  <b>insert rows</b>
                </v-btn>
                <v-btn round color="gray" @click="onRunReport('overwrite')">
                  <b>overwrite rows</b>
                </v-btn>
              <v-btn round color="gray" @click="onRunReport('newSheet')">new sheet</v-btn>
                -->
              </v-speed-dial>

              <div class="pt-4">
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    v-model="selectedGroup"
                    :items="groups"
                    item-text="group"
                    label="Group"
                    outline
                    @change="onSelectedGroup"
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
            <v-card-title>Looper</v-card-title>

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

              <v-progress-linear v-if="looperProgress > 0" v-model="looperProgress"></v-progress-linear>
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 md12 pt-2>
          <v-card>
            <v-card-title>
              JSON Results
              <v-btn
                absolute
                right
                small
                rounded
                color="gray"
                @click="onSaveFile"
                v-if="reportData"
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
import * as rh from "../../request-handler";
import getFunctionArguments from "get-function-arguments";
import lodash from "lodash";
import VueJsonPretty from "vue-json-pretty";

// Dynamic Components
import ActionBatchSelector from "../shared/meraki-selectors/ActionBatchSelector";
import ClientSelector from "../shared/meraki-selectors/ClientSelector";
import DeviceSelector from "../shared/meraki-selectors/DeviceSelector";
import DevicesSelector from "../shared/meraki-selectors/DevicesSelector";
import EventTypeSelector from "../shared/meraki-selectors/EventTypeSelector";
import OrgSelector from "../shared/OrgSelector";
import OrganizationsSelector from "../shared/meraki-selectors/OrganizationsSelector";
import NetSelector from "../shared/NetSelector";
import NetworksSelector from "../shared/meraki-selectors/NetworksSelector";
import MethodSelector from "../shared/meraki-selectors/MethodSelector";
import ModelSelector from "../shared/meraki-selectors/ModelSelector";
import ProductTypeSelector from "../shared/meraki-selectors/ProductTypeSelector";
import SsidSelector from "../shared/meraki-selectors/SsidSelector";
import SwitchPortSelector from "../shared/meraki-selectors/SwitchPortSelector";
import VlanSelector from "../shared/meraki-selectors/VlanSelector";
import TimespanSelector from "../shared/meraki-selectors/TimespanSelector";
import ToggleSelector from "../shared/meraki-selectors/ToggleSelector";
import ZoneSelector from "../shared/meraki-selectors/ZoneSelector";
import InputSelector from "../shared/meraki-selectors/InputSelector";
import FirewalledServiceSelector from "../shared/meraki-selectors/FirewalledServiceSelector.vue";
import BleClientSelector from "../shared/meraki-selectors/BleClientSelector.vue";

import * as reportHelpers from "../../report-helpers";
import * as oasReporter from "../../oas-reporter";

var rateLimit = require("function-rate-limit");

export default Vue.extend({
  template: "#page-reports-auto",
  components: {
    ActionBatchSelector,
    ClientSelector,
    DeviceSelector,
    DevicesSelector,
    EventTypeSelector,
    InputSelector,
    NetSelector,
    MethodSelector,
    ModelSelector,
    OrgSelector,
    ProductTypeSelector,
    SsidSelector,
    SwitchPortSelector,
    TimespanSelector,
    VlanSelector,
    VueJsonPretty
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
      looperProgress: 0,
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
        report.pathParams = oasReporter.getSwaggerPathParams(
          report.adjustedParams
        );
        report.queryParams = oasReporter.getSwaggerQueryParams(
          report.adjustedParams
        );

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

      let newPath = oasReporter.getPathWithValues(
        report.path,
        report.paramVals
      );
      let newQueryString = oasReporter.getPathQueryWithValues(
        report.queryParams,
        report.paramVals
      );
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

            let newPath = oasReporter.getPathWithValues(report.path, paramVals);
            let newQueryString = oasReporter.getPathQueryWithValues(
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
      // skip reports if no network selected
      return this.swaggerReports;
    },
    requiredParams() {
      if (!this.report) {
        return;
      }
      if (!this.report.parameters) {
        return;
      }
      return this.report.parameters.filter(p => p.required);
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
    timespanSelectorAttributes() {
      if (this.selectedReport["path"].includes("uplinksLossAndLatency")) {
        return { min: 120, max: 300 };
      }
    },
    deviceSelectorAttributes() {
      if (this.selectedReport["path"].includes("camera")) {
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
        actionBatchId: {
          component: ActionBatchSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["actionBatch"]
            ? this.formData["actionBatch"]["id"]
            : undefined
        },
        bluetoothClientId: {
          component: BleClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["bluetoothClient"]
            ? this.formData["bluetoothClient"]["id"]
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
        connectivityHistoryTimespan: {
          component: TimespanSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["timespan"]
        },
        excludedEventTypes: {
          component: EventTypeSelector,
          attributes: {
            label: "exclude event types",
            param: "excludeEventTypes",
            description: oasReporter.getParamDescription(
              this.parsedSwagger,
              "getNetworkEvents",
              "excludedEventTypes"
            )
          },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["excludedEventTypes"]
        },

        includeConnectivityHistory: {
          component: ToggleSelector,
          attributes: {
            label: "include connectivity history",
            param: "includeConnectivityHistory"
          },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["includeConnectivityHistory"]
        },
        includedEventTypes: {
          component: EventTypeSelector,
          attributes: {
            label: "include event types",
            param: "includedEventTypes",
            description: oasReporter.getParamDescription(
              this.parsedSwagger,
              "getNetworkEvents",
              "includedEventTypes"
            )
          },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["includedEventTypes"]
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
        method: {
          component: MethodSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["method"]
        },
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
        productType: {
          component: ProductTypeSelector,
          attributes: {
            productType: this.net
              ? this.net.productTypes
                ? this.net.productTypes[0]
                : undefined
              : undefined
          }, // use first product in list
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["productType"]
        },
        service: {
          component: FirewalledServiceSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["firewalledService"]
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
          attributes: this.timespanSelectorAttributes,
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

        zoneId: {
          component: ZoneSelector,
          attributes: { device: this.formData["device"] },
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
    onSelectedGroup() {
      if (!this.groupReports) {
        return;
      }
      this.selectedReport = this.groupReports[0]; // set default report
    },
    searchFilter(item, queryText, itemText) {
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
        this.swaggerReports = oasReporter.generateReportTemplates(parsed);
      });
    },
    parseMerakiSwagger(orgId) {
      if (!this.$merakiSdk.OpenAPISpecController || !orgId) {
        // Public OAS
        console.log("parseMerakiSwagger - using public openapiSpec");
        return axios
          .get(this.apiUrl + "/openapiSpec")
          .then(res => {
            return res.data;
          })
          .catch(e => console.log("axios openapiSpec get error ", e));
      } else {
        // Org specific OAS
        console.log("parseMerakiSwagger - using org specific openapiSpec");
        return this.$merakiSdk.OpenAPISpecController.getOrganizationOpenapiSpec(
          orgId
        )
          .then(res => {
            // Parsing Swagger Spec
            return oasReporter.swaggerParser
              .parse(res)
              .then(r => {
                return r;
              })
              .catch(e => console.log("oasReporter.swaggerParser error ", e));
          })
          .catch(e => this.handleError(e));
      }
    },

    /**
     * @param pathParams
     * pathParams = ['networkId', 'serial']
     */
    getIterableParam(pathParams) {
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
      if (pathParams.includes("networkId")) {
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
              label: lodash.startCase(p.name).toLowerCase(),
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
    runAction(action, count, extraData, location) {
      console.log("runAction action", action);
      const options = {
        method: "get",
        url: action,
        headers: { "X-Cisco-Meraki-API-Key": this.apiKey },
        contentType: "application/json"
      };
      rh.request(options).then(res => this.handleResponse(res));
      //**
      // Run Report based on environment
      //**
      // Google Apps Script
      // if (process.env.VUE_APP_SERVICE === "gas") {
      //   const url = `${this.apiUrl}/${action}`;
      //   const options = {
      //     method: "get",
      //     headers: { "X-Cisco-Meraki-API-Key": this.apiKey },
      //     contentType: "application/json",
      //     followRedirects: true
      //   };
      //   return google.script.run
      //     .withSuccessHandler(res => {
      //       let data;
      //       console.log("runAction gasRequest .fetch res: ", res);
      //       try {
      //         data = JSON.parse(res.body);
      //       } catch (error) {
      //         console.log("unable to parse body, returning default body");
      //         data = res.body;
      //       }
      //       return this.handleResponse(data, extraData, location);
      //     })
      //     .withFailureHandler(error => {
      //       console.log("GAS via OAS error: ", error);
      //       return this.handleError(error, "onRunReport", action);
      //     })
      //     .fetch(url, options);
      // } else {
      //   // AXIOS
      //   const options = {
      //     method: "get",
      //     baseURL: this.apiUrl,
      //     url: action,
      //     headers: {
      //       "X-Cisco-Meraki-API-Key": this.apiKey
      //     }
      //   };
      //   return axios(options)
      //     .then(res => this.handleResponse(res.data, extraData, location))
      //     .catch(e => {
      //       this.handleError(e, "onRunReport", action);
      //     });
      // }
    },
    // hasNull(target) {
    //   for (var member in target) {
    //     if (target[member] == null) return true;
    //   }
    //   return false;
    // },
    // whichIsNull(target) {
    //   for (var member in target) {
    //     if (target[member] == null) return member;
    //   }
    //   return false;
    // },

    async onRunReport(location) {
      // check if any required path params are missing

      if (this.requiredParams) {
        let missingParams = [];
        this.requiredParams.forEach(p => {
          if (!this.report.paramVals[p.name]) {
            missingParams.push(p.name);
          }
        });

        if (missingParams.length) {
          this.$store.commit("setSnackbar", {
            msg:
              "Missing required parameters: " + JSON.stringify(missingParams),
            color: "danger"
          });
          return;
        }
      }

      this.$store.commit("setLoading", true);
      // auto cancel loader (to avoid hangining)
      setTimeout(() => this.$store.commit("setLoading", false), 10000);

      this.reportData = []; // Clear Current Report

      // Check if looper actions exist

      // Throttle the API calls to avoid rate limit (5 calls/s)
      this.looperProgress = 0;
      var throttledAction = rateLimit(1, 1000, (action, i, extraData) => {
        console.log("running rate limited action: ", i, action);
        this.looperProgress = ((i + 1) / this.report.actions.length) * 100;
        if (this.looperProgress >= 100) {
          this.looperProgress = 0;
        }
        return this.runAction(action, i, extraData, location);
      });

      // Loops through each action in series, and adjusts the headers
      for (let [i, action] of this.report.actions.entries()) {
        let extraData = {};
        if (this.report.looperParamVals) {
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
        }

        extraData["reportAction"] = action; // Create option to toggle this

        console.log("queueing rate limited action: ", action);

        throttledAction(action, i, extraData, location);
      }
    },
    // Custom report handlers (to override default key/value info for report)
    adjustMerakiReport(path, res) {
      if (path.includes("/openapiSpec")) {
        //return this.parseSwaggerPaths(res);
        return reportHelpers.parseSwaggerPaths(res);
      }
      return res;
    },
    isIterable(array) {
      return Array.isArray(array) || array.length;
    },
    handleResponse(res, extraData, location) {
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
          );
        } else {
          adjustedReport = { ...adjustedReport, ...extraData };
        }
      }

      // send to report

      //const totalActions = this.report.actions.length;

      return this.toReport(adjustedReport, this.report.title, {}, location);
    },
    toReport(report, title, options = {}, location) {
      // format all responses into an array
      if (!Array.isArray(report)) {
        report = [report];
      }
      // store report data for this run (cleared on next onRunReport())
      this.reportData = [...this.reportData, ...report] || [];

      // print data to sheet
      this.$utilities.writeData(this.reportData, title, options, location);
      this.$store.commit("setLoading", false);
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
      this.$utilities.saveFile(this.reportData, this.selectedReport.shortTitle);
    }
    // handleError(error, errorTitle, action) {
    //   console.log("handleError error: ", error);
    //   this.$store.commit("setLoading", false);
    //   console.log(errorTitle);
    //   if (error.errorCode === 400) {
    //     console.log("Bad request, often due to missing a required parameter.");
    //     this.$store.commit("setSnackbar", {
    //       msg: "Bad request, often due to missing a required parameter.",
    //       color: "danger"
    //     });
    //   } else if (error.errorCode === 401) {
    //     console.log("No valid API key provided.");
    //     this.$store.commit("setSnackbar", {
    //       msg: "No valid API key provided.",
    //       color: "danger"
    //     });
    //   } else if (error.errorCode >= 500 && error.errorCode < 600) {
    //     console.log("Server error");
    //     this.$store.commit("setSnackbar", {
    //       msg: "Server error or invalid parameters",
    //       color: "danger"
    //     });
    //   } else if (error.errorCode === 404) {
    //     console.log(
    //       "The requested resource doesn't exist or you do not have permission"
    //     );
    //     this.$store.commit("setSnackbar", {
    //       msg:
    //         "The requested resource doesn't exist or you do not have permission",
    //       color: "danger"
    //     });
    //   } else {
    //     console.log("Welp, that's not good: ", action);
    //     this.$store.commit("setSnackbar", {
    //       msg: error.Error ? error.Error : error,
    //       color: "danger"
    //     });
    //   }
    //   return;
    // }
  }
});
</script>
<style >
.v-autocomplete {
  text-size: smaller;
}
.v-text-field .v-label {
  top: 0px !important;
}
.select__selections {
  padding-top: 2px !important;
}
</style>