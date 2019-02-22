<template id="org-select">
  <v-layout row>
    <v-flex xs12 sm6 md6 pt-2>
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
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default Vue.extend({
  template: "#org-select",
  props: {
    apiKey: {
      type: String,
      default: ""
    },
    apiUrl: {
      type: String,
      default: ""
    }
  },
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
  created() {
    this.fetchOrgs();
  },
  methods: {
    fetchOrgs: function() {
      if (!this.apiKey) {
        return;
      }
      // init local state
      this.orgs = [];
      this.form.org = {
        id: "",
        name: ""
      };
      // call Meraki API
      axios
        .get(`${this.baseUrl}/organizations`, {
          headers: { "X-Cisco-Meraki-API-Key": this.apiKey }
        })
        .then(res => {
          console.log("get Organizations res.data", res.data);
          this.orgs = res.data;
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
    orgs() {
      this.form.org = this.orgs[0] || "";
      //this.$store.commit("setOrgs", this.orgs);
      this.$emit("orgs", this.orgs);
    },
    "form.org"(newVal, oldVal) {
      console.log("setting org, ", this.form.org);
      //this.$store.commit("setOrg", this.form.org);
      this.$emit("org", this.form.org);
    }
  }
});
</script>
