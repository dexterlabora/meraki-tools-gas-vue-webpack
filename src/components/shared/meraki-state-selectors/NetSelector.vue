<template id="net-selector">
  <div>
    <v-select
      v-bind:items="nets"
      item-text="name"
      item-value="id"
      return-object
      v-model="form.net"
      label="Networks"
      autofocus
    ></v-select>
  </div>
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
      this.$merakiSdk.NetworksController.getOrganizationNetworks({
        organizationId: this.org.id
      }).then(res => {
        // order and save the networks
        this.nets = res.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
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
