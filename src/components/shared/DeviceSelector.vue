<template id="device-selector">
  <div>
    <v-select
      v-bind:items="devices"
      item-text="name"
      item-value="serial"
      return-object
      v-model="device"
      label="Devices"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#device-selector",
  computed: {
    net: function() {
      return this.$store.state.net;
    }
  },
  created: function() {
    this.fetchDevices();
  },
  data() {
    return {
      device: {},
      devices: []
    };
  },
  methods: {
    fetchDevices() {
      this.$meraki.getNetworkDevices({ networkId: this.net.id }).then(res => {
        this.devices = res.data;
        this.device = this.devices[0]; // set default ssid
      });
    }
  },
  watch: {
    device() {
      this.$store.commit("setDevice", this.device); // set state
    },
    net: function() {
      this.fetchDevices();
    }
  }
});
</script>

<style scoped>
</style>