<template id="api-url-input">
  <v-card>
    <v-card-text>
      <v-text-field label="API Base URL" v-model="form.apiUrl" @change="updateApiUrl"></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#api-url-input",
  data() {
    return {
      form: {
        apiUrl: ""
      }
    };
  },
  computed: {
    apiUrl: function() {
      return this.$store.state.apiUrl;
    }
  },
  mounted: function() {
    this.form.apiUrl = this.apiUrl;
  },
  methods: {
    updateApiUrl: function() {
      this.$store.commit("setApiUrl", this.form.apiUrl);
    }
  }
});
</script>
