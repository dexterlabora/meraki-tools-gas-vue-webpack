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
import * as reports from "../../meraki-custom-reports.ts";

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
    fetchClients() {
      reports
        .getDevicesClients({
          serials: this.devices.map(d => d.serial),
          $queryParameters: { timespan: this.timespan }
        })
        .then(res => {
          this.clients = res.data;
          this.client = this.clients[0]; // set default client
        });
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