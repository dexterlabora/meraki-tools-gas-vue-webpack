<template id="page-settings">
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md12 lg12>
        <api-key-input></api-key-input>
      </v-flex>
      <v-flex xs12 md12 lg12 pt-5>
        <api-url-input></api-url-input>
      </v-flex>
      <v-flex xs12 md12 lg12 class="pt-4">
        <org-refresh-button></org-refresh-button>
      </v-flex>
      <v-flex xs12 md12 lg12 pt-5>
        <v-switch
          v-model="form.displayJson"
          label="Display JSON for Reports"
          @change="onDisplayJson"
        ></v-switch>
      </v-flex>
      <!-- not need for now
      <v-flex xs12 md12 lg12 pt-5>
        <v-switch v-model="form.beta" label="Use Beta Code" @change="onBeta"></v-switch>
      </v-flex>
      -->
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import ApiKeyInput from "../shared/meraki-state-selectors/ApiKeyInput";
import ApiUrlInput from "../shared/meraki-state-selectors/ApiUrlInput";
import OrgRefreshButton from "../shared/OrgRefreshButton";
export default Vue.extend({
  template: "#page-settings",
  components: {
    ApiKeyInput,
    ApiUrlInput,
    OrgRefreshButton
  },
  data() {
    return {
      showApiKey: false,
      form: {
        beta: false,
        displayJson: false
      }
    };
  },
  computed: {
    /*
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    */
    beta: function() {
      return this.$store.state.beta;
    },
    displayJson: function() {
      return this.$store.state.displayJson;
    }
  },
  mounted: function() {
    //this.form.apiKey = this.apiKey;
    this.form.beta = this.beta;
    this.form.displayJson = this.displayJson;
    //this.$meraki.setApiKey(this.apiKey);
  },
  methods: {
    /*
    updateApiKey: function() {
      this.$store.commit("setApiKey", this.form.apiKey);
      this.$meraki.setApiKey(this.form.apiKey);
    },
    */
    onBeta: function() {
      this.$store.commit("setBeta", this.form.beta);
    },
    onDisplayJson: function() {
      this.$store.commit("setDisplayJson", this.form.displayJson);
    },
    fetchOrgs: function() {
      let orgs = [];
      this.$merakiSdk.OrganizationsController.getOrganizations().then(res => {
        //console.log("getOrganizations res", res);
        // order and save orgs
        orgs = res.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      });
      this.$store.commit("setOrgs", orgs);
    }
  }
});
</script>
