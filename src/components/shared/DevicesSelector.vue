<template id="devices-selector">
  <v-select
    :items="devices"
    v-model="devicesSelected"
    label="Devices"
    item-text="name"
    :menu-props="{ maxHeight: '400' }"
    return-object
    chips
    multiple
    clearable
  >
    <template slot="selection" slot-scope="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item.name }}</span>
      </v-chip>
      <span v-if="index === 1" class="grey--text caption">(+{{ devicesSelected.length - 1 }} others)</span>
    </template>
  </v-select>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#devices-selector",
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
      devicesSelected: {},
      devices: []
    };
  },
  methods: {
    fetchDevices() {
      this.$meraki.getNetworkDevices({ networkId: this.net.id }).then(res => {
        this.devices = res.data;
        this.devicesSelected = this.devices; // set default ssid
      });
    }
  },
  watch: {
    devicesSelected() {
      this.$store.commit("setDevice", this.devicesSelected); // set state
    },
    net: function() {
      this.fetchDevices();
    }
  }
});
</script>

<style scoped>
</style>