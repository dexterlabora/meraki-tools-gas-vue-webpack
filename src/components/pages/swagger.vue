<template id="page-swagger">
  <v-container>
    <v-layout column>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title>Meraki API</v-card-title>
          <v-card-text p1>
            <v-flex xs12 sm6 d-flex>
              <v-select
                :loading="loading"
                v-model="selectedGroupA"
                :items="selectorA"
                item-text="group"
                label="Domain"
                outline
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-select
                v-model="selectedGroupB"
                :items="selectorB"
                item-text="group"
                label="Use Case"
                outline
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-select
                v-model="selectedGroupC"
                :items="selectorC"
                item-text="group"
                label="Service"
                outline
              >
                <template slot="selection" slot-scope="data">
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item ? data.item : "/" }}
                </template>
                <template slot="item" slot-scope="data">
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ data.item ? data.item : "/" }}
                </template>
              </v-select>
            </v-flex>
            <v-swagger
              v-if="
                selectedGroupC ||
                (selectedGroupB && selectedGroupC == undefined)
              "
              :spec="filteredSpecByGroup"
              :key="[selectedGroupA, selectedGroupB, selectedGroupC].toString()"
              :baseUrl="apiUrl"
              opened="true"
            />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="sm12 md12 lg12">
        <v-footer class="mt-4">
          <v-flex class="sm6 md6" style="border-outline=2px">
            <v-label>Base URL</v-label>
            <v-spacer></v-spacer>
            <strong>{{ spec.host }}</strong>
          </v-flex>
          <v-flex class="sm6 md6 mt-2">
            <v-label>Version</v-label>
            <v-spacer></v-spacer>
            {{ spec.version }}
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
import jsonata from "jsonata";

Vue.use(VSwagger);
export default Vue.extend({
  template: "#page-swagger",
  components: {
    VSwagger,
  },
  computed: {
    apiKey() {
      return this.$store.state.apiKey;
    },
    apiUrl() {
      return this.$store.state.apiUrl;
    },
  },

  data() {
    return {
      loading: false,
      selectedGroup: null,
      selectedGroupA: "",
      selectedGroupB: "",
      selectedGroupC: "",
      spec: {},
    };
  },
  computed: {
    loading: function () {
      return this.$store.state.loading;
    },
    apiKey: function () {
      return this.$store.state.apiKey;
    },
    apiUrl: function () {
      return this.$store.state.apiUrl;
    },
    org: function () {
      return this.$store.state.org;
    },
    net: function () {
      return this.$store.state.net;
    },
    selectorA() {
      let tags = [];
      let requests = this.spec.request;
      let items = new Set(
        this.filterRequestsByTags(tags, requests).map((r) => r.tags[0])
      );
      return [...items];
    },
    selectorB() {
      let tags = [this.selectedGroupA];
      let requests = this.spec.request;
      let items = new Set(
        this.filterRequestsByTags(tags, requests).map((r) => r.tags[1])
      );
      return [...items];
    },
    selectorC() {
      let tags = [this.selectedGroupA, this.selectedGroupB];
      let requests = this.spec.request;
      let items = new Set(
        this.filterRequestsByTags(tags, requests).map((r) => r.tags[2])
      );
      return [...items]; //.map(i => i == undefined ? "/": i)
    },

    filteredSpecByGroup() {
      let tags = [
        this.selectedGroupA,
        this.selectedGroupB,
        this.selectedGroupC,
      ];
      let requests = this.spec.request;
      let items = new Set(this.filterRequestsByTags(tags, requests));
      let filtered = { ...this.spec };
      filtered.request = [...items];

      return filtered;
    },
  },
  mounted() {
    this.initSwagger();
  },
  watch: {
    selectorA() {
      // set default
      this.selectedGroupA = this.selectorA[0];
      this.selectedGroupB = this.selectorB[0];
      this.selectedGroupC = this.selectorC[0];
    },
    selectedGroupA() {
      // set default
      this.selectedGroupB = this.selectorB[0];
      this.selectedGroupC = this.selectorC[0];
    },
    selectedGroupB() {
      // set default
      this.selectedGroupC = this.selectorC[0];
    },
  },
  methods: {
    filterRequestsByTags(tags, requests) {
      if (!requests) {
        return [];
      }
      return requests.filter((r) => {
        for (let [index, val] of tags.entries()) {
          if (r.tags[index] != val) {
            return;
          }
        }
        return r;
      });
    },
    initSwagger() {
      this.parseMerakiSwagger(this.org.id).then(async (parsed) => {
        this.spec = await oasReporter.generateSwaggerPathsVue(parsed, {
          baseUrl: this.apiUrl,
        });
      });
    },

    parseMerakiSwagger(orgId) {
      if (!orgId) {
        return;
      }
      // Public OAS
      // console.log("parseMerakiSwagger - using public openapiSpec");
      const options = {
        method: "get",
        url: `/organizations/${orgId}/openapiSpec`,
      };
      this.loading = true;
      return this.$rh
        .request(options)
        .then((res) => {
          this.loading = false;
          return res;
        })
        .catch((e) => {
          this.loading = false;
          console.log("error fetching openapiSpec", e);
        });

      // return this.$rh
      //   .request(this.apiUrl + "/openapiSpec")
      //   .then(res => {
      //     return res.data;
      //   })
      //   .catch(e => console.log("axios openapiSpec get error ", e));
      // } else {
      //   // Org specific OAS
      //   // console.log("parseMerakiSwagger - using org specific openapiSpec");
      //   return this.$merakiSdk.OpenAPISpecController.getOrganizationOpenapiSpec(
      //     orgId
      //   )
      //     .then(res => {
      //       // Parsing Swagger Spec
      //       return oasReporter.swaggerParser
      //         .parse(res)
      //         .then(r => {
      //           return r;
      //         })
      //         .catch(e => console.log("oasReporter.swaggerParser error ", e));
      //     })
      //     .catch(e => this.handleError(e));
      // }
    },
    handleError(error, errorTitle, action) {
      console.log("handleError error: ", error);
      this.$store.commit("setLoading", false);
      console.log(errorTitle);
      if (error.errorCode === 400) {
        console.log("Bad request, often due to missing a required parameter.");
        this.$store.commit("setSnackbar", {
          msg: "Bad request, often due to missing a required parameter.",
          color: "danger",
        });
      } else if (error.errorCode === 401) {
        console.log("No valid API key provided.");
        this.$store.commit("setSnackbar", {
          msg: "No valid API key provided.",
          color: "danger",
        });
      } else if (error.errorCode >= 500 && error.errorCode < 600) {
        console.log("Server error");
        this.$store.commit("setSnackbar", {
          msg: "Server error or invalid parameters",
          color: "danger",
        });
      } else if (error.errorCode === 404) {
        console.log(
          "The requested resource doesn't exist or you do not have permission"
        );
        this.$store.commit("setSnackbar", {
          msg:
            "The requested resource doesn't exist or you do not have permission",
          color: "danger",
        });
      } else {
        console.log("Welp, that's not good: ", action);
        this.$store.commit("setSnackbar", {
          msg: error.Error ? error.Error : error,
          color: "danger",
        });
      }
      return;
    },
  },
});
</script>
<style >
.small-chips {
  font-size: small;
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
  font-size: small;
}
.v-list-item {
  align-items: center;
  display: flex;
  flex: 1 1 100%;
  letter-spacing: normal;
  min-height: 48px;
  outline: none;
  padding: 0 16px;
  position: relative;
  text-decoration: none;
  font-size: small;
}
.v-autocomplete {
  font-size: small;
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