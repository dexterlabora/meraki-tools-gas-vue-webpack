<template id="org-selector">
  <div>
    <v-select
      v-bind:items="orgs"
      item-text="name"
      item-value="id"
      return-object
      v-model="form.org"
      label="Organizations"
      mask
      :disabled="!apiKey"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#org-selector",
  data() {
    return {
      form: {
        org: {
          id: "",
          name: ""
        }
      },
      orgs: []
    };
  },
  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    apiUrl: function() {
      return this.$store.state.apiUrl;
    },
    org: function() {
      return this.$store.state.org;
    }
  },
  created() {
    this.fetchOrgs();
  },
  methods: {
    fetchOrgs: function() {
      if (!this.apiKey) {
        return;
      }
      this.orgs = [];
      this.form.org = {
        id: "",
        name: ""
      };
      this.$merakiSdk.OrganizationsController.getOrganizations().then(res => {
        console.log("getOrganizations res", res);
        this.orgs = res;
      });
    }
  },
  watch: {
    apiKey(newVal, oldVal) {
      console.log("apiKey updated, fetching orgs");
      this.fetchOrgs();
    },
    apiUrl(newVal, oldVal) {
      console.log("apiUrl updated, fetching orgs");
      this.fetchOrgs();
    },
    org() {
      this.form.org = this.org;
    },
    orgs() {
      this.form.org = this.orgs[0] || "";
      this.$store.commit("setOrgs", this.orgs);
    },
    "form.org"(newVal, oldVal) {
      console.log("setting org, ", this.form.org);
      this.$store.commit("setOrg", this.form.org);
    }
  }
});
</script>
