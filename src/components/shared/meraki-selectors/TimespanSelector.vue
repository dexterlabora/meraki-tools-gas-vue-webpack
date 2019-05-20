<template id="timespan-selector">
  <div>
    <v-select
      v-bind:items="times"
      item-text="name"
      item-value="time"
      v-model="time"
      label="Timespan"
      autofocus
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#device-selector",
  props: ["label", "description"],
  computed: {
    timespan: function() {
      return this.$store.state.timespan;
    },
    t0: function() {
      let time = this.t1 - this.timespan;
      return time;
    },
    t1: function() {
      let date = new Date();
      let time = date.getTime();
      return time;
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
      //this.$store.commit("setTimespan", this.time);
      //this.$store.commit("setT0", this.t0);
      //this.$store.commit("setT1", this.t1);
      this.$emit("onChange", { timespan: this.time });
    }
  },
  mounted() {
    this.time = this.timespan || 7200;
  }
});
</script>

<style scoped>
</style>