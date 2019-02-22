<template id="client-selector">
  <div>
    <v-select
      v-bind:items="clients"
      item-text="dhcpHostname"
      item-value="mac"
      return-object
      v-model="client"
      label="Client"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#client-selector",
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

      for (let d = 0; d < this.devices.length; d++) {
        const api = await this.$merakiSdk.ClientsController.getDeviceClients(
          this.devices[d].serial,
          this.timespan
        )
          .then(res => (this.clients = this.clients.concat(res)))
          .catch(e => console.log(e));
      }
    }
  },
  watch: {
    client() {
      this.$store.commit("setClient", this.client);
    },
    clients() {
      this.$store.commit("setClients", this.clients);
    },
    devices() {
      this.fetchClients();
    }
  }
});
</script>

<style scoped>
</style>