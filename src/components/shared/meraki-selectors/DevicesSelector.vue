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
      <template v-slot:prepend-item>
        <v-list-tile ripple @click="toggle">
          <v-list-tile-action>
            <v-icon>done_all</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Select All</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider class="mt-2"></v-divider>
      </template>
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
  mounted: function() {
    this.modelSelected = this.model;
    this.fetchDevices();
  },
  methods: {
    fetchDevices() {
      this.devices = [];
      this.$merakiSdk.DevicesController.getNetworkDevices(this.net.id).then(
        res => {
          this.devices = res;
          this.devicesSelected = []; //this.filteredDevices; // set default ssid
        }
      );
    },
    toggle() {
      this.$nextTick(() => {
        if (this.devicesSelected.length === this.filteredDevices.length) {
          this.devicesSelected = [];
        } else {
          this.devicesSelected = this.filteredDevices.slice();
        }
      });
    }
  },
  watch: {
    devicesSelected() {
      //this.$store.commit("setDevices", this.devicesSelected); // set state
      this.$emit("onChange", { devices: this.devicesSelected });
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

<style>
.small-chips {
  font-size: xx-small;
}

.v-list__tile__action,
.v-list__tile__avatar {
  display: flex;
  justify-content: flex-start;
  min-width: 32px !important;
}
</style>