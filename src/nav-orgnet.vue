<template id="nav-org-net">
  <v-layout row wrap>
    <v-flex xs12 sm6 md3 pt-2>
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

    <v-flex xs12 sm6 md3>
      <v-select
        v-bind:items="nets"
        item-text="name"
        item-value="id"
        return-object
        v-model="form.net"
        label="Networks"
        :disabled="!form.org.id"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import { getOrganizations } from "./meraki-api.js";
export default Vue.extend({
  template: "#nav-org-net",
  data() {
    return {
      authMenu: true,
      form: {
        org: {
          id: "",
          name: ""
        },
        net: {
          id: "",
          name: ""
        }
      },
      orgs: [],
      nets: []
    };
  },
  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
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
      this.$meraki.getOrganizations().then(res => {
        console.log("getOrganizations res", res);
        this.orgs = res.data;
      });
    },
    fetchNets: function() {
      this.nets = [];
      this.form.net = {
        id: "",
        name: ""
      };
      if (!this.form.org.id) {
        return;
      }
      this.$meraki
        .getOrganizationNetworks({ organizationId: this.form.org.id })
        .then(res => {
          this.nets = res.data;
        });
    }
  },
  watch: {
    apiKey(newVal, oldVal) {
      console.log("apiKey updated, fetching orgs");
      this.fetchOrgs();
    },
    orgs() {
      this.form.org = this.orgs[0] || "";
      this.$store.commit("setOrgs", this.orgs);
    },
    nets() {
      this.form.net = this.nets[0] || "";
      this.$store.commit("setNets", this.nets);
    },
    "form.org"(newVal, oldVal) {
      //google.script.run.setOrgId(this.form.org.id);
      this.$store.commit("setOrg", this.form.org);
      this.fetchNets();
    },
    "form.net"(newVal, oldVal) {
      //google.script.run.setNetId(this.form.net.id);
      this.$store.commit("setNet", this.form.net);
    }
  }
});
</script>
