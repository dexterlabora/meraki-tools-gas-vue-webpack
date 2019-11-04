<template id="organizations-selector">
  <div>
    <v-select
      :items="organizations"
      v-model="organizationsSelected"
      label="Organizations"
      item-text="name"
      :menu-props="{ maxHeight: '400'}"
      return-object
      small-chips
      multiple
      clearable
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
      </template>
      <template slot="selection" slot-scope="{ item, index }">
        <v-chip small v-if="index === 0">
          <span class="small-chips">{{ item.name }}</span>
        </v-chip>
        <span
          v-if="index === 1"
          class="grey--text caption"
        >(+{{ organizationsSelected.length - 1 }} others)</span>
      </template>
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#organizations-selector",
  props: ["label", "description"],
  data() {
    return {
      organizationsSelected: [],
      organizations: []
    };
  },
  computed: {
    apiKey: function() {
      return this.$store.state.apiKey;
    }
  },
  mounted: function() {
    this.fetchOrganizations();
  },
  methods: {
    fetchOrganizations() {
      this.devices = [];
      this.$merakiSdk.OrganizationsController.getOrganizations().then(res => {
        this.organizations = res;
        this.organizationsSelected = []; // set default
      });
    },
    toggle() {
      this.$nextTick(() => {
        if (this.organizationsSelected.length === this.organizations.length) {
          this.organizationsSelected = [];
        } else {
          this.organizationsSelected = this.organizations.slice();
        }
      });
    }
  },
  watch: {
    organizationsSelected() {
      //this.$store.commit("setDevices", this.devicesSelected); // set state
      this.$emit("onChange", { organizations: this.organizationsSelected });
    },
    apiKey: function() {
      this.organizationsSelected = [];
      this.fetchOrganizations();
    }
  }
});
</script>

<style >
.small-chips {
  font-size: xx-small;
}
</style>