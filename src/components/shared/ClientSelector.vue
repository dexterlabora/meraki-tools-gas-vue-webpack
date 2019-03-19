<template id="client-selector">
  <div>
    <devices-selector></devices-selector>
    <v-select
      v-bind:items="clients"
      item-text="dhcpHostname"
      item-value="mac"
      return-object
      v-model="client"
      label="Client"
      autofocus
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
import DevicesSelector from "./DevicesSelector";

export default Vue.extend({
  template: "#client-selector",
  components: {
    DevicesSelector
  },
  computed: {
    devices: function() {
      return this.$store.state.devices;
    },
    device: function() {
      return this.$store.state.device;
    },
    net: function() {
      return this.$store.state.net;
    },
    timespan: function() {
      return this.$store.state.timespan;
    }
  },
  created: function() {
    this.fetchClients();
  },
  data() {
    return {
      client: {},
      clients: []
    };
  },
  methods: {
    async fetchClients() {
      this.clients = [];

      for (let d in this.devices) {
        const api = await this.$merakiSdk.ClientsController.getDeviceClients(
          this.devices[d].serial,
          this.timespan
        )
          .then(res => {
            this.clients = this.clients.concat(res);
          })
          .catch(e => console.log(e));
      }

      const sortedClients = this.clients.sort(function(a, b) {
        if (a.dhcpHostname < b.dhcpHostname) return -1;
        if (a.dhcpHostname > b.dhcpHostname) return 1;
        return 0;
      });
      this.$store.commit("setClients", sortedClients);
    }
  },
  watch: {
    client() {
      this.$store.commit("setClient", this.client);
    },
    devices() {
      this.fetchClients();
    }
  }
});
</script>

<style scoped>
</style>