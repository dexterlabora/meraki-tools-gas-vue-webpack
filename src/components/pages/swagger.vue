<template id="page-swagger">
  <v-container>
    <v-layout column>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title>Meraki API</v-card-title>
          <v-card-text p1>
            <!-- <v-swagger :spec="openapiSpec" /-->
            <!-- <v-swagger :spec="organizations"></v-swagger> -->

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
            <!-- <component :is="swaggerView" v-bind="{spec:filteredGroup}" :key="filteredGroup.request"></component> -->
            <v-swagger :spec="filteredGroup" :key="filteredGroup.key" :baseUrl="apiUrl" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="sm12 md12 lg12">
        <v-footer class="mt-4">
          <v-flex class="sm6 md6" style="border-outline=2px">
            <v-label>Base URL</v-label>
            <v-spacer></v-spacer>
            <strong>{{allPaths.host}}</strong>
          </v-flex>
          <v-flex class="sm6 md6 mt-2">
            <v-label>Version</v-label>
            <v-spacer></v-spacer>
            {{allPaths.version}}
          </v-flex>
        </v-footer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import VSwagger from "../shared/v-swagger/src/v-swagger";
import * as oasReporter from "../../oas-reporter";
import axios from "axios";

Vue.use(VSwagger);
export default Vue.extend({
  template: "#page-swagger",
  components: {
    VSwagger
  },
  computed: {
    apiKey() {
      return this.$store.state.apiKey;
    },
    apiUrl() {
      return this.$store.state.apiUrl;
    }
    // Group Selectors
    // groups() {
    //   if (!this.allPaths) {
    //     return [];
    //   }
    //   let groups = this.allPaths.tags.filter(t => t.name);
    //   return groups.sort(function(a, b) {
    //     if (a.group < b.group) return -1;
    //     if (a.group > b.group) return 1;
    //     return 0;
    //   });
    // }
  },
  mounted() {
    //
  },

  data() {
    return {
      swaggerView: null,
      selectedGroup: null,
      groups: [],
      allPaths: {},
      // openapiSpec: {
      //   host: "http://localhost:8080/api",
      //   title: "Meraki Dashboard API",
      //   description: "Cisco Meraki API",
      //   opened: true,
      //   request: [
      //     {
      //       method: "get", // post, delete or put
      //       description: "Open API Spec",
      //       url: "/openapiSpec"
      //     },
      //     {
      //       method: "get", // post, delete or put
      //       description: "Open API Spec",
      //       url: "/organizations/:organizationId/openapiSpec"
      //     }
      //   ]
      // },
      // organizations: {
      //   host: "http://localhost:8080/api",
      //   title: "Meraki Dashboard API",
      //   description: "Cisco Meraki API",
      //   opened: true,
      //   request: [
      //     {
      //       method: "get",
      //       description: "Organizations",
      //       url: "/organizations",
      //       headers: [
      //         {
      //           key: "X-Cisco-Meraki-API-Key",
      //           description: "{{apiKey}}"
      //         }
      //       ]
      //     }
      //   ]
      // },
      parsedSwagger: {}
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
    filteredGroup() {
      if (!this.allPaths || !this.selectedGroup) {
        return [];
      }
      let filtered = [];
      filtered = { ...filtered, ...this.allPaths };
      filtered.key = this.selectedGroup;
      if (!filtered.request) {
        return;
      }
      filtered.request = filtered.request.filter(
        r => r.tags[0] === this.selectedGroup || this.selectedGroup === "All"
      );
      return filtered;
    }
  },
  mounted() {
    this.initSwagger();
  },
  watch: {
    filteredGroup() {
      this.swaggerView = "v-swagger";
    }
  },
  methods: {
    initSwagger() {
      this.parseMerakiSwagger(this.org.id).then(parsed => {
        this.parsedSwagger = parsed;
        //this.groups.push("All"); // add a catch-all group // this is TOO slow to load.
        this.groups = [...this.groups, ...parsed.tags.map(t => t.name)];

        this.allPaths = oasReporter.generateSwaggerPathsVue(parsed, {
          baseUrl: this.apiUrl
        });
      });
    },
    onSelectedGroup() {
      if (!this.groupReports) {
        return;
      }
      this.selectedGroup = this.groupReports[0]; // set default report
    },
    parseMerakiSwagger(orgId) {
      if (!this.$merakiSdk.OpenAPISpecController || !orgId) {
        // Public OAS
        // console.log("parseMerakiSwagger - using public openapiSpec");
        return axios
          .get(this.apiUrl + "/openapiSpec")
          .then(res => {
            return res.data;
          })
          .catch(e => console.log("axios openapiSpec get error ", e));
      } else {
        // Org specific OAS
        // console.log("parseMerakiSwagger - using org specific openapiSpec");
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
    handleError(error, errorTitle, action) {
      console.log("handleError error: ", error);
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
        console.log("Welp, that's not good: ", action);
        this.$store.commit("setSnackbar", {
          msg: error.Error ? error.Error : error,
          color: "danger"
        });
      }
      return;
    }
  }
});
</script>
