<template id="jsonata">
  <div>
    <v-toolbar dense flat>
      <v-tooltip bottom class="pr-10">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="gray"
            icon
            small
            v-bind="attrs"
            v-on="on"
            @click="onSaveFile(data, title)"
          >
            <v-icon>save_alt</v-icon>
          </v-btn>
        </template>
        <span>Download JSON</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-toolbar-title>Results</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom class="pr-10">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="green"
            small
            v-bind="attrs"
            v-on="on"
            @click="onWriteSheet(data, title)"
          >
            <v-icon>mdi-table</v-icon>
          </v-btn>
        </template>
        <span>to Sheet</span>
      </v-tooltip>
    </v-toolbar>

    <div style="overflow: auto; max-height: 300px">
      <vue-json-pretty
        height="100%"
        :data="data"
        v-model="jsonResultSelection"
     
        showLength
        showLine
        collapsedOnClickBrackets
        highlightSelectedNode
        highlightMouseoverNode
        showDoubleQuotes
        showSelectController
        selectOnClickNode

        selectableType="multiple"
      ></vue-json-pretty>
    </div>

    <v-toolbar dense flat>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            href="https://jsonata.org"
            target="_blank"
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon color="grey lighten-1" v-on="on">mdi-book</v-icon>
          </v-btn>
        </template>
        JSONata Docs
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-toolbar-title small>JSONata Query</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn  icon @click="onToggleView()">
        <v-icon>{{ toggleView ? "mdi-arrow-expand-all" : "mdi-arrow-collapse-all" }}</v-icon> 
      </v-btn> -->
    </v-toolbar>

    
      <editor
        v-model="form.query"
        @init="editorQueryInit"
        lang="javascript"
        theme="monokai"
        width="95%"
        height="75"
        class="mb-10"
        background="gray"
      ></editor>
   

    <!-- <v-text-field
      @change="onQuery"
      v-model="form.query"
      label="Query expression"
    >
      <template v-slot:append>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              href="https://jsonata.org"
              target="_blank"
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
    </v-text-field> -->

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
      <v-toolbar-title>Filtered</v-toolbar-title>
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

    <div style="overflow: auto; height: 300px">
      <vue-json-pretty
        
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
const beautify = require("js-beautify").js;
//import * as editor from "vue2-ace-editor";
import VueJsonPretty from "vue-json-pretty";

