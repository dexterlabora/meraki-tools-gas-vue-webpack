<template id="device-selector">
  <div>
    <v-select
      v-bind:items="filteredDevices"
      :loading="loading"
      return-object
      v-model="device"
      label="Devices"
      autofocus
    >
      <template slot="selection" slot-scope="{ item, index }">
        <v-chip v-if="index === 0">
          <span>{{ item.name || item.mac }} | {{ item.model }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text caption"
          >(+{{ value.length - 1 }} others)</span
        >
      </template>
      <template slot="item" slot-scope="data">
        <!-- HTML that describe how select should render items when the select is open -->
        {{ data.item.name || data.item.mac }} | {{ data.item.model }}
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
    net: function () {
      return this.$store.state.net;
    },
    deviceName: function () {
      return this.device.name + " - " + this.device.model;
    },
    filteredDevices: function () {
      if (this.model) {
        return this.devices.filter((d) => d.model.includes(this.model));
      } else {
        return this.devices;
      }
    },
  },
  created: function () {
    this.fetchDevices();
  },
  data() {
    return {
      device: {},
      devices: [],
    };
  },
  methods: {
    fetchDevices() {
      if (!this.net) {
        return;
      }
      const options = {
        method: "get",
        url: `/networks/${this.net.id}/devices`,
      };
      this.loading=true
      this.$rh
        .request(options)
        .then((res) => {
          this.loading=false;
          // order and save the networks
          this.devices = res.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })

          this.devicesSelected = []; // set default ssid
        })
        .catch((e) => {
          this.loading=false;
          console.log("error fetching devices", e);
        });

      // this.$merakiSdk.DevicesController.getNetworkDevices(this.net.id).then(
      //   res => {
      //     this.devices = res;
      //     this.device = this.devices[0]; // set default device
      //   }
      // );
    },
  },
  watch: {
    device() {
      //this.$store.commit("setDevice", this.device); // set state
      this.$emit("onChange", { device: this.device });
    },
    net: function () {
      this.fetchDevices();
    },
  },
});
</script>

<style >
.small-chips {
  font-size: xx-small;
}

.v-list__item__action,
.v-list__item__avatar {
  display: flex;
  justify-content: flex-start;
  min-width: 32px !important;
}
.v-list-item .v-list-item__subtitle, .v-list-item .v-list-item__title {
    line-height: 1.2;
    font-size: smaller;
}
.v-autocomplete {
  font-size: smaller;
}
.v-text-field .v-label {
  top: 0px !important;
}
.select__selections {
  padding-top: 2px !important;
}
</style>