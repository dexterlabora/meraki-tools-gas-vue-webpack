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
      class="small"
    >
      <template v-slot:prepend-item>
        <v-list-item ripple @click="toggle">
          <v-list-item-action>
            <v-icon>done_all</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Select All</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2"></v-divider>
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
      if (!this.org) {
        return;
      }
      const options = {
        method: "get",
        url: `/organizations/${this.org.id}/networks`,
      };
      this.$rh.request(options).then((res) => {
        this.networks = res;
        this.networksSelected = []; // set default
      });
    },
    toggle() {
      this.$nextTick(() => {
        if (this.networksSelected.length === this.networks.length) {
          this.networksSelected = [];
        } else {
          this.networksSelected = this.networks.slice();
        }
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

<style>
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