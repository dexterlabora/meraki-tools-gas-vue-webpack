<template id="jsonata">
  <div>
    
    <v-text-field
      @change="onQuery"
      v-model="form.query"
      label="Query expression"
    >
    <template v-slot:append>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
             href="https://jsonata.org" target ="_blank"
             v-bind="attrs"
            v-on="on"
            icon
              >
            
            <v-icon color="grey lighten-1" v-on="on">mdi-book</v-icon>
            </v-btn>
          </template>
        JSONata Docs
        </v-tooltip>
      </template>
    </v-text-field>

    <!-- <v-checkbox
        v-model="form.includeIndex"
        label="Indexed"
        class="pt-0"
        
      >
      <template v-slot:append>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon color="grey lighten-1" v-on="on">info</v-icon>
          </template>
          Include array index with above selection
        </v-tooltip>
      </template>
    </v-checkbox> -->

    JSONata Results

    <v-toolbar dense flat>

      <v-tooltip bottom class="pr-10">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="gray"          
            icon     
            small
            v-bind="attrs"
            v-on="on"
            @click="onSaveFile(reportDataFiltered)"
 
          >
            <v-icon>save_alt</v-icon>
          </v-btn>
        </template>
        <span>Download JSON</span>
      </v-tooltip>

      <v-spacer></v-spacer>
        <v-tooltip bottom class="pr-10">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="green"                            
            small
            v-bind="attrs"
            v-on="on"
            @click="onWriteSheet(reportDataFiltered, title)"
          
            
          >
            <v-icon>mdi-table</v-icon>

          </v-btn>
        </template>
        <span>to Sheet</span>
      </v-tooltip>
      
    </v-toolbar>


    <div style="overflow: auto; max-height: 500px" > 
      <vue-json-pretty
        class="height:100%"
        :data="reportDataFiltered"
        showLength
        showLine
        collapsedOnClickBrackets
        showDoubleQuotes
      ></vue-json-pretty>
    </div>
  </div>
</template>

<script>
const rateLimit = require("function-rate-limit");
const jsonata = require("jsonata");
import VueJsonPretty from "vue-json-pretty";
import Vue from "vue";
export default Vue.extend({
  props: ["data", "query", "title"],
  template: "#jsonata",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      form: {
        includeIndex: false,
        query: "$",
      },
      reportDataFiltered: [],
    };
  },
  watch: {
    data() {
      this.onQuery();
    },
    query() {
      // if (!this.form.includeIndex) {
      //   this.form.query = "$" + this.query.replace(/ *\[[^\]]*]/, ""); // removes everyting in brackets
      // } else {
      //   this.form.query = "$" + this.query;
      // }

      // $.{"url":url}
      let adjustedQuery = ""
      if (!this.form.includeIndex) {
        adjustedQuery = this.query.replace(/ *\[[^\]]*]/, ""); // removes everyting in brackets
      } else {
        adjustedQuery= this.query;
      }

      // create table format for array
      const queryObj = this.query.split(".")
      const param = queryObj[queryObj.length -1]
      this.form.query = '$.{"' + param.replaceAll("`","") +'":'+adjustedQuery.replace(`.`,``)+'}'

      this.onQuery();
    },
    "form.query"() {
      this.$emit("queryChange", this.form.query);
    },
    eportDataFiltered() {
      this.$emit("resultData", this.reportDataFiltered);
    },
  },
  mounted() {
    this.onQuery();
  },
  methods: {
    onQuery() {
      //this.form.query = this.form.query + query;

      this.reportDataFiltered = this.generateJsonataResult(
        this.form.query,
        this.data
      );
    },
     onWriteSheet(data, title){
      this.$utilities.writeData(data,title)
    },
    generateJsonataResult(query, jsonData) {
      let result;
      try {
        const expr = jsonata(query);
        expr.assign("trace", function (arg) {
          console.log(arg);
        });
        this.timeboxExpression(expr, 5000, 500);

        expr.assign("trace", function (arg) {
          console.log("trace arg", arg);
        });
        console.log("generateJsonataResult query, jsonData", query, jsonData);

        result = expr.evaluate(jsonData, (error, result) => {
          if (error) {
            console.error("jsonata error", error);
            // finalResult = error
            return error.message;
          }
          console.log("Finished JSONata", result);

          return result;
        });
      } catch (e) {
        console.log("JSONata expression error", e);
        result = e.message;
      }
      console.log("generateJsonataResult result");
      return result;
    },
    timeboxExpression(expr, timeout, maxDepth) {
      let depth = 0;
      const time = Date.now();
      console.log(
        "run timeboxExpression (expr, timeout, maxDepth)",
        expr,
        timeout,
        maxDepth
      );
      const checkRunnaway = function () {
        if (depth > maxDepth) {
          // stack too deep
          console.log("stack too deep");
          // eslint-disable-next-line  no-throw-literal
          throw {
            code: "U1001",
            message:
              "Stack overflow error: Check for non-terminating recursive function.  Consider rewriting as tail-recursive.",
            stack: new Error().stack,
          };
        }
        if (Date.now() - time > timeout) {
          // expression has run for too long
          console.log("expression has run for too long");
          // eslint-disable-next-line  no-throw-literal
          throw {
            code: "U1002",
            message: "Expression evaluation timeout: Check for infinite loop",
            stack: new Error().stack,
          };
        }
      };

      // register callbacks
      expr.assign("__evaluate_entry", function (expr, input, environment) {
        depth++;
        checkRunnaway();
      });
      expr.assign("__evaluate_exit", function (
        expr,
        input,
        environment,
        result
      ) {
        depth--;
        checkRunnaway();
      });
    },

    onSaveFile(file) {
      this.$utilities.saveFile(file, this.title);
    },
  },
});
</script>

<style>
.vjs-tree {
    font-family: Monaco,Menlo,Consolas,Bitstream Vera Sans Mono,monospace;
    font-size: 11px;
}
</style>