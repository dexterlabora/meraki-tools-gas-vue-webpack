<template id="timespan-selector">
  <div>
    <v-select
      v-bind:items="filteredTimes"
      item-text="name"
      item-value="time"
      v-model="form.time"
      label="Timespan"
      autofocus
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#device-selector",
  props: ["label", "description", "min", "max"],
  computed: {
    t0() {
      let time = this.t1 - this.timespan;
      return time;
    },
    t1() {
      let date = new Date();
      let time = date.getTime();
      return time;
    },
    filteredTimes() {
      if (this.min != undefined && this.max != undefined) {
        return this.times.filter(t => t.time >= this.min && t.time <= this.max);
      }
      if (this.min != undefined) {
        return this.times.filter(t => t.time >= this.min);
      }
      if (this.max != undefined) {
        return this.times.filter(t => t.time <= this.max);
      }
      return this.times;
    }
  },
  data() {
    return {
      form: {
        time: ""
      },
      timespan: 0,
      times: [
        {
          name: "2 minutes",
          time: 120
        },
        {
          name: "5 minutes",
          time: 300
        },
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
    this.time = this.timespan;
  }
});
</script>

<style scoped>
</style>