<template id="switch-port-selector">
  <div>
    <v-select v-bind:items="ports" return-object v-model="port" autofocus label="Ports">
      <template
        slot="selection"
        slot-scope="data"
      >{{ data.item.number }} | {{data.item.type}} | VLAN {{data.item.vlan}} -- {{ data.item.name }}</template>
      <template
        slot="item"
        slot-scope="data"
      >{{ data.item.number }} | {{data.item.type}} | VLAN {{data.item.vlan}} -- {{ data.item.name }}</template>
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#switch-port-selector",

  computed: {
    switchPorts: function() {
      return this.$store.state.switchPorts;
    },
    switchPort: function() {
      return this.$store.state.switchPort;
    },
    device: function() {
      return this.$store.state.device;
    },
    net: function() {
      return this.$store.state.net;
    }
  },
  created: function() {
    this.fetchSwitchPorts();
  },
  data() {
    return {
      port: {},
      ports: []
    };
  },
  methods: {
    fetchSwitchPorts() {
      this.port = {};
      this.ports = [];
      if (!this.device.serial) {
        return;
      }
      if (!this.device.model.includes("MS")) {
        return;
      }
      this.$merakiSdk.SwitchPortsController.getDeviceSwitchPorts(
        this.device.serial
      )
        .then(res => (this.ports = res))
        .catch(e => console.log(e));
    }
  },
  watch: {
    port() {
      this.$store.commit("setSwitchPort", this.port);
    },
    ports() {
      this.$store.commit("setSwitchPorts", this.ports);
    },
    device() {
      this.fetchSwitchPorts();
    }
  }
});
</script>

<style scoped>
</style>