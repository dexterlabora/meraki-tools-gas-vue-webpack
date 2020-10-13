<template id="ssid-selector">
  <div>
    <v-select
      v-bind:items="ssids"
      item-text="name"
      item-value="number"
      return-object
      v-model="form.ssid"
      label="SSID"
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
      const options = {
        method: "get",
        url: `/networks/${this.net.id}/wireless/ssids`,
      };
      this.$rh.request(options)
      .then(res => {
       
        // order and save the networks
        this.ssids = res.sort(function(a, b) {
          if (a.number < b.number) return -1;
          if (a.number > b.number) return 1;
          return 0;
        });
        
        //this.vlan = this.vlans[0]; // set default ssid
      }).catch(e => {console.log("error fetching ssids",e)})


      // this.$merakiSdk.SsidsController.getNetwork_ssids(this.net.id).then(
      //   res => {
      //     this.ssids = res;
      //     this.form.ssid = this.ssids[0]; // set default ssid
      //   }
      // );
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