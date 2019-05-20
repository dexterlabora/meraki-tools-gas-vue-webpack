<template id="method-selector">
  <div>
    <v-select v-bind:items="methods" v-model="form.method" autofocus label="REST Method" clearable></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#method-selector",
  computed: {
    method: function() {
      return this.$store.state.method;
    }
  },
  data() {
    return {
      form: {
        method: undefined
      },
      methods: ["GET", "PUT", "POST", "DELETE"]
    };
  },
  methods: {},
  watch: {
    "form.method"() {
      //this.$store.commit("setMethod", this.form.method);
      this.$emit("onChange", { method: this.form.method });
    }
  }
});
</script>

<style scoped>
</style>