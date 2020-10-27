<template id="vlan-selector">
  <div>
    <v-select
      :loading="loading"
      v-bind:items="vlans"
      return-object
      v-model="form.vlan"
      label="VLANs"
      @change="onChange"
    >
      <template slot="selection" slot-scope="data"
        >{{ data.item.id }} -- {{ data.item.subnet }} --
        {{ data.item.name }}</template
      >
      <template slot="item" slot-scope="data"
        >{{ data.item.id }} -- {{ data.item.subnet }} --
        {{ data.item.name }}</template
      >
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#vlan-selector",

  computed: {
    net: function () {
      return this.$store.state.net;
    },
  },
  created: function () {
    this.fetchVlans();
  },
  data() {
    return {
      loading: false,
      form: {
        vlan: {
          id: "",
          name: "",
          subnet: "",
        },
      },
      vlans: [],
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
      this.loading = true;
      this.$rh
        .request(options)
        .then((res) => {
          this.loading = false;
          // order and save the networks
          this.vlans = res.sort(function (a, b) {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });

          //this.vlan = this.vlans[0]; // set default ssid
        })
        .catch((e) => {
          this.loading = false;
          console.log("error fetching zones", e);
        });

      // this.$merakiSdk.VlansController.getNetwork_vlans(this.net.id)
      //   .then(res => (this.vlans = res))
      //   .catch(e => console.log(e));
    },
    onChange() {
      this.$emit("onChange", { vlan: this.form.vlan });
    },
  },
  watch: {
    vlans() {
      //this.$store.commit("setVlans", this.vlans);
    },
    net() {
      this.fetchVlans();
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

.v-select__selection--comma {
    margin: 7px 4px 7px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: small;
}

.v-list-item {
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 48px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: x-small;
}
</style>