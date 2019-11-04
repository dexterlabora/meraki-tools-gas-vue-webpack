<template id="ble-client-selector">
  <div>
    <devices-selector></devices-selector>
    <v-select
      v-bind:items="bleClients"
      item-text="mac"
      item-value="mac"
      return-object
      v-model="bleClient"
      label="BLE Client"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#ble-client-selector",
  computed: {
    net: function() {
      return this.$store.state.net;
    }
  },
  created: function() {
    this.fetchBleClients();
  },
  data() {
    return {
      bleClient: {},
      bleClients: []
    };
  },
  methods: {
    async fetchBleClients() {
      this.bleClients = [];

      for (let d in this.devices) {
        const api = await this.$merakiSdk.BluetoothClientsController.getNetworkBluetoothClient(
          this.bleClient.mac,
          this.timespan
        )
          .then(res => (this.clients = this.clients.concat(res)))
          .catch(e => console.log(e));
      }
    }
  },
  watch: {
    bleClient() {
      this.$store.commit("setBleClient", this.bleClient);
    },
    bleClients() {
      this.$store.commit("setBleClients", this.bleClients);
    },
    devices() {
      this.fetchBleClients();
    }
  }
});
</script>

<style scoped>
</style>