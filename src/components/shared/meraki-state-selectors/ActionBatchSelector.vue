<template id="action-batch-selector">
  <div>
    <v-select
      v-bind:items="actionBatches"
      return-object
      v-model="actionBatch"
      label="Action Batches"
    >
      <template
        slot="selection"
        slot-scope="data"
      >{{ data.item.id }} -- Completed: {{data.item.status.completed}}</template>
      <template
        slot="item"
        slot-scope="data"
      >{{ data.item.id }} -- Completed: {{data.item.status.completed}}</template>
    </v-select>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  template: "#action-batch-selector",

  computed: {
    org: function() {
      return this.$store.state.org;
    }
  },
  created: function() {
    this.fetchActionBatches();
  },
  data() {
    return {
      actionBatch: {},
      actionBatches: []
    };
  },
  methods: {
    fetchActionBatches() {
      this.actionBatch = {};
      this.actionBatches = [];
      if (!this.org.id) {
        return;
      }

      this.$merakiSdk.ActionBatchesController.getOrganizationActionBatches(
        this.org.id
      )
        .then(res => (this.actionBatches = res))
        .catch(e => console.log(e));
    }
  },
  watch: {
    actionBatch() {
      this.$store.commit("setActionBatch", this.actionBatch);
    },
    actionBatches() {
      this.$store.commit("setActionBatches", this.actionBatches);
    },
    org() {
      this.fetchActionBatches();
    }
  }
});
</script>

<style scoped>
</style>