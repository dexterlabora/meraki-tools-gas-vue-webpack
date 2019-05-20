<template id="networks-selector">
  <div>
    <v-select
      :items="networks"
      v-model="networksSelected"
      label="Networks"
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
        >(+{{ networksSelected.length - 1 }} others)</span>
      </template>
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#networks-selector",
  props: ["label", "description"],
  data() {
    return {
      networksSelected: [],
      networks: []
    };
  },
  computed: {
    org: function() {
      return this.$store.state.org;
    }
  },
  mounted: function() {
    this.fetchNetworks();
  },
  methods: {
    fetchNetworks() {
      this.devices = [];
      this.$merakiSdk.NetworksController.getOrganizationNetworks({
        organizationId: this.org.id
      }).then(res => {
        this.networks = res;
        this.networksSelected = []; // set default
      });
    }
  },
  watch: {
    networksSelected() {
      //this.$store.commit("setDevices", this.devicesSelected); // set state
      this.$emit("onChange", { networks: this.networksSelected });
    },
    org: function() {
      this.networksSelected = [];
      this.fetchNetworks();
    }
  }
});
</script>

<style scoped>
.small-chips {
  font-size: xx-small;
}
</style>