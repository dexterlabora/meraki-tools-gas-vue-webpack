<template id="device-selector">
  <div>
    <v-select
      v-bind:items="filteredDevices"
      item-text="name"
      item-value="serial"
      return-object
      v-model="device"
      label="Devices"
      autofocus
    >
      <template slot="selection" slot-scope="{ item, index }">
        <v-chip v-if="index === 0">
          <span>{{ item.name || item.mac }} | {{ item.model }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text caption">(+{{ value.length - 1 }} others)</span>
      </template>
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#device-selector",
  props: ["model", "label", "description"],
  computed: {
    net: function() {
      return this.$store.state.net;
    },
    deviceName: function() {
      return this.device.name + " - " + this.device.model;
    },
    filteredDevices: function() {
      if (this.model) {
        return this.devices.filter(d => d.model.includes(this.model));
      } else {
        return this.devices;
      }
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
      this.$merakiSdk.DevicesController.getNetworkDevices(this.net.id).then(
        res => {
          this.devices = res;
          this.device = this.devices[0]; // set default device
        }
      );
    }
  },
  watch: {
    device() {
      //this.$store.commit("setDevice", this.device); // set state
      this.$emit("onChange", { device: this.device });
    },
    net: function() {
      this.fetchDevices();
    }
  }
});
</script>

<style scoped>
</style>