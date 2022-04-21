<template id="page-reports-auto-oas">
  <v-container>
    <v-layout>
      <v-speed-dial
        v-if="selectedReport.title"
        v-model="speedDial"
        right
        fixed
        bottom
        direction="top"
        open-on-hover
      >
        <template v-slot:activator>
          <v-tooltip left class="pr-10">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="blue darken-2"
                dark
                fab
                v-bind="attrs"
                v-on="on"
                @click="onRunAndPrint()"
              >
                <v-icon>play_arrow</v-icon>
              </v-btn>
            </template>
            <span>Run and print to Sheet</span>
          </v-tooltip>
        </template>
        <v-tooltip left class="pr-10">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              fab
              dark
              small
              color="green"
              @click="onRunOnly()"
            >
              <v-icon>play_arrow</v-icon>
            </v-btn>
          </template>
          <span>Run only</span>
        </v-tooltip>
      </v-speed-dial>

      <v-flex xs12 md12>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Meraki Reports <v-spacer></v-spacer>
              <i v-if="parsedSwagger.info" style="font-weight: 100"
                >API: {{ parsedSwagger.info.version }}</i
              ></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-progress-linear
                v-if="loading"
                indeterminate
              ></v-progress-linear>
              <div v-if="parsedSwagger">
              <v-autocomplete
                class="mt-2 p-2 ml-1 mr-1"
                style="font-size: small"
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
                prepend-icon="mdi-magnify"
              >
                <!-- <template v-slot:label>
                <p>
                  <i>Search reports ...</i>
                </p>
              </template>-->
                <template
                  v-slot:selection="{ item, selected }"
                  class="selected"
                >
                  <label class="caption">{{ item.shortTitle }}</label>
                </template>
                <!-- <template v-slot:item="{ item }">
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.shortTitle"
                      class="caption"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="item.summary"
                      class="body-2"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template> -->
                <template slot="item" slot-scope="data">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon color="grey lighten-1" v-on="on" class="mr-2"
                        >info</v-icon
                      >
                    </template>

                    {{ data.item.description }}
                  </v-tooltip>
                  <div class="caption">
                    {{ data.item.shortTitle }}
                  </div>
                </template>
              </v-autocomplete>

              
                <!-- <v-speed-dial fab fixed bottom center color="primary" :loading="loading">
                <template v-slot:activator>
                  <v-btn color="blue darken-2" dark fab @click="onRunReport('overwrite')">
                    <v-icon>play_arrow</v-icon>
                  </v-btn>
                </template>

                Beta 
                <v-btn round color="gray" @click="onRunReport('newRows')">
                  <b>insert rows</b>
                </v-btn>
                <v-btn round color="gray" @click="onRunReport('overwrite')">
                  <b>overwrite rows</b>
                </v-btn>
              <v-btn round color="gray" @click="onRunReport('newSheet')">new sheet</v-btn>
               
              </v-speed-dial>-->

                <div class="pt-4">
                  <v-flex xs12 sm6 d-flex>
                    <v-select
                      v-model="selectedGroup"
                      :items="groups"
                      item-text="group"
                      label="Group"
                      outline
                      @change="onSelectedGroup"
                      dense
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 sm6 md6 pt-2 d-flex v-if="selectedReport.title">
                    <v-select
                      v-model="selectedReport"
                      :items="groupReports"
                      item-text="shortTitle"
                      return-object
                      label="Reports"
                      outline
                      dense
                    >
                      <template slot="item" slot-scope="data">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-icon
                              color="grey lighten-1"
                              v-on="on"
                              class="mr-2"
                              >info</v-icon
                            >
                          </template>

                          {{ data.item.description }}
                        </v-tooltip>
                        <div class="caption">
                          {{ data.item.shortTitle }}
                        </div>
                      </template>
                      <!-- <template
                      slot="selection"
                      slot-scope="data"
                      class="selected"
                    >{{ data.item.title}}</template> -->
                    </v-select>
                  </v-flex>
                </div>
                <p>{{ selectedReport.description }}</p>
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

                      <div v-if="c.attributes" xs12 sm6 md6 class="pl-2 ml-2">
                        <div v-if="c.attributes.label == `perPage`">
                          <v-text-field
                            label="Pages"
                            placeholder="1"
                            width="50"
                            outlined
                            :enabled="formData.perPage"
                            v-model="formData.pages"
                          >
                            <template v-slot:append>
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <v-icon color="grey lighten-1" v-on="on"
                                    >info</v-icon
                                  >
                                </template>
                                An API call is made for each page. Results may take a moment to display as the data is being aggregated.
                              </v-tooltip>
                            </template>
                          </v-text-field>
                        </div>
                      </div>
                    </v-flex>
                  </div>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel v-if="report.looperParam">
            <v-expansion-panel-header
              >Looper
              <v-spacer></v-spacer>
              <v-progress-linear
                class="pl-5"
                v-show="looperProgress && looperProgressPct < 100"
                v-model="looperProgressPct"
                color="green"
                height="25"
              >
                <template v-slot="{}">
                  <strong
                    >{{ looperProgress }} of {{ report.actions.length }}</strong
                  >
                </template>
              </v-progress-linear>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- <v-flex xs12 sm12 md12 pt-2 >
          <v-card>
            <v-card-title>Looper</v-card-title>

              <v-card-text p1>-->
              <div class="caption">
                Run multiple reports based on the selected items.
                <v-tooltip bottom class="pr-10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="gray" small v-bind="attrs" v-on="on" icon>
                      <v-icon>info</v-icon>
                    </v-btn>
                  </template>
                  <span
                    >This will override the default selector. Some reports may
                    not be appropriate for the selection.</span
                  >
                </v-tooltip>
              </div>

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
                  showMultiOrg
                  :is="c.component"
                  v-bind="c.attributes"
                  v-dynamic-events="c.knownEvents"
                  :key="report.title"
                ></component>
              </v-flex>
              <!-- <div v-if="looperProgress">
                {{looperProgress}} of {{report.actions.length}}
                <br>
              <i>at {{looperRate}} calls p/second</i>
              </div> -->

              <!-- </v-card-text>
            <v-card-actions></v-card-actions>
              </v-card>-->
              <!-- </v-flex> -->
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>JSON Results </v-expansion-panel-header>
            <v-expansion-panel-content id="jsonResultSection">
              <jsonata
                v-if="reportData"
                :key="selectedReport.shortTitle"
                :data="reportData"
                :title="selectedReport.shortTitle"
              ></jsonata>
              <pre v-else><code>no data</code></pre>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import Vue from "vue";
