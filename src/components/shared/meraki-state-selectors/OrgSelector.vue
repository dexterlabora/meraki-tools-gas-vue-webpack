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
      autofocus
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
      }
      //orgs: []
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
    },
    orgs: function() {
      return this.$store.state.orgs;
    }
  },
  created() {
    if (!this.org.id || !this.orgs.length > 0) {
      this.fetchOrgs();
    } else {
      this.form.org = this.org;
    }
  },
  methods: {
    fetchOrgs: function() {
      if (!this.apiKey) {
        return;
      }
      let orgs = [];
      this.form.org = {
        id: "",
        name: ""
      };
      this.$merakiSdk.OrganizationsController.getOrganizations().then(res => {
        //console.log("getOrganizations res", res);
        // order and save orgs
        orgs = res.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.$store.commit("setOrgs", orgs);
      });
    }
  },
  watch: {
    apiKey(newVal, oldVal) {
      //console.log("apiKey updated, fetching orgs");
      this.fetchOrgs();
    },
    apiUrl(newVal, oldVal) {
      //console.log("apiUrl updated, fetching orgs");
      this.fetchOrgs();
    },
    org() {
      this.form.org = this.org;
    },
    orgs() {
      this.form.org = this.orgs[0] || "";
      //this.$store.commit("setOrgs", this.orgs);
    },
    "form.org"(newVal, oldVal) {
      //console.log("setting org, ", this.form.org);
      this.$store.commit("setOrg", this.form.org);
    }
  }
});
</script>
