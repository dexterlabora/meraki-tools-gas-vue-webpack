<template id="input-selector">
  <div>
    <!--
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>info</v-icon>
        </v-btn>
      </template>
      <span>{{description}}</span>
    </v-tooltip>
    -->

    <v-text-field
      :label="label"
      :description="description"
      v-model="form.input"
      @change="updateInput"
    >
      <template v-slot:append>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon color="grey lighten-1" v-on="on">info</v-icon>
          </template>
          {{description}}
        </v-tooltip>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#input-selector",
  props: ["label", "description"],
  data() {
    return {
      form: {
        input: ""
      }
    };
  },
  computed: {
    apiUrl: function() {
      return this.$store.state.input;
    }
  },
  mounted: function() {
    this.form.input = this.input;
  },
  methods: {
    updateInput: function() {
      //this.$store.commit("setInput", this.form.input);
      let data = {};
      data[this.label] = this.form.input;
      this.$emit("onChange", data);
    }
  }
});
</script>
