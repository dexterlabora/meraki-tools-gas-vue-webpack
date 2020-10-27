<template id="action-batch-selector">
  <div>
    <v-select
      :loading="loading"
      v-bind:items="actionBatches"
      item-text="id"
      item-value="id"
      return-object
      v-model="form.actionBatch"
      label="Action Batch"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#action-batch-selector",
  props: ["label", "description"],
  computed: {
    org() {
      return this.$store.state.org;
    },
  },
  created: function () {
    this.fetchActionBatches();
  },
  data() {
    return {
      loading: false,
      actionBatches: [],
      form: {
        actionBatch: {},
      },
    };
  },
  methods: {
    fetchActionBatches() {
      this.actionBatches = [];
      if (!this.org) {
        return;
      }
      const options = {
        method: "get",
        url: `/organizations/${this.org.id}/actionBatches`,
      };
      this.loading = true;
      this.$rh
        .request(options)
        .then((res) => {
          // order and save the networks
          this.actionBatches = res;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          console.log("error fetching actionBatches", e);
        });
      // const api = await this.$merakiSdk.ActionBatchesController.getOrganizationActionBatches(
      //   {
      //     organizationId: this.org.id
      //   }
      // )
      //   .then(res => {
      //     this.actionBatches = res;
      //   })
      //   .catch(e => console.log(e));
    },
  },
  watch: {
    "form.actionBatch"() {
      this.$emit("onChange", {
        actionBatch: this.form.actionBatch,
      });
    },
    net() {
      this.fetchActionBatches();
    },
  },
});
</script>

<style scoped>
</style>