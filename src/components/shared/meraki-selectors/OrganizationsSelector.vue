<template id="organizations-selector">
  <div>
    <v-select
      :items="organizations"
      v-model="organizationsSelected"
      label="Organizations"
      item-text="name"
      :menu-props="{ maxHeight: '400' }"
      return-object
      small-chips
      multiple
      clearable
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
      </template>
      <template slot="selection" slot-scope="{ item, index }">
        <v-chip small v-if="index === 0">
          <span class="small-chips">{{ item.name }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text caption"
          >(+{{ organizationsSelected.length - 1 }} others)</span
        >
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
      loading: false,
      organizationsSelected: [],
      organizations: [],
    };
  },
  computed: {
    apiKey: function () {
      return this.$store.state.apiKey;
    },
  },
  mounted: function () {
    this.fetchOrganizations();
  },
  methods: {
    fetchOrganizations() {
      this.organizations = [];

      const options = {
        method: "get",
        url: "/organizations",
      };
      this.loading=true;
      this.$rh.request(options).then((res) => {
        this.loading=false;
        console.log("getOrganizations res", res);
        // order and save orgs
        if (!res) {
          console.log("no data", res);
        }
        this.organizations = res.sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      
      }).catch((e)=>{
        this.loading=false;
        console.log("error fetching orgs",e)
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
    },
  },
  watch: {
    organizationsSelected() {
      //this.$store.commit("setDevices", this.devicesSelected); // set state
      this.$emit("onChange", { organizations: this.organizationsSelected });
    },
    apiKey: function () {
      this.organizationsSelected = [];
      this.fetchOrganizations();
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
</style>