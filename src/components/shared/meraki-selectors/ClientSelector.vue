<template id="client-selector">
  <div>
    <v-select
      v-bind:items="clients"
      item-text="description"
      item-value="mac"
      return-object
      v-model="form.client"
      label="Client"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#client-selector",
  props: ["label", "description"],
  computed: {
    devices: function() {
      return this.$store.state.devices;
    },
    device: function() {
      return this.$store.state.device;
    },
    net: function() {
      return this.$store.state.net;
    }
    // timespan: function() {
    //   return this.$store.state.timespan;
    // }
  },
  created: function() {
    this.fetchClients();
  },
  data() {
    return {
      //client: {},
      clients: [],
      form: {
        client: {}
      },
      timespan: 7200
    };
  },
  methods: {
    async fetchClients() {
      if (!this.net) {
        return;
      }
      this.clients = [];

      const api = await this.$merakiSdk.ClientsController.getNetworkClients({
        networkId: this.net.id,
        timespan: this.timespan
      })
        .then(res => {
          this.clients = res;
        })
        .catch(e => console.log(e));

      const sortedClients = this.clients.sort(function(a, b) {
        if (a.description < b.description) return -1;
        if (a.description > b.description) return 1;
        return 0;
      });
      this.$store.commit("setClients", sortedClients);
    }
  },
  watch: {
    "form.client"() {
      //this.$store.commit("setClient", this.client);
      this.$emit("onChange", {
        client: this.form.client
      });
    },
    net() {
      this.fetchClients();
    }
  }
});
</script>

<style scoped>
</style>