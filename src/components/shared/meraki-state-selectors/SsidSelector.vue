<template id="ssid-selector">
  <div>
    <v-select
      v-bind:items="ssids"
      item-text="name"
      item-value="number"
      return-object
      v-model="ssid"
      label="SSID"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#ssid-selector",
  computed: {
    net: function() {
      return this.$store.state.net;
    }
  },
  created: function() {
    this.fetchSsids();
  },
  data() {
    return {
      ssid: {},
      ssids: []
    };
  },
  methods: {
    fetchSsids() {
      this.$merakiSdk.SsidsController.getNetwork_ssids(this.net.id).then(
        res => {
          this.ssids = res;
          this.ssid = this.ssids[0]; // set default ssid
        }
      );
    }
  },
  watch: {
    ssid() {
      this.$store.commit("setSsid", this.ssid);
    },
    net() {
      this.fetchSsids();
    }
  }
});
</script>

<style scoped>
</style>