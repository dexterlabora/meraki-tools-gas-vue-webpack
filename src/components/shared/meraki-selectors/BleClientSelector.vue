<template id="ble-client-selector">
  <div>
    <v-select
      :items="bleClients"
      item-value="mac"
      return-object
      v-model="form.bleClient"
      label="BLE Client"
    >
      <template
        slot="selection"
        slot-scope="data"
      >{{ data.item.deviceName || data.item.name || data.item.mac }}</template>
      <template
        slot="item"
        slot-scope="data"
      >{{ data.item.deviceName || data.item.name || data.item.mac }}</template>
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#ble-client-selector",
  props: ["label", "description", "timespans"],
  computed: {
    net() {
      return this.$store.state.net;
    },
    clientName() {
      return this.f;
    }
  },
  created: function() {
    this.fetchBleClients();
  },
  data() {
    return {
      form: {
        bleClient: {}
      },
      bleClients: []
    };
  },
  methods: {
    fetchBleClients() {
      if (!this.net) {
        return;
      }
      this.bleClients = [];
      this.$merakiSdk.BluetoothClientsController.getNetworkBluetoothClients({
        networkId: this.net.id,
        perPage: 100,
        timespan: this.timespan || 86400
      })
        .then(res => {
          this.bleClients = res;
          this.form.bleClient = this.bleClients[0]; // set default
        })
        .catch(e => console.log(e));
    }
  },
  watch: {
    "form.bleClient"() {
      //this.$store.commit("setBleClient", this.bleClient);
      this.$emit("onChange", { bluetoothClient: this.form.bleClient });
    },
    net() {
      this.fetchBleClients();
    }
  }
});
</script>

<style scoped>
</style>