<template>
  <div class="parameters">
    <div class="section-header">
      <div class="tab-header">
        <h1>Parameters</h1>
      </div>
    </div>
    <div class="table-container">
      <table>
        <tr v-for="(item, index) in dataParameters" :key="index">
          <v-layout column>
            <v-flex class="sm6 md6">
              <div class="parameter-name">
                <span>
                  <div v-if="item.description">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon color="grey lighten-1" v-on="on">info</v-icon>
                        {{item.key}}
                        <span class="required" v-if="item.required">* required</span>
                      </template>
                      {{item.description}}
                    </v-tooltip>
                  </div>
                  <div v-else>
                    {{item.key}}
                    <span class="required" v-if="item.required">* required</span>
                  </div>
                </span>
              </div>
              <div class="parameter-type" v-if="item.type">{{item.type}}</div>

              <div class="source">({{item.source}})</div>
              <!-- </td> -->
            </v-flex>
            <!-- <td class="vtop"> -->

            <!-- INPUT AREA -->

            <v-flex class="sm8 md8">
              <div class="data" v-if="item.dataValue && !isExecute">
                <pre>{{item.dataValue}}</pre>
              </div>

              <div class="value-input" v-if="isExecute && item.source !== 'body'">
                <select v-if="item.items" v-model="item.inputValue">
                  <option
                    v-for="(enumData, selectedItemIndex) in item.items"
                    :key="selectedItemIndex"
                    :value="enumData.value"
                    selected="enumData.selected"
                  >{{enumData.text}}</option>
                </select>
                <div class="params" v-else-if="item.source === 'header' && item.params.length">
                  <div
                    class="param-item"
                    v-for="(param, paramIndex) in item.params"
                    :key="paramIndex"
                  >
                    <span>{{param.key}}</span>
                    <v-input :placeholder="getPlaceholder(param)" v-model="param.value"></v-input>
                  </div>
                </div>

                <v-text-field
                  v-else
                  outlined
                  type="text"
                  :placeholder="getPlaceholder(item)"
                  @change="item.inputValue = $event"
                  :value="getValue(item) "
                ></v-text-field>
              </div>
              <div class="value-input" v-if="isExecute && item.source === 'body'">
                <v-textarea outlined :placeholder="getPlaceholder(item)" v-model="item.dataValue"></v-textarea>
              </div>
              <div class="value-input" v-if="item.contentType">
                <div class="title">Parameter content type</div>
                <select v-model="item.contentType">
                  <option :value="item.contentType">{{item.contentType}}</option>
                </select>
              </div>
              <!-- </td> -->
            </v-flex>
          </v-layout>
        </tr>

        <tr v-if="params.length === 0">
          <td colspan="2" class="no-items">No Parameters.</td>
        </tr>
      </table>
      <div class="execute-wrapper mt-4" v-show="isExecute">
        <v-btn :loading="isLoading" :color="methodColors[method]" @click="runApi">Run API Call</v-btn>
      </div>
    </div>
    <div class="section-header" v-if="lastResponseData">
      <v-layout column>
        <v-flex class="sm 12md12">
          <v-label>Response</v-label>
        </v-flex>
        <v-flex class="sm 12md12">
          <v-chip
            pill
            v-show="showCopyResult"
            :class="{'copy-result': true, success: isCopySuccess}"
          >Successfully copied</v-chip>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" small rounded color="primary" @click="onWriteSheet">To Sheet</v-btn>
          <v-btn class small @click="copyToClipboard">Copy</v-btn>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="lastResponseData">
      <div class="response">
        <!-- <pre id="responseData">{{JSON.stringify(lastResponseData, null, 4)}}</pre> -->
        <vue-json-pretty showLength :data="lastResponseData"></vue-json-pretty>
      </div>
    </div>
    <div v-if="lastErrorMessage">
      <div class="response error">
        <pre>{{JSON.stringify(lastErrorMessage, null, 4)}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import VueJsonPretty from "vue-json-pretty";
import * as rh from "../../../../request-handler";

export default {
  props: ["params", "method", "description"],
  data() {
    return {
      isLoading: false,
      methodColors: {
        put: "orange",
        get: "green",
        delete: "red",
        post: "blue"
      },
      execute: true,
      lastResponseData: null,
      lastErrorMessage: null,
      dataParameters: this.params || [],
      isCopySuccess: false,
      showCopyResult: false
    };
  },
  components: {
    VueJsonPretty
  },
  computed: {
    isExecute() {
      return this.execute;
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
    paramVals: function() {
      return {
        organizationId: this.org ? this.org.id : null,
        networkId: this.net ? this.net.id : null
      };
    }
  },
  watch: {
    org() {
      this.initEnvParams();
    },
    net() {
      this.initEnvParams();
    },
    params() {
      this.initEnvParams();
    }
  },
  mounted() {
    this.initEnvParams();
  },
  methods: {
    onWriteSheet: function() {
      if (!Array.isArray(this.lastResponseData)) {
        let arrayData = [];
        arrayData.push(this.lastResponseData);
        this.$utilities.writeData(arrayData, this.description);
      } else {
        this.$utilities.writeData(this.lastResponseData, this.description);
      }
    },
    initEnvParams() {
      //console.log("updating dataParameters");
      this.dataParameters = this.dataParameters.map(dp => {
        dp.inputValue = this.getValue(dp);
        return dp;
      });
    },
    async runApi() {
      const url = this.getUrl();

      let config = {
        baseUrl: this.apiUrl,
        apiKey: this.apiKey,
        url,
        method: this.$parent.method,
        headers: this.getHeaders(),
        params: this.getParams(),
        data: this.getData()
      };

      // Append query params
      let paramNames = Object.keys(config.params);
      let count = 0;
      paramNames.forEach((pn, i) => {
        if (config.params[pn]) {
          if (count > 0) {
            config.url += `&`;
          } else {
            config.url += "?";
          }
          config.url += `${pn}=${config.params[pn]}`;
          count++;
        }
      });

      //console.log("config.url", config.url);

      try {
        this.isLoading = true;
        //console.log("params-table rh config ", config);
        rh.request(config)
          .then(res => this.success(res))
          .catch(e => this.error(e))
          .finally(() => (this.isLoading = false));
      } catch (e) {
        this.isLoading = false;
        this.error(e.message);
        //console.log("error: ", e);
      }
    },
    success(data) {
      this.lastResponseData = data;
      this.lastErrorMessage = null;
    },
    error(data) {
      this.lastResponseData = null;
      this.lastErrorMessage = data;
    },
    getData() {
      let body = {};

      body = this.dataParameters.filter(it => {
        return it.source.includes("body");
      })[0];

      if (!body) return undefined;
      try {
        return JSON.parse(body.dataValue) || undefined;
      } catch (e) {
        return e;
      }
    },
    getParams() {
      let params = {};

      this.dataParameters
        .filter(it => {
          return it.source.includes("query");
        })
        .forEach(it => {
          params[it.key] = it.inputValue;
        });

      return params;
    },
    getUrl() {
      let url = this.$parent.url.replace(/^\/+/, "");
      //console.log("getUrl url", url);
      this.dataParameters
        .filter(it => {
          return it.source.includes("path");
        })
        .forEach(it => {
          url = url.replace(
            new RegExp(`{${it.key}}`, "g"),
            it.inputValue || ""
          );
        });
      //console.log("getUrl url after", url);
      return url;
    },
    getHeaders() {
      let headers = {};

      this.dataParameters
        .filter(it => {
          return it.source.includes("header");
        })
        .forEach(it => {
          headers[it.key] = this.getHeadersByVariable(it);
        });

      return headers;
    },
    getHeadersByVariable(it) {
      if (it.params.length) {
        let description = it.description;
        it.params.forEach(p => {
          description = description.replace(
            new RegExp(`{{${p.key}}}`, "g"),
            p.value || ""
          );
        });

        return description;
      }

      return it.inputValue;
    },
    getValue(item) {
      //console.log("getValue key", item);
      try {
        const value = this.paramVals[item.key];
        return value;
      } catch (e) {}
    },
    getPlaceholder(item) {
      let example = "";
      if (!item.schema) {
        return;
      }
      try {
        example = JSON.stringify(item.schema.example, null, 2);
      } catch (e) {
        console.log("getPlaceholder parse error", e);
      }
      return example;
    },
    async copyToClipboard(event) {
      try {
        let textData = JSON.stringify(this.lastResponseData, null, 4);

        if (!navigator.clipboard) {
          let el = document.getElementById("clipboard-area");
          if (!el) {
            el = document.createElement("textarea");
            el.id = "clipboard-area";
            el.style.position = "absolute";
            el.style.left = "-10000px";
            event.target.parentElement.appendChild(el);
          }
          el.value = textData;
          el.select();
          document.execCommand("copy");
        } else {
          await navigator.clipboard.writeText(textData);
        }

        this.isCopySuccess = true;
        this.showCopyResult = true;
        setTimeout(() => (this.showCopyResult = false), 1000);
      } catch (e) {
        this.isCopySuccess = false;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
table {
  display: table;
  border: 0px;
  margin: 0px;
  border-collapse: collapse;
  width: 100%;
  padding: 0 10px;

  tr,
  td,
  th {
    border: 0px;
    background-color: transparent;
    padding: 0.6em 0em;
  }

  th {
    font-size: 12px;
    font-weight: 700;
    padding: 12px 0;
    text-align: left;
    border-bottom: 1px solid rgba(59, 65, 81, 0.2);
    font-family: sans-serif;
    color: #3b4151;
  }

  .no-items {
    font-size: 12px;
  }
}

.source {
  color: gray;
  font-size: 11px;
}

.section-header {
  padding: 8px 20px;
  min-height: 50px;
  background: hsla(0, 0%, 100%, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .tab-header {
    display: flex;
    flex: 1;

    h1 {
      font-size: 14px;
      flex: 1;
      margin: 0;
      font-family: sans-serif;
      color: #3b4151;
    }
  }
}

.table-container {
  padding: 20px;
}

.btn {
  font-size: 14px;
  font-weight: 700;
  padding: 5px 23px;
  transition: all 0.3s;
  border: 2px solid gray;
  border-radius: 4px;
  background: transparent;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  color: #3b4151;
  cursor: pointer;

  &.cancel {
    border-color: #ff6060;
    background-color: transparent;
    font-family: sans-serif;
    color: #ff6060;
  }

  &.execute {
    background-color: #4990e2;
    color: #fff;
    border-color: #4990e2;
  }
}
.execute-wrapper .btn {
  width: 100%;
  padding: 8px 40px;
}

.parameter-name {
  font-size: 16px;
  font-weight: 700;
  font-family: sans-serif;
  color: #3b4151;
  vertical-align: middle;

  .required {
    font-size: 10px;
    padding: 5px;
    vertical-align: middle;
    color: rgba(255, 0, 0, 0.6);
  }
}

.parameter-type {
  font-size: 12px;
  padding: 5px 0;
  font-family: monospace;
  font-weight: 600;
  color: #3b4151;
}

.data {
  font-size: 12px;
}

.vtop {
  vertical-align: top;
  min-width: 120px;
}

.value-input {
  margin-top: 2px;
  input[type="text"] {
    padding: 8px 10px;
    border-radius: 4px;
    border: 1px solid #ececec;
    min-width: 100px;
    max-width: 100%;
  }

  textarea {
    padding: 8px 10px;
    border-radius: 4px;
    border: 1px solid #ececec;
    width: 90%;
    height: 110px;
    max-width: 100%;
  }

  .title {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  select {
    font-size: 14px;
    font-weight: 700;
    padding: 5px 40px 5px 10px;
    height: 34px;
    width: 180px;
    box-sizing: border-box;
    border: 2px solid #41444e;
    border-radius: 4px;
    background: #f7f7f7
      url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICAgIDxwYXRoIGQ9Ik0xMy40MTggNy44NTljLjI3MS0uMjY4LjcwOS0uMjY4Ljk3OCAwIC4yNy4yNjguMjcyLjcwMSAwIC45NjlsLTMuOTA4IDMuODNjLS4yNy4yNjgtLjcwNy4yNjgtLjk3OSAwbC0zLjkwOC0zLjgzYy0uMjctLjI2Ny0uMjctLjcwMSAwLS45NjkuMjcxLS4yNjguNzA5LS4yNjguOTc4IDBMMTAgMTFsMy40MTgtMy4xNDF6Ii8+PC9zdmc+")
      right 10px center no-repeat;
    background-size: 20px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
    font-family: Titillium Web, sans-serif;
    color: #3b4151;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
}

.params {
  margin-top: 5px;

  .param-item {
    span {
      font-size: 12px;
      margin-right: 10px;
      font-weight: 700;
    }
  }
}

.copy-result {
  display: inline-block;
  margin-right: 15px;

  &.success {
    color: #4990e2;
  }
}
.response {
  font-size: 12px;
  height: 200px;
  overflow: auto;
  margin-bottom: 10px;
  pre {
    padding: 10px;
    background-color: transparent;
  }

  &.error {
    background-color: rgba(255, 0, 0, 0.3);
    margin: 0px 20px;
    margin-bottom: 20px;
    border-radius: 3px;
    box-sizing: border-box;
  }
}
</style>
