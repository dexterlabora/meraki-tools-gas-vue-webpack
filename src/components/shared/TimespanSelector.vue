<template id="timespan-selector">
  <div>
    <v-select
      v-bind:items="times"
      item-text="name"
      item-value="time"
      v-model="time"
      label="Timespan"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#device-selector",
  computed: {
    timespan: function() {
      return this.$store.state.timespan;
    }
  },
  data() {
    return {
      time: "",
      times: [
        {
          name: "2 hours",
          time: 7200
        },
        {
          name: "12 hours",
          time: 43200
        },
        {
          name: "1 day",
          time: 86400
        },
        {
          name: "1 week",
          time: 604800
        }
      ]
    };
  },
  methods: {},
  watch: {
    time() {
      this.$store.commit("setTimespan", this.time);
    }
  },
  mounted() {
    this.time = this.timespan;
  }
});
</script>

<style scoped>
</style>