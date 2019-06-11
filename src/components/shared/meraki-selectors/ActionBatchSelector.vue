<template id="action-batch-selector">
  <div>
    <v-select
      v-bind:items="actionBatches"
      item-text="id"
      item-value="id"
      return-object
      v-model="form.actionBatch"
      label="Action Batch"
      autofocus
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#action-batch-selector",
  props: ["label", "description"],
  computed: {},
  created: function() {
    this.fetchActionBatches();
  },
  data() {
    return {
      //client: {},
      actionBatches: [],
      form: {
        actionBatch: {}
      }
    };
  },
  methods: {
    async fetchActionBatches() {
      this.actionBatches = [];
      if (!this.org) {
        return;
      }
      const api = await this.$merakiSdk.ActionBatchesController.getOrganizationActionBatches(
        {
          organizationId: this.org.id
        }
      )
        .then(res => {
          this.actionBatches = res;
        })
        .catch(e => console.log(e));
    }
  },
  watch: {
    "form.actionBatch"() {
      this.$emit("onChange", {
        actionBatch: this.form.actionBatch
      });
    },
    net() {
      this.fetchActionBatches();
    }
  }
});
</script>

<style scoped>
</style>