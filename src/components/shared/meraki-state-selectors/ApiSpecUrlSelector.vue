<template id="api-spec-url-input">
  <v-card>
    <v-card-title><v-label>API Spec</v-label></v-card-title>
    <v-card-text>
      <!-- <input-base-url-selector @change="onUpdateOasUrl"></input-base-url-selector> -->
     

      <v-select
        v-bind:items="specUrls"
        item-text="name"
        item-value="url"
        return-object
        v-model="form.apiSpecUrl"
        label="Meraki OpenAPI Versions"
      ></v-select >
       <p >
         <i>{{ apiSpecUrl.url }}</i>
       </p>
      
      <!-- <v-text-field label="API Base URL" v-model="form.apiUrl" @change="updateApiUrl"></v-text-field> -->
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
import InputBaseUrlSelector from "./InputBaseUrlSelector";
export default Vue.extend({
  template: "#api-spec-url-input",
  // components:{
  //   InputBaseUrlSelector
  // },
  data() {
    return {
      form: {
        apiSpecUrl: this.apiSpecUrl,
      },
      specUrls: [
        {
          name: "v1 Latest",
          url: "https://raw.githubusercontent.com/meraki/openapi/master/openapi/spec2.json",
        },
        {
          name: "v1 Beta",
          url: "https://raw.githubusercontent.com/meraki/openapi/v1-beta/openapi/spec2.json",
        }
      ],
    };
  },
  computed: {
    apiSpecUrl: function () {
      return this.$store.state.apiSpecUrl;
    },
    orgs: function () {
      return this.$store.state.orgs;
    },
  },
  mounted: function () {
    this.form.apiSpecUrl = this.apiSpecUrl;
    this.orgs.forEach(o => this.specUrls.push(
      {
          name: o.name,
          url: `https://api.meraki.com/api/v1/organizations/${o.id}/openapiSpec`,
        }
    ))
  },
  watch: {
    "form.apiSpecUrl"() {
      console.log("updated apiSpecUrl", this.form.apiSpecUrl);
      if(this.form.apiSpecUrl){
        this.$store.commit("setApiSpecUrl", this.form.apiSpecUrl);
      }
    
    }
  },
  methods: {
    // onUpdateOasUrl(e) {
    //   console.log("onUpdateOasUrl", e.value);
    //   this.form.apiSpecUrl = e.value;
    //   this.$store.commit("setApiSpecUrl", this.form.apiSpecUrl);
    // },
    // updateApiUrl: function() {
    //   this.$store.commit("setApiUrl", this.form.apiUrl);
    // }
  },
});
</script>
