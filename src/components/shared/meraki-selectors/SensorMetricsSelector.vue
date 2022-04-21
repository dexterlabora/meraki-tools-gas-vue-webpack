<template id="sensor-metric-selector">
  <div>
    
    <v-select
      :loading="loading"
      :items="metrics"
      v-model="form.input"
      label="Metrics"
      :menu-props="{ maxHeight: '400' }"
      item-value="type"
      small-chips
      
      multiple
      clearable
      class="small"
      dense
    >
     <!-- <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-icon color="grey lighten-1" v-on="on">info</v-icon>
      </template>
      {{ description }}
    </v-tooltip> -->
    </v-select>
  
   
    
  </div>
</template>

<script>
import * as rh from "../../../request-handler.js";
import Vue from "vue";
export default Vue.extend({
  template: "#sensor-metric-selector",
  props: ["label", "description","param"],
  data() {
    return {
      loading: false,
      form: {
        input: [],
      },
      metrics: [
        "temperature",
        "humidity",
        "water",
        "door",
        "tvoc",
        "pm25",
        "noise",
        "indoorAirQuality",
        "button",
        "battery",
      ],
    };
  },

  mounted: function () {
    //this.form.input = this.input;
  },
  watch: {
    "form.input"() {
      this.updateInput();
    }
  },
  methods: {
    updateInput: function () {
      // let event = {};
      // event[this.param] = this.form.input;
      console.log('metrics',this.form.input)
      this.$emit("onChange", { metrics: this.form.input });
    },
  },
});
</script>
