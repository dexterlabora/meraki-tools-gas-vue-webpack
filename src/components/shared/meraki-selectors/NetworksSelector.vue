<template id="networks-selector">
  <div>
    <v-combobox
      :items="networks"
      :filter="customFilter"
      v-model="networksSelected"
      label="Networks"
      :item-text="
        (item) =>
          `${item.name} - ${JSON.stringify(item.tags)} \n ${
            item.organizationId
          } `
      "
      key="id"
      return-object
      small-chips
      multiple
      ref="comboboxNetworks"
      clearable
      dense
      class="small"
    >
      <template v-slot:prepend-item>
        <v-list-item dense ripple @click="onSelectAll">
          <v-list-item-action>
            <v-icon>done_all</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              >Select All
              <span class="grey--text caption"
                >({{ networksSelected.length }})</span
              ></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item dense class="pb-0" v-show="showMultiOrg">
          <v-checkbox
            v-model="includeAllOrgs"
            @change="onMultiOrgToggle"
            label="Multi-Org Search"
          ></v-checkbox>
        </v-list-item>

        <v-divider></v-divider>
      </template>

      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <!--                     <v-list-item-avatar>
                      avatar
                    </v-list-item-avatar> -->
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>

            <v-list-item-subtitle>
              <v-chip disabled small v-for="i in data.item.tags" :key="i.id">{{
                i
              }}</v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Net ID: {{ data.item.id }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Org ID: {{ data.item.organizationId }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>

      <template slot="selection" slot-scope="{ item, index }">
        <v-chip small v-if="index === 0">
          <span class="small-chips">{{ item.name }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text caption"
          >(+{{ networksSelected.length - 1 }} others)</span
        >
      </template>
    </v-combobox>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#networks-selector",
  props: ["label", "description", "showMultiOrg"],
  props: {
    label: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    showMultiOrg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      networksSelected: [],
      networks: [],
      filteredNetworks: [],
      includeAllOrgs: false,
      searchInput: "",
    };
  },
  computed: {
    org: function () {
      return this.$store.state.org;
    },
    orgs: function () {
      return this.$store.state.orgs;
    },
  },
  mounted: function () {
    this.loadNetworks();
  },
 
  methods: {

    fetchNetworks(orgId) {
      if (!this.org) {
        return;
      }
      const options = {
        method: "get",
        url: `/organizations/${orgId}/networks`,
      };
      console.log("selector fetch networks options", options);
      return this.$rh.request(options);
    },
    loadNetworks() {
      // this.$nextTick(() => {
      if (this.includeAllOrgs) {
        this.orgs.forEach((org) => {
          //       console.log("fetching networks for org", org.name, org.id);
          this.fetchNetworks(org.id).then((nets) => {
            this.networks = [...this.networks, ...nets];
            this.networks = this.networks.sort(function (a, b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            });
          });
        });
      } else {
        this.fetchNetworks(this.org.id).then((nets) => {
          this.networks = nets;
          this.networks = this.networks.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
        });
      }

      this.networksSelected = []; // set default
     
    },
    onMultiOrgToggle() {
      this.loadNetworks();
    },
    customFilter(item, queryText, itemText) {
      // things to search for
      const searchParams = [
        item.name.toLowerCase(), // network name
        JSON.stringify(item.tags).toLowerCase(), // network tags
        item.organizationId.toLowerCase(), // organization ID
        item.id.toLowerCase(), // Network ID
      ];

      // what the user has typed
      const searchText = queryText.toLowerCase();

      // search
      var results;
      for (let p of searchParams) {
        results = results || p.indexOf(searchText) > -1;
      }

      return results;
    },
    onSelectAll() {
      // update selection items
      this.$nextTick(() => {
        // clear
        if (this.networksSelected.length === this.networks.length) {
          this.networksSelected = [];
        } else {
          // add selection
          if (this.$refs.comboboxNetworks.computedItems.length > 0) {
            this.filteredNetworks = this.$refs.comboboxNetworks.computedItems;
            this.networksSelected = [...[], ...this.filteredNetworks];
            //console.log("networks selector this.networksSelected", this.networksSelected)
          } else {
            //  console.log("networks selector empty", this.networksSelected)

            this.filteredNetworks = this.networks.slice();
            this.networksSelected = this.filteredNetworks;
          }
        }
      });
    },
  },
  watch: {
    networksSelected() {
      //this.$store.commit("setDevices", this.devicesSelected); // set state
      console.log(
        "WATCH networksSelected this.networksSelected",
        this.networksSelected
      );
      this.$refs.comboboxNetworks.internalSearch = "";
      this.$emit("onChange", { networks: this.networksSelected });
    },
    org: function () {
      this.networksSelected = [];
      this.fetchNetworks();
    },
  },
});
</script>

<style>
.small-chips {
  font-size: xx-small;
}

.list--dense.fix .list__tile__title {
  height: 20px;
}

.list__tile__title {
  /* background: #efefef; */
}

.closer .list__tile .avatar,
.closer .list__tile__action {
  min-width: 24px;
}

.v-list__item__action,
.v-list__item__avatar {
  display: flex;
  justify-content: flex-start;
  min-width: 32px !important;
}
.v-list-item .v-list-item__subtitle,
.v-list-item .v-list-item__title {
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