<template id="devices-selector">
  <div>
    <v-select
      v-if="!model"
      :items="models"
      v-model="modelSelected"
      label="Model"
      class="input-group--focused"
      single-line
      autofocus
    ></v-select>
    <v-select
      :items="filteredDevices"
      v-model="devicesSelected"
      label="Devices"
      item-text="name"
      :menu-props="{ maxHeight: '400' }"
      return-object
      small-chips
      multiple
      clearable
      autofocus
    >
      <template slot="selection" slot-scope="{ item, index }">
        <v-chip small v-if="index === 0">
          <span class="small-chips">{{ item.name }}</span>
        </v-chip>
        <span
          v-if="index === 1"
          class="grey--text caption"
        >(+{{ devicesSelected.length - 1 }} others)</span>
      </template>
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#devices-selector",
  props: ["model"],
  data() {
    return {
      devicesSelected: [],
      modelSelected: {},
      devices: [],
      models: ["MX", "MR", "MS", "MV"]
    };
  },
  computed: {
    net: function() {
      return this.$store.state.net;
    },
    /*
    devices: function() {
      return this.$store.state.devices;
    },
    */
    filteredDevices() {
      return this.devices.filter(d => d.model.includes(this.modelSelected));
    }
  },
  created: function() {
    this.modelSelected = this.model;
    this.fetchDevices();
  },
  methods: {
    fetchDevices() {
      this.devices = [];
      this.$merakiSdk.DevicesController.getNetworkDevices(this.net.id).then(
        res => {
          this.devices = res;
          this.devicesSelected = this.filteredDevices; // set default ssid
        }
      );
    }
  },
  watch: {
    devicesSelected() {
      this.$store.commit("setDevices", this.devicesSelected); // set state
    },
    modelSelected() {
      this.devicesSelected = [];
      this.devicesSelected = this.filteredDevices;
    },
    net: function() {
      this.devicesSelected = [];
      this.fetchDevices();
    }
  }
});
</script>

<style scoped>
.small-chips {
  font-size: xx-small;
}
</style>