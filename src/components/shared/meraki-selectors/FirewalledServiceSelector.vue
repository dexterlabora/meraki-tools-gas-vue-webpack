<template id="firewalled-service-selector">
  <div>
    <v-select v-bind:items="services" v-model="service" autofocus label="Firewalled Service"></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#firewalled-service-selector",
  data() {
    return {
      service: "",
      services: ["ICMP", "web", "SNMP"]
    };
  },
  methods: {},
  watch: {
    service() {
      //this.$store.commit("setFirewalledService", this.service);
      this.$emit("onChange", { firewalledService: this.service });
    }
  }
});
</script>

<style scoped>
</style>