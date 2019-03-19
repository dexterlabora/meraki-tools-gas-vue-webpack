<template id="method-selector">
  <div>
    <v-select v-bind:items="methods" v-model="form.method" label="REST Method" clearable></v-select>
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
        method: ""
      },
      methods: ["GET", "PUT", "POST", "DELETE"]
    };
  },
  methods: {},
  watch: {
    "form.method"() {
      this.$store.commit("setMethod", this.form.method);
    }
  },
  mounted() {
    this.time = this.timespan;
  }
});
</script>

<style scoped>
</style>