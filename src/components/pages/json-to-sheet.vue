<template id="json-to-sheet">
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md12 lg12 class="mb-2">Paste any valid JSON data to generate a report</v-flex>

      <v-flex xs12 md12 lg12>
        <v-textarea solo name="json" label="JSON" v-model="form.json"></v-textarea>
      </v-flex>
      <v-flex xs12 md12 lg12>
        <v-btn color="blue darken-2" dark fab @click="onRun()">
          <v-icon>play_arrow</v-icon>
        </v-btn>

        <v-btn color="gray" absolute right fab @click="onClear()">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#json-to-sheet",
  data() {
    return {
      form: {
        json: ""
      }
    };
  },
  methods: {
    onRun() {
      console.log("onRun To Sheet", this.form.json);
      try {
        const parsed = JSON.parse(this.form.json);
        this.toReport(parsed, "JSON Report");
      } catch (e) {
        this.$store.commit("setSnackbar", {
          msg: "Invalid JSON",
          color: "danger"
        });
      }
    },
    onClear() {
      this.form.json = "";
    },
    toReport(json, title, options = {}, location) {
      // format all responses into an array

      if (!Array.isArray(json)) {
        json = [json];
      }

      // print data to sheet
      this.$utilities.writeData(json, title, options, location);
      this.$store.commit("setLoading", false);
    }
  }
});
</script>
