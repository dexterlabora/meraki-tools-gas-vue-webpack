<template id="nav-menu">
  <v-toolbar dense color="green darken-1">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" to="/home">
          <v-icon>home</v-icon>
        </v-btn>
      </template>
      <span>Home</span>
    </v-tooltip>
    <!-- Old version
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" to="/reports-old">
          <v-icon>view_list</v-icon>
        </v-btn>
      </template>
      <span>Meraki Reports</span>
    </v-tooltip>
    -->

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" to="/reports">
          <v-icon>view_list</v-icon>
        </v-btn>
      </template>
      <span>Reports dynamically created from the Meraki API.</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" to="/tools">
          <v-icon>build</v-icon>
        </v-btn>
      </template>
      <span>Tools to update a Meraki Network.</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" to="/json-to-sheet">
          <v-icon>code</v-icon>
        </v-btn>
      </template>
      <span>Print JSON data to Sheet.</span>
    </v-tooltip>
    <!--<v-btn @click="parseSwagger">SwaggerParserTest</v-btn> -->
    <!--<v-btn @click="onGenerateSwaggerReports">Generate Swagger Reports</v-btn>-->

    <!--v-btn icon to="/swagger">
      <v-icon>info</v-icon>
    </v-btn-->
    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" to="/settings">
          <v-icon>lock</v-icon>
        </v-btn>
      </template>
      <span>API Key and Settings</span>
    </v-tooltip>
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
