<template id="input-selector">
  <v-card>
    <v-card-text>
      <v-text-field :label="label" v-model="form.input" @change="updateInput"></v-text-field>
    </v-card-text>
  </v-card>
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
