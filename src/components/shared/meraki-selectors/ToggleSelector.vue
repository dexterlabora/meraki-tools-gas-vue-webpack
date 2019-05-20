<template id="toggle-selector">
  <div>
    <v-switch v-model="form.toggle" :label="label" @change="onToggle">
      <!--
      <template v-slot:append>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon color="grey lighten-1" v-on="on">info</v-icon>
          </template>
          {{description}}
        </v-tooltip>
      </template>
      -->
    </v-switch>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#toggle-selector",
  //props: ["label", "description", "param: "],
  props: {
    label: String,
    description: String,
    param: String
  },
  data() {
    return {
      form: {
        toggle: false
      }
    };
  },
  methods: {
    onToggle() {
      let toggleEvent = {};
      toggleEvent[this.param] = this.form.toggle;
      console.log("toggleEvent[param] ", toggleEvent[this.param]);
      this.$emit("onChange", toggleEvent);
    }
  }
});
</script>

<style scoped>
</style>