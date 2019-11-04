<template id="model-selector">
  <div>
    <v-select v-bind:items="models" v-model="form.model" label="Device Model (optional)" clearable></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#model-selector",
  computed: {
    model: function() {
      return this.$store.state.model;
    }
  },
  data() {
    return {
      form: {
        model: ""
      },
      models: ["MX", "MR", "MS"]
    };
  },
  methods: {},
  watch: {
    "form.model"() {
      //this.$store.commit("setModel", this.form.model);
      this.$emit("onChange", { model: this.form.model });
    }
  }
});
</script>

<style scoped>
</style>