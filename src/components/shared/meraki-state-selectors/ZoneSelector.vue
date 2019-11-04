<template id="zone-selector">
  <div>
    <v-select
      v-bind:items="zones"
      item-text="label"
      item-value="zoneId"
      return-object
      v-model="zone"
      label="Zones"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#zone-selector",
  computed: {
    net: function() {
      return this.$store.state.net;
    },
    device: function() {
      return this.$store.state.device;
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
      if (!this.device.model.includes("MV")) {
        this.zone = "";
        return;
      }
      this.$meraki
        .getDeviceCameraAnalyticsZones({
          serial: this.device.serial,
          $queryParameters: {
            timespan: this.timespan
          }
        })
        .then(res => {
          this.zones = res.data;
          this.zone = this.zones[0]; // set default ssid
        });
    }
  },
  watch: {
    zone() {
      this.$store.commit("setZone", this.zone); // set state
    },
    device: function() {
      this.fetchZones();
    }
  }
});
</script>

<style scoped>
</style>