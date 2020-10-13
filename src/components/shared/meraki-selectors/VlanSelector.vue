<template id="vlan-selector">
  <div>
    <v-select
      v-bind:items="vlans"
      return-object
      v-model="form.vlan"
      label="VLANs"
      @change="onChange"
    >
      <template
        slot="selection"
        slot-scope="data"
      >{{ data.item.id }} -- {{data.item.subnet}} -- {{data.item.name}}</template>
      <template
        slot="item"
        slot-scope="data"
      >{{ data.item.id }} -- {{data.item.subnet}} -- {{data.item.name}}</template>
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#vlan-selector",

  computed: {
    net: function() {
      return this.$store.state.net;
    }
  },
  created: function() {
    this.fetchVlans();
  },
  data() {
    return {
      form: {
        vlan: {
          id: "",
          name: "",
          subnet: ""
        }
      },
      vlans: []
    };
  },
  methods: {
    fetchVlans() {
      this.form.vlan = {};
      this.vlans = [];
      if (!this.net.id) {
        return;
      }
    const options = {
        method: "get",
        url: `/networks/${this.net.id}/appliance/vlans`,
      };
      this.$rh.request(options)
      .then(res => {
        // order and save the networks
        this.vlans = res.sort(function(a, b) {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
        
        //this.vlan = this.vlans[0]; // set default ssid
      }).catch(e => {console.log("error fetching zones",e)})

      // this.$merakiSdk.VlansController.getNetwork_vlans(this.net.id)
      //   .then(res => (this.vlans = res))
      //   .catch(e => console.log(e));
    },
    onChange() {
      this.$emit("onChange", { vlan: this.form.vlan });
    }
  },
  watch: {
    vlans() {
      //this.$store.commit("setVlans", this.vlans);
    },
    net() {
      this.fetchVlans();
    }
  }
});
</script>

<style scoped>
</style>