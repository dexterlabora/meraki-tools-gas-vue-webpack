<template id="api-key-input">
  <v-card>
    <v-card-text>
      <v-text-field
        label="API Key"
        v-model="form.apiKey"
        :type="showApiKey ? 'text' : 'password'"
        :append-icon="showApiKey ? 'visibility_off' : 'visibility'"
        @click:append="showApiKey = !showApiKey"
        @change="updateApiKey"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#api-key-input",
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
  },
  methods: {
    updateApiKey: function() {
      this.$store.commit("setApiKey", this.form.apiKey);
    }
  }
});
</script>
