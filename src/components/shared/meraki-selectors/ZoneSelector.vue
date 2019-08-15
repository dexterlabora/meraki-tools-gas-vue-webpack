<template id="zone-selector">
  <div>
    <v-select
      v-bind:items="zones"
      item-text="label"
      item-value="zoneId"
      return-object
      v-model="zone"
      label="Zones"
      autofocus
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: ["device"],
  template: "#zone-selector",
  computed: {
    net: function() {
      return this.$store.state.net;
    }
  },
  created: function() {
    this.fetchZones();
  },
  data() {
    return {
      zone: {},
      zones: []
    };
  },
  methods: {
    fetchZones() {
      if (!this.device) {
        return;
      }
      if (!this.device.model.includes("MV")) {
        this.zone = "";
        return;
      }
      this.$merakiSdk.MVSenseController.getDeviceCameraAnalyticsZones(
        this.device.serial
      ).then(res => {
        this.zones = res;
        this.zone = this.zones[0]; // set default ssid
      });
    }
  },
  watch: {
    zone() {
      //this.$store.commit("setZone", this.zone); // set state
      this.$emit("onChange", { zone: this.zone });
    },
    device: function() {
      this.fetchZones();
    }
  }
});
</script>

<style scoped>
</style>