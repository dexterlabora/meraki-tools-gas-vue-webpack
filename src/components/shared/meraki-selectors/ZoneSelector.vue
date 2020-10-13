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
      const options = {
        method: "get",
        url: `/devices/${this.device.serial}/camera/analytics/zones`,
      };
      this.$rh.request(options)
      .then(res => {
        // order and save the networks
        this.zones = res.sort(function(a, b) {
          if (a.label < b.label) return -1;
          if (a.label > b.label) return 1;
          return 0;
        });
        
        this.zone = this.zones[0]; // set default ssid
      }).catch(e => {console.log("error fetching zones",e)})

      // this.$merakiSdk.MVSenseController.getDeviceCameraAnalyticsZones(
      //   this.device.serial
      // ).then(res => {
      //   this.zones = res;
      //   this.zone = this.zones[0]; // set default ssid
      // });
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