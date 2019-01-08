<template id="net-selector">
  <v-layout row>
    <v-flex xs12 sm6 md6 pt-2>
      <v-select
        v-bind:items="nets"
        item-text="name"
        item-value="id"
        return-object
        v-model="form.net"
        label="Networks"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#net-selector",
  data() {
    return {
      form: {
        net: {
          id: "",
          name: ""
        }
      },
      nets: []
    };
  },
  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
    },
    org: function() {
      return this.$store.state.org;
    }
  },
  created() {
    this.fetchNets();
  },
  methods: {
    fetchNets: function() {
      this.nets = [];
      this.form.net = {
        id: "",
        name: ""
      };
      if (!this.org.id) {
        return;
      }
      this.$meraki
        .getOrganizationNetworks({ organizationId: this.org.id })
        .then(res => {
          this.nets = res.data;
          this.form.net = this.nets[0]; // set default
          this.$store.commit("setNets", this.nets); // set state
        });
    }
  },
  watch: {
    org() {
      this.fetchNets();
    },
    "form.net"() {
      this.$store.commit("setNet", this.form.net); // set state
    }
  }
});
</script>