import axios from "axios";
import * as rh from "../../request-handler";
import gasRequest from "../../gas-request";
import getFunctionArguments from "get-function-arguments";
import lodash from "lodash";
import VueJsonPretty from "vue-json-pretty";

// Dynamic Components
import ActionBatchSelector from "../shared/meraki-selectors/ActionBatchSelector";
import ClientSelector from "../shared/meraki-selectors/ClientSelector";
import DeviceSelector from "../shared/meraki-selectors/DeviceSelector";
import DevicesSelector from "../shared/meraki-selectors/DevicesSelector";
import EventTypeSelector from "../shared/meraki-selectors/EventTypeSelector";
import OrgSelector from "../shared/meraki-state-selectors/OrgSelector";
import OrganizationsSelector from "../shared/meraki-selectors/OrganizationsSelector";
import NetSelector from "../shared/meraki-state-selectors/NetSelector";
import NetworksSelector from "../shared/meraki-selectors/NetworksSelector";
import MethodSelector from "../shared/meraki-selectors/MethodSelector";
import SensorMetricsSelector from "../shared/meraki-selectors/SensorMetricsSelector";
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
import Jsonata from "../shared/Jsonata.vue";

import * as reportHelpers from "../../report-helpers";
import * as oasReporter from "../../oas-reporter";

var rateLimit = require("function-rate-limit");
const jsonata = require("jsonata");

