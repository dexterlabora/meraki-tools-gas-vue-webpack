<template id="api-url-input">
  <v-card>
    <v-card-title><v-label>API Service</v-label></v-card-title>
    <v-card-text>
      <input-base-url-selector @change="onUpdateOasUrl"></input-base-url-selector>
      <i>{{form.apiUrl}}</i>
      <!-- <v-text-field label="API Base URL" v-model="form.apiUrl" @change="updateApiUrl"></v-text-field> -->
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
import InputBaseUrlSelector from "./InputBaseUrlSelector";
export default Vue.extend({
  template: "#api-url-input",
  components:{
    InputBaseUrlSelector
  },
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
    onUpdateOasUrl(e){
      console.log('onUpdateOasUrl',e.value)
      this.form.apiUrl = e.value
      this.$store.commit("setApiUrl", this.form.apiUrl);
    },
    // updateApiUrl: function() {
    //   this.$store.commit("setApiUrl", this.form.apiUrl);
    // }
  }
});
</script>