import '../../assets/json-pretty/styles.css';
//import 'vue-json-pretty/lib/styles.css';
import Vue from "vue";
export default Vue.extend({
  props: ["data", "title"], //"query",
  template: "#jsonata",
  components: {
    VueJsonPretty,
    editor: require("vue2-ace-editor"),
  },
  data() {
    return {
      toggleView: false,
      jsonResultSelection: [],
      form: {
        includeIndex: false,
        query: "$",
      },
      reportDataFiltered: [],
      editorQuery: "",
    };
  },
  computed: {
    jsonResultSelectionAdjusted: function () {
      // ** Cleans up queries to use with JSONata expressions
      let v = this.jsonResultSelection;
      if (!v.length) {
        v = "$";
      }
      let values = [];
      let queries = [];

      if (Array.isArray(v)) {
        values = v;
      } else {
        values.push(v);
      }
      //console.log('jsonResultSelectionAdjusted values',values)

      values = values.map((value) => {
        if (true) {
          //if (!this.form.includeIndex) {
          value = value.replace(/ *\[[^\]]*]/, ""); // removes everyting in brackets
        }
        let split = value.split(".");
        //console.log("split", split);
        return split;
      });
      //console.log("jsonResultSelectionAdjusted values split", values);

      // replace "root" with "$" and removes first item
      values = values.map((value) => {
        value[0] = value[0].replace("root", "$");
        if (value.length !== 1) {
          value.unshift();
        }
        value = value.join(".");
        return value;
      });
      // this.form.query = values;
      //console.log("jsonResultSelectionAdjusted vales", values);
      //this.form.query = values;

      return values;
    },
    // jsonSelectionAsParamTable: function(){
    //   if(!this.jsonResultSelectionAdjusted){return}
    //   return this.genParamTable(this.jsonResultSelectionAdjusted)
    // }
  },
  watch: {
    data() {
      //this.form.query = "$"; // RESET QUERY on new data. Might make this an OPTION
      this.onQuery();
     
    },
    query() {
      // if (!this.form.includeIndex) {
      //   this.form.query = "$" + this.query.replace(/ *\[[^\]]*]/, ""); // removes everyting in brackets
      // } else {
      //   this.form.query = "$" + this.query;
      // }

      // $.{"url":url}

      // let queryString = "";

      // if (this.query.length <= 1 && this.query[0] === "$") {
      //   queryString = "$";
      // } else {
      //   queryString = "$.{";
      //   for (let i in this.query) {
      //     queryString += this.genParamStub(this.query[i]);
      //     if (i < this.query.length - 1) {
      //       queryString += ",";
      //     }
      //   }
      //   queryString += "}";
      // }

      // //this.form.query = queryString;
      // this.form.query = beautify(queryString, { indent_size: 2, space_in_empty_paren: true })
      this.form.query = this.genParamTable(this.form.query);
      // console.log("queryString", queryString);
      this.onQuery();
    },
   jsonResultSelectionAdjusted(){
     this.form.query = this.genParamTable(this.jsonResultSelectionAdjusted)
   },
    "form.query"() {
      this.onQuery();
      this.$emit("queryChange", this.form.query);
    },
    exportDataFiltered() {
      this.$emit("resultData", this.reportDataFiltered);
    },
  },
  mounted() {
    //this.form.query = this.genParamTable(this.query);
    this.onQuery();
  },
  methods: {
    adjustSelection(value){
      let v = tvalue
      if (!v.length) {
        v = "$";
      }
      let values = [];
      let queries = [];

      if (Array.isArray(v)) {
        values = v;
      } else {
        values.push(v);
      }
      //console.log('jsonResultSelectionAdjusted values',values)

      values = values.map((value) => {
        if (true) {
          //if (!this.form.includeIndex) {
          value = value.replace(/ *\[[^\]]*]/, ""); // removes everyting in brackets
        }
        let split = value.split(".");
        //console.log("split", split);
        return split;
      });
      //console.log("jsonResultSelectionAdjusted values split", values);

      // replace "root" with "$" and removes first item
      values = values.map((value) => {
        value[0] = value[0].replace("root", "$");
        if (value.length !== 1) {
          value.unshift();
        }
        value = value.join(".");
        return value;
      });
      // this.form.query = values;
      //console.log("jsonResultSelectionAdjusted vales", values);
      //this.form.query = values;

      return values;
    },
    handleResultClick(value){
      //console.log('handleResultClick', value)
      this.form.query = this.adjustSelection(value)
    },
    onToggleView() {
      if (!this.toggleView) {
        this.editorQuery.setOption("maxLines", 10);
      } else {
        this.editorQuery.setOption("maxLines", 2);
      }
      this.toggleView = !this.toggleView;
    },
    editorQueryInit(editor) {
      require("brace/ext/language_tools"); // language extension prerequsite...
      // require('brace/mode/html')
      require("brace/mode/javascript"); // language
      require("brace/mode/json"); // language
      require("brace/mode/less");
      require("brace/theme/monokai");
      // require('brace/snippets/javascript') // snippet
      editor.setOption("showLineNumbers", false);
      editor.setOption("showGutter", false);
      editor.setOption("fontSize", 11);
      editor.setOption("maxLines", 15);
      editor.getSession().setUseWorker(false);
      editor.getSession().foldAll();

      //
      this.editorQuery = editor;
    },
    genParamTable(queries) {
      let queryString = "";

      if (queries.length <= 1 && queries[0] === "$") {
        queryString = "$";
      } else {
        queryString = "$.{";
        for (let i in queries) {
          queryString += this.genParamStub(queries[i]);
          if (i < queries.length - 1) {
            queryString += ",";
          }
        }
        queryString += "}";
      }

      //this.form.query = queryString;
      return beautify(queryString, {
        indent_size: 2,
        space_in_empty_paren: true,
      });
    },
    genParamStub(value) {
      //console.log("genParamStub value", value);
      let adjustedQuery = "";

      if (this.form.includeIndex) {
        adjustedQuery = value.replace(/ *\[[^\]]*]/, ""); // removes everyting in brackets
      } else {
        adjustedQuery = value;
      }
      adjustedQuery = adjustedQuery.replace("$", ""); // removes root string when its in the table object

      // create table format for array
      const queryObj = adjustedQuery.split(".");
      //queryObj.map(q => {return "`"+q+"`"; }) // add escape tick
      //const param = queryObj[queryObj.length - 1]; //last param
      const param = adjustedQuery.replace(`.`, ``);
      const paramStub = `"` + param + '":' + adjustedQuery.replace(`.`, ``);
      return paramStub;
    },
    onQuery() {
      this.reportDataFiltered = this.generateJsonataResult(
        this.form.query,
        this.data
      );
    },
    onWriteSheet(data, title) {
      this.$utilities.writeData(data, title);
    },
    generateJsonataResult(query, jsonData) {
      let result;
      try {
        const expr = jsonata(query);
        expr.assign("trace", function (arg) {
         // console.log(arg);
        });
        this.timeboxExpression(expr, 5000, 500);

        expr.assign("trace", function (arg) {
         // console.log("trace arg", arg);
        });
       // console.log("generateJsonataResult query, jsonData", query, jsonData);

        result = expr.evaluate(jsonData, (error, result) => {
          if (error) {
            console.error("jsonata error", error);
            // finalResult = error
            return error.message;
          }
        //  console.log("Finished JSONata", result);

          return result;
        });
      } catch (e) {
        console.log("JSONata expression error", e);
        result = e.message;
      }
    //  console.log("generateJsonataResult result");
      return result;
    },
    timeboxExpression(expr, timeout, maxDepth) {
      let depth = 0;
      const time = Date.now();
      // console.log(
      //   "run timeboxExpression (expr, timeout, maxDepth)",
      //   expr,
      //   timeout,
      //   maxDepth
      // );
      const checkRunnaway = function () {
        if (depth > maxDepth) {
          // stack too deep
          //console.log("stack too deep");
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

<style >

@import '../../assets/json-pretty/styles.css';

.vjs-tree {
  font-family: Monaco, Menlo, Consolas, Bitstream Vera Sans Mono, monospace;
  font-size: x-small !important;
}
</style>