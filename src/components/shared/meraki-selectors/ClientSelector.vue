<template id="client-selector">
  <div>
    <v-select
      :loading="loading"
      v-bind:items="clients"
      item-text="description"
      item-value="mac"
      return-object
      v-model="form.client"
      label="Client"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#client-selector",
  props: ["label", "description"],
  computed: {
    devices: function () {
      return this.$store.state.devices;
    },
    device: function () {
      return this.$store.state.device;
    },
    net: function () {
      return this.$store.state.net;
    },
    // timespan: function() {
    //   return this.$store.state.timespan;
    // }
  },
  created: function () {
    this.fetchClients();
  },
  data() {
    return {
      //client: {},
      loading: false,
      clients: [],
      form: {
        client: {},
      },
      timespan: 7200,
    };
  },
  methods: {
    fetchClients() {
      if (!this.net) {
        return;
      }
      this.clients = [];
      const options = {
        method: "get",
        url: `/networks/${this.net.id}/clients`,
      };
      this.loading = true;
      this.$rh
        .request(options)
        .then((res) => {
          this.loading = false;
          // order and save the networks
          this.clients = res.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
        })
        .catch((e) => {
          this.loading = false;
          console.log("error fetching clients", e);
        });
    },
    //   const api = await this.$merakiSdk.ClientsController.getNetworkClients({
    //     networkId: this.net.id,
    //     timespan: this.timespan
    //   })
    //     .then(res => {
    //       this.clients = res;
    //     })
    //     .catch(e => console.log(e));

    //   const sortedClients = this.clients.sort(function(a, b) {
    //     if (a.description < b.description) return -1;
    //     if (a.description > b.description) return 1;
    //     return 0;
    //   });
    //   this.$store.commit("setClients", sortedClients);
    // }
  },
  watch: {
    "form.client"() {
      //this.$store.commit("setClient", this.client);
      this.$emit("onChange", {
        client: this.form.client,
      });
    },
    net() {
      this.fetchClients();
    },
  },
});
</script>

<style scoped>
</style>