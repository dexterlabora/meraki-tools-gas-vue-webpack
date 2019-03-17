<template id="nav-menu">
  <v-toolbar dense color="green darken-1" dark>
    <v-btn icon to="/home">
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn icon to="/reports">
      <v-icon>view_list</v-icon>
    </v-btn>

    <v-btn icon to="/reports-auto" v-if="beta">
      <v-icon>stars</v-icon>
    </v-btn>

    <v-btn icon to="/tools">
      <v-icon>build</v-icon>
    </v-btn>
    <!--v-btn icon to="/swagger">
      <v-icon>info</v-icon>
    </v-btn-->
    <v-spacer></v-spacer>
    <v-btn icon to="/settings">
      <v-icon>lock</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#nav-menu",
  data() {
    return {};
  },
  computed: {
    beta: function() {
      return this.$store.state.beta;
    }
  },

  methods: {}
});
</script>
