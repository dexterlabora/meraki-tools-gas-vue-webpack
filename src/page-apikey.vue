<template id="page-api-key">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title>Enter your Meraki API Key</v-card-title>
          <v-divider></v-divider>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#page-api-key",
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
    this.$meraki.setApiKey(payload);
  },
  methods: {
    updateApiKey: function() {
      this.$store.commit("setApiKey", this.form.apiKey);
      this.$meraki.setApiKey(payload);
    }
  }
});
</script>
