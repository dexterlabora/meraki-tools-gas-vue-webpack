<template id="switch-port-selector">
  <div>
    <v-select
      v-bind:items="ports"
      return-object
      v-model="form.port"
      label="Ports"
      @change="onChange"
    >
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
  //props: ["label", "description", "device"],
  props: {
    device: {
      serial: ""
    }
  },
  computed: {
    /*
    switchPorts: function() {
      return this.$store.state.switchPorts;
    },
    switchPort: function() {
      return this.$store.state.switchPort;
    },
    device: function() {
      return this.$store.state.device;
    },
    */
    net: function() {
      return this.$store.state.net;
    }
  },
  created: function() {
    this.fetchSwitchPorts();
  },
  data() {
    return {
      form: {
        port: {
          serial: "",
          number: "",
          type: "",
          vlan: "",
          name: ""
        }
      },
      ports: []
    };
  },
  methods: {
    fetchSwitchPorts() {
      this.form.port = {};
      this.ports = [];
      if (!this.device) {
        return;
      }
      if (!this.device) {
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
    },
    onChange() {
      this.$emit("onChange", { switchPort: this.form.port });
    }
  },
  watch: {
    ports() {
      //this.$store.commit("setSwitchPorts", this.ports);
    },
    net() {
      this.fetchSwitchPorts();
    },
    device() {
      this.fetchSwitchPorts();
    }
  }
});
</script>

<style scoped>
</style>