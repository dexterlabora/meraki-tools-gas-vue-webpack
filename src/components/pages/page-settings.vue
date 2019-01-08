<template id="page-settings">
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md12 lg12>
        <api-key-input></api-key-input>
      </v-flex>
      <v-flex xs12 md12 lg12 pt-5>
        <api-url-input></api-url-input>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import ApiKeyInput from "../shared/ApiKeyInput";
import ApiUrlInput from "../shared/ApiUrlInput";
export default Vue.extend({
  template: "#page-settings",
  components: {
    ApiKeyInput,
    ApiUrlInput
  },
  data() {
    return {
      showApiKey: false,
      form: {
        apiKey: ""
      }
    };
  },
  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
    }
  },
  mounted: function() {
    this.form.apiKey = this.apiKey;
    this.$meraki.setApiKey(this.apiKey);
  },
  methods: {
    updateApiKey: function() {
      this.$store.commit("setApiKey", this.form.apiKey);
      this.$meraki.setApiKey(this.form.apiKey);
    }
  }
});
</script>
