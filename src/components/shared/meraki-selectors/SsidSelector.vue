<template id="ssid-selector">
  <div>
    <v-select
      v-bind:items="ssids"
      item-text="name"
      item-value="number"
      return-object
      v-model="form.ssid"
      label="SSID"
      autofocus
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#ssid-selector",
  props: ["label", "description"],
  computed: {
    net: function() {
      return this.$store.state.net;
    }
  },
  mounted: function() {
    this.fetchSsids();
  },
  data() {
    return {
      //ssid: {},
      ssids: [],
      form: {
        ssid: {}
      }
    };
  },
  methods: {
    fetchSsids() {
      if (!this.net) {
        return;
      }
      this.$merakiSdk.SsidsController.getNetwork_ssids(this.net.id).then(
        res => {
          this.ssids = res;
          this.form.ssid = this.ssids[0]; // set default ssid
        }
      );
    },
    onChange: function() {
      //this.$store.commit("setInput", this.form.input);
      this.$emit("onChange", { ssid: this.form.ssid });
    }
  },
  watch: {
    "form.ssid"() {
      //this.$store.commit("setSsid", this.ssid);
      this.onChange();
    },
    net() {
      this.fetchSsids();
    }
  }
});
</script>

<style scoped>
</style>