// disable // console.log for production
//// console.log = function() {};

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
    VueJsonPretty,
    Jsonata,
    SensorMetricsSelector
  },
  created() {
    this.initReports();
  },
  watch: {
    org() {
      this.initReports();
    },
    reports() {
      if (!this.selectedReport.title) return;
      this.selectedReport = this.reports.find(
        (r) => r.title == this.selectedReport.title
      );
    },
    selectedReport() {
      //this.formData = {}; // reset form data
      this.formData.org = this.org;
      this.formData.net = this.net;
    },
  },
  directives: {
    DynamicEvents: {
      bind: (el, binding, vnode) => {
        const allEvents = binding.value;
        if (!allEvents) {
          return;
        }
        Object.keys(allEvents).forEach((event) => {
          // register handler in the dynamic component
          vnode.componentInstance.$on(event, (eventData) => {
            const targetEvent = allEvents[event];
            vnode.context[targetEvent]({
              event: event,
              eventData,
              eventData,
            });
          });
        });
      },
      unbind: function (el, binding, vnode) {
        vnode.componentInstance.$off();
      },
    },
  },
  data() {
    return {
      panel: [0, 0, 0],
      speedDial: false,
      loading: false,
      showSearchDialog: false,
      looperProgress: 0,
      looperProgressPct: 0,
      looperRate: 1,
      browseByGroup: false,
      selectedGroup: "",
      selectedReport: {
        title: "",
        path: "",
        pathParams: [],
        requiredSelectors: [],
        optionalSelectors: [],
        paramVals: {},
        group: "All",
      },
      parsedSwagger: {},
      swaggerReports: [],
      filteredPaths: [],
      reportData: [],
      reportDataFiltered: [],
      formData: {
        pages: 1,
      },
      form: {
        includeIndex: false,
        query: "$",
      },
      //jsonResultSelection: [],
    };
  },

  computed: {
    // loading: function () {
    //   return this.$store.state.loading;
    // },
    apiKey: function () {
      return this.$store.state.apiKey;
    },
    apiUrl: function () {
      return this.$store.state.apiUrl;
    },
    apiSpecUrl: function () {
      return this.$store.state.apiSpecUrl;
    },
    org: function () {
      return this.$store.state.org;
    },
    net: function () {
      return this.$store.state.net;
    },
    reportItems: function () {
      return this.reports.filter((r) => r.group === this.selectedGroup.group);
    },

    report: function () {
      // Copy selected report template
      let report = this.selectedReport;

      // **********
      // SET Parameters
      // **********

      if (report.parameters) {
        // Filter unneeded parameters
        report.adjustedParams = report.parameters.filter(
          (p) =>
            !p.name.includes("startingAfter") &&
            !p.name.includes("endingBefore") &&
            !p.name.includes("t0") &&
            !p.name.includes("t1")
        );
        // Normalize the parameter names for global variables, store a single object
        report.adjustedParams = report.adjustedParams.map((p) => {
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
          report.adjustedParams.filter((p) => p.required)
        );

        // Optional / Query Selectors
        report.optionalSelectors = this.getSelectors(
          report.adjustedParams.filter((p) => !p.required)
        );

        // Looper Parameters
        let pathParamNames = [];
        report.pathParams.forEach((p) => pathParamNames.push(p.name));

        report.looperParam = this.getIterableParam(pathParamNames);
        // Looper Selectors
        if (report.looperParam) {
          report.looperSelectors = this.getSelectors([report.looperParam]);
          report.looperParamVals = this.getComponentParamVals([
            report.looperParam,
          ]);
        }

        // **********
        // SET Selectors
        // **********

        // Required Selectors
        report.requiredSelectors = this.getSelectors(
          report.adjustedParams.filter((p) => p.required)
        );

        // Optional / Query Selectors
        report.optionalSelectors = this.getSelectors(
          report.adjustedParams.filter((p) => !p.required)
        );
      }

      // **********
      // SET Actions
      // **********

      report.actions = [];
      if (!report.adjustedParams) {
        // console.log("no params for report.path", report.path);
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
        // console.log("no looperParmVals found");
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
    reports: function () {
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
      return this.report.parameters.filter((p) => p.required);
    },
    // Group Selectors
    groups: function () {
      let groups = this.reports.filter((r) => r.group);
      return groups.sort(function (a, b) {
        if (a.group < b.group) return -1;
        if (a.group > b.group) return 1;
        return 0;
      });
    },
    groupReports() {
      this.reports.sort(function (a, b) {
        if (a.group < b.group) return -1;
        if (a.group > b.group) return 1;
        return 0;
      });
      return this.reports.filter((r) => {
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
      if (this.selectedReport["path"].includes("cellularGateway")) {
        return { model: "MG" };
      }
      if (this.selectedReport["path"].includes("radio")) {
        return { model: "MR" };
      }
      if (this.selectedReport["path"].includes("connectionStats")) {
        return { model: "MR" };
      }
      if (this.selectedReport["path"].includes("sensor")) {
        return { model: "MT" };
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
            : undefined,
        },
        bluetoothClientId: {
          component: BleClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["bluetoothClient"]
            ? this.formData["bluetoothClient"]["id"]
            : undefined,
        },
        clientId: {
          component: ClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["client"]
            ? this.formData["client"]["id"]
            : undefined,
        },
        clientMac: {
          component: ClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["client"]
            ? this.formData["client"]["mac"]
            : undefined,
        },
        connectivityHistoryTimespan: {
          component: TimespanSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["timespan"],
        },
        excludedEventTypes: {
          component: EventTypeSelector,
          attributes: {
            networkId: this.net.id,
            label: "excludedEventTypes",
            param: "excludedEventTypes",
            description: oasReporter.getParamDescription(
              this.parsedSwagger,
              "getNetworkEvents",
              "excludedEventTypes"
            ),
          },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["excludedEventTypes"],
        },

        includeConnectivityHistory: {
          component: ToggleSelector,
          attributes: {
            label: "includeConnectivityHistory",
            param: "includeConnectivityHistory",
          },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["includeConnectivityHistory"],
        },
        includedEventTypes: {
          component: EventTypeSelector,
          attributes: {
            networkId: this.net.id,
            label: "includedEventTypes",
            param: "includedEventTypes",
            description: oasReporter.getParamDescription(
              this.parsedSwagger,
              "getNetworkEvents",
              "includedEventTypes"
            ),
          },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["includedEventTypes"],
        },
        idOrMacOrIp: {
          component: ClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["client"]
            ? this.formData["client"]["id"]
            : undefined,
        },
        // TODO: use adjusted param
        mac: {
          component: ClientSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["client"]
            ? this.formData["client"]["mac"]
            : undefined,
        },
        method: {
          component: MethodSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["method"],
        },
        metrics: {
          component: SensorMetricsSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          attributes: {
            label: "metrics",
            param: "metrics",
            description: oasReporter.getParamDescription(
              this.parsedSwagger,
              "getOrganizationSensorReadingsHistory",
              "metrics"
            )
          },
          paramVal: this.formData["metrics"],
        },
        networkId: {
          //component: // Using global state
          paramVal: this.net ? this.net.id : undefined,
        },
        networkIds: {
          component: NetworksSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          attributes: {
            label: "networkIds",
            param: "networkIds",
            // description: oasReporter.getParamDescription(
            //   this.parsedSwagger,
            //   "getOrganizationNetworks",
            //   "networkIds"
            // )
          },
          paramVal: this.formData["networks"]
            ? this.formData["networks"].map((n) => n.id)
            : undefined,
          // paramVal: this.formData["networkIds"],
        },
        organizationId: {
          //component: // using global state
          paramVal: this.org ? this.org.id : undefined,
        },
        organizationIds: {
          component: OrganizationsSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["organizations"]
            ? this.formData["organizations"].map((o) => o.id)
            : undefined,
        },
        productType: {
          component: ProductTypeSelector,
          attributes: {
            productType: this.net
              ? this.net.productTypes
                ? this.net.productTypes[0]
                : undefined
              : undefined,
          }, // use first product in list
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["productType"],
        },
        service: {
          component: FirewalledServiceSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["firewalledService"],
        },

        serial: {
          component: DeviceSelector,
          attributes: this.deviceSelectorAttributes, //{ model: "MV" } WORKS,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["device"]
            ? this.formData["device"]["serial"]
            : undefined,
        },
        serials: {
          component: DevicesSelector,
          attributes: this.deviceSelectorAttributes,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["devices"]
            ? this.formData["devices"].map((d) => d.serial)
            : undefined,
        },
        gatewaySerials: {
          component: DevicesSelector,
          attributes: { model: "MT" },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["devices"]
            ? this.formData["devices"].map((d) => d.serial)
            : undefined,
        },
        ssidNumber: {
          component: SsidSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["ssid"]
            ? this.formData["ssid"]["number"]
            : undefined,
        },
        switchPortNumber: {
          component: SwitchPortSelector,
          attributes: { device: this.formData["device"] },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["switchPort"]
            ? this.formData["switchPort"]["number"]
            : undefined,
        },
        timespan: {
          attributes: this.timespanSelectorAttributes,
          component: TimespanSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["timespan"],
        },

        vlanId: {
          component: VlanSelector,
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["vlan"]
            ? this.formData["vlan"]["id"]
            : undefined,
        },

        zoneId: {
          component: ZoneSelector,
          attributes: { device: this.formData["device"] },
          knownEvents: { onChange: "handleSelectorEvent" },
          paramVal: this.formData["zone"]
            ? this.formData["zone"]["zoneId"]
            : undefined,
        },
      };
    },
  },
  methods: {
    // *****
    // UI
    // *****
    onSearch(report) {
      if (!report) {
        return;
      }
      // console.log("onSearch event", report.group);
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
      // using gitub source because its faster and doesn't impact API
      //this.$store.commit("setLoading",true)
      this.loading = true;
      this.fetchMerakiSwagger()
        .then((parsed) => {
          this.parsedSwagger = parsed;
          this.swaggerReports = oasReporter.generateReportTemplates(parsed);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // fetchMerakiSwagger() {
    //   // Use official API releases when in production
    //   if (process.env.VUE_APP_SERVICE === "gas") {
    //     const options = {
    //       method: "get",
    //       url:
    //         "https://raw.githubusercontent.com/meraki/openapi/master/openapi/spec2.json",
    //     };
    //     return gasRequest(options)
    //       .then((res) => {
    //         return res.data;
    //       })
    //       .catch((e) => console.log("gas openapiSpec get error ", e));
    //   } else {
    //     // Use latest ORG streaming when in development
    //     const options = {
    //       method: "get",
    //       url: `/organizations/${this.org.id}/openapiSpec`,
    //     };
    //     return this.$rh
    //       .request(options)
    //       .then((res) => {
    //         return res;
    //       })
    //       .catch((e) => console.log("axios openapiSpec get error ", e));
    //   }
    // },
    fetchMerakiSwagger() {
      console.log("retrieving spec url: ",this.apiSpecUrl)
      // Use official API releases when in production
      if (process.env.VUE_APP_SERVICE === "gas") {
        // private specs
        if(this.apiSpecUrl.url.includes("https://api.meraki.com/api/v1/")){
          let url = this.apiSpecUrl.url.replace("https://api.meraki.com/api/v1/","")

          return this.$rh
          .request({url})
          .then(res => {
          
            return res;
          })
          .catch((e) => console.log("$rh openapiSpec get error ", e));
        }else{
        // public specs
        const options = {
          method: "get",
          url:
            this.apiSpecUrl.url,
        };
        return gasRequest(options)
          .then((res) => {
            return res.data;
          })
          .catch((e) => console.log("gas openapiSpec get error ", e));
        }
      } else {
        // private specs
        if(this.apiSpecUrl.url.includes("https://api.meraki.com/api/v1/")){
          let url = this.apiSpecUrl.url.replace("https://api.meraki.com/api/v1/","")

          return this.$rh
          .request({url})
          .then(res => {
          
            return res;
          })
          .catch((e) => console.log("$rh openapiSpec get error ", e));
        }else{
          // public specs
          console.log('using axios for public spec')
          return axios.get(this.apiSpecUrl.url).then(res => {
            return res.data;
          })
          .catch((e) => console.log("axios openapiSpec get error ", e));
        }
        
      }
    
    // fetchMerakiSwagger() {
    //   // Use official API releases when in production
    //   if (this.$store.state.beta === true) {
    //     const options = {
    //       method: "get",
    //       url:
    //         "https://raw.githubusercontent.com/meraki/openapi/v1-beta/openapi/spec2.json",
    //     };
    //     return gasRequest(options)
    //       .then((res) => {
    //         return res.data;
    //       })
    //       .catch((e) => console.log("gas openapiSpec get error ", e));
    //   } else if (this.$store.state.beta){
    //     // Use latest ORG streaming when in development
    //     const options = {
    //       method: "get",
    //       url: `https://raw.githubusercontent.com/meraki/openapi/v1-beta/openapi/spec2.json`,
    //     };
    //     return this.$rh
    //       .request(options)
    //       .then((res) => {
    //         return res;
    //       })
    //       .catch((e) => console.log("axios openapiSpec get error ", e));
    //   }
    //   //  else {
    //   //   // Use latest ORG streaming when in development
    //   //   const options = {
    //   //     method: "get",
    //   //     url: `/organizations/${this.org.id}/openapiSpec`,
    //   //   };
    //   //   return this.$rh
    //   //     .request(options)
    //   //     .then((res) => {
    //   //       return res;
    //   //     })
    //   //     .catch((e) => console.log("axios openapiSpec get error ", e));
    //   // }
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
          iterate: "serial",
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
          iterate: "organizationId",
        };
      }
      if (pathParams.includes("networkId")) {
        return {
          name: "networkIds",
          description: "list of network IDs",
          type: "array",
          in: "path",
          iterate: "networkId",
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
      paramObjects.forEach((p) => {
        if (this.paramComponentMap[p.name] !== undefined) {
          if (!this.paramComponentMap[p.name].component) {
            return;
          }
          selectors.push(this.paramComponentMap[p.name]);
        } else {
          // Assign a dynamic Input Selector for unkown parameters
          // console.log("getSelectors no component found for param p", p);
          selectors.push({
            component: InputSelector,
            attributes: {
              //label: lodash.startCase(p.name).toLowerCase(),
              label: p.name,
              description: p.description,
            },
            knownEvents: { onChange: "handleSelectorEvent" },
          });
        }
      });
      return selectors;
    },
    // Store selector data in formData
    handleSelectorEvent(event) {
      this.formData = {
        ...this.formData,
        ...event.eventData,
      };
    },
    getComponentParamVals(params) {
      if (!params) {
        return;
      }
      let paramVals = {};
      params.forEach((p) => {
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
        let newPath = path.replace(/\{\w+\}/gi, (n) => mapping[n]);
        return newPath;
      } else {
        return path;
      }
    },
    runAction(action, count, extraData, location) {
      // console.log("runAction action", action);
      const options = {
        method: "get",
        baseUrl: this.apiUrl,
        url: action,
        apiKey: this.apiKey,
        contentType: "application/json",
      };
      return this.$rh
        .request(options, this.formData.pages) // run request with pagination support
        .then((res) => {
          // res['meta'] = extraData
          console.log("runAction res", res);
          this.handleResponse(res, extraData, location);
          return res;
        })
        .catch((e) => {
          this.handleResponse(e.errors ? e.errors[0] : e, extraData, location);
          return e;
        });
    },

    async onRunReport(location) {
      // check if any required path params are missing

      if (this.requiredParams) {
        let missingParams = [];
        this.requiredParams.forEach((p) => {
          if (!this.report.paramVals[p.name]) {
            missingParams.push(p.name);
          }
        });

        if (missingParams.length) {
          this.$store.commit("setSnackbar", {
            msg:
              "Missing required parameters: " + JSON.stringify(missingParams),
            color: "danger",
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
      this.looperProgressPct = 0;
      var throttledAction = rateLimit(
        this.looperRate,
        1000,
        (action, i, extraData) => {
          // console.log("running rate limited action: ", i, action);

          this.looperProgress++;
          this.looperProgressPct =
            (this.looperProgress / this.report.actions.length) * 100;
          return this.runAction(action, i, extraData, location).then(
            (actionResponse) => {
              console.log("actionResponse", actionResponse);
              return actionResponse;
            }
          );
        }
      );

      // Loops through each action in series
      for (let [i, action] of this.report.actions.entries()) {
        // console.log("Looper i action", i, action);
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

        extraData["_report"] = action; // Create option to toggle this

        // console.log("queueing rate limited action: ", action);

        throttledAction(action, i, extraData, location);
      }
      this.scrollToEnd();
    },
    // Custom report handlers (to override default key/value info for report)
    adjustMerakiReport(path, res) {
      if (path.includes("/openapiSpec")) {
        return reportHelpers.parseSwaggerPaths(res);
      }
      if (path.includes("/events") && !path.includes("/events/")) {
        return reportHelpers.parseNetworkEvents(res);
      }
      return res;
    },
    isIterable(array) {
      return Array.isArray(array) || array.length;
    },

    // Results
    handleResponse(res, extraData, location) {
      this.$store.commit("setLoading", false);
      if (!res) {
        console.log("handleResponse No Response");
        this.$store.commit("setSnackbar", {
          msg: "No results or invalid options",
          color: "warning",
        });
        return;
      }

      // modify report to adjust for Meraki parameters
      let adjustedReport = this.adjustMerakiReport(this.report.path, res);

      // attach extra data to report
      if (extraData) {
        if (Array.isArray(adjustedReport)) {
          adjustedReport = adjustedReport.map(
            (i) => (i = { ...i, ...extraData })
          );
        } else {
          adjustedReport = { ...adjustedReport, ...extraData };
        }
      }
      //console.log("adjustedReport", JSON.stringify(adjustedReport, "null", 4));

      // send to report

      this.toReport(adjustedReport, this.report.title, {}, location);
    },
    toReport(report, title, options = {}, location) {
      // format all responses into an array
      if (!Array.isArray(report)) {
        report = [report];
      }
      // store report data for this run (cleared on next onRunReport())
      this.reportData = [...this.reportData, ...report] || [];
      //this.onQuery(); // Run initial JSONata query
      this.panel = [0, 1, 2];
      // print data to sheet
      if (location) {
        this.$utilities.writeData(this.reportData, title, options, location);
      }

      this.$store.commit("setLoading", false);
    },
    scrollToEnd() {
      this.$nextTick(() => {
        this.$vuetify.goTo("#jsonResultSection");
      });
    },
    onRunAndPrint() {
      this.onRunReport("overwrite");
    },
    onRunOnly() {
      this.onRunReport();
    },
    onResultsToSheet() {
      this.$utilities.writeData(
        this.reportData,
        this.report.title,
        {},
        "overwrite"
      );
    },
    onFilteredResultsToSheet() {
      this.$utilities.writeData(
        this.reportDataFiltered,
        this.report.title,
        {},
        "overwrite"
      );
    },

    onClearReport() {
      this.selectedReport = {
        title: "",
        path: "",
        pathParams: [],
        requiredSelectors: [],
        optionalSelectors: [],
        paramVals: {},
        group: "All",
      };
    },
    onSaveFile(file) {
      this.$utilities.saveFile(file, this.selectedReport.shortTitle);
    },
    onWriteSheet(data, title) {
      this.$utilities.writeData(data, title);
    },

    // handleError(error, errorTitle, action) {
    //   // console.log("handleError error: ", error);
    //   this.$store.commit("setLoading", false);
    //   // console.log(errorTitle);
    //   if (error.errorCode === 400) {
    //     // console.log("Bad request, often due to missing a required parameter.");
    //     this.$store.commit("setSnackbar", {
    //       msg: "Bad request, often due to missing a required parameter.",
    //       color: "danger"
    //     });
    //   } else if (error.errorCode === 401) {
    //     // console.log("No valid API key provided.");
    //     this.$store.commit("setSnackbar", {
    //       msg: "No valid API key provided.",
    //       color: "danger"
    //     });
    //   } else if (error.errorCode >= 500 && error.errorCode < 600) {
    //     // console.log("Server error");
    //     this.$store.commit("setSnackbar", {
    //       msg: "Server error or invalid parameters",
    //       color: "danger"
    //     });
    //   } else if (error.errorCode === 404) {
    //     // console.log(
    //       "The requested resource doesn't exist or you do not have permission"
    //     );
    //     this.$store.commit("setSnackbar", {
    //       msg:
    //         "The requested resource doesn't exist or you do not have permission",
    //       color: "danger"
    //     });
    //   } else {
    //     // console.log("Welp, that's not good: ", action);
    //     this.$store.commit("setSnackbar", {
    //       msg: error.Error ? error.Error : error,
    //       color: "danger"
    //     });
    //   }
    //   return;
    // }
  },
});
</script>
<style >
.small-chips {
  font-size: xx-small;
}

.v-list__item__action,
.v-list__item__avatar {
  display: flex;
  justify-content: flex-start;
  min-width: 32px !important;
}
.v-list-item .v-list-item__subtitle,
.v-list-item .v-list-item__title {
  line-height: 1.2;
  font-size: smaller;
}
.v-autocomplete {
  font-size: smaller;
}
.v-text-field .v-label {
  top: 0px !important;
}
.select__selections {
  padding-top: 2px !important;
}

.v-select__selection--comma {
  margin: 7px 4px 7px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: small;
}
</style>