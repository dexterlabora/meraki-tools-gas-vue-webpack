<template id="org-refresh-button">
  <div>
    <v-btn rounded color="blue" @click="fetchOrgs">Refresh Org List</v-btn>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#org-refresh-button",
  data() {
    return {};
  },
  methods: {
    fetchOrgs: function() {
      let orgs = [];
      const options = {
        method: "get",
        url: "/organizations",
      };
      this.$rh.request(options)
        .then((res) => {
        // order and save orgs
        orgs = res.sort(function(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.$store.commit("setOrgs", orgs);
      });
    }
  }
});
</script>
