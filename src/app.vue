<template>
  <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <!-- <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    
    <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet" />-->

    <!-- <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    -->

    <!-- <link href="https://cdn.jsdelivr.net/npm/vuetify@2/dist/vuetify.min.css" rel="stylesheet" />  -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vue-json-pretty@1.8.2/lib/styles.css">
    <div id="app">
      <v-app>
        <v-content class="font-weight-light">
          <v-container class="pa-1">
            <nav-menu class="mb-4"></nav-menu>

            <v-spacer></v-spacer>
            <org-selector></org-selector>
            <net-selector></net-selector>
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              color="green"
              v-if="loading"
            ></v-progress-linear>

            <router-view></router-view>
            <snackbar></snackbar>
          </v-container>
        </v-content>
      </v-app>
    </div>
  </div>
</template>

<script>
import NavMenu from "./nav-menu.vue";
import OrgSelector from "./components/shared/meraki-state-selectors/OrgSelector.vue";
import NetSelector from "./components/shared/meraki-state-selectors/NetSelector.vue";
import Snackbar from "./components/shared/Snackbar.vue";
//import "vuetify/dist/vuetify.min.css";
//import "./assets/vuetify/style.css"
import vuetify from "./plugins/vuetify";

export default {
  name: "App",
  components: {
    "nav-menu": NavMenu,
    "org-selector": OrgSelector,
    "net-selector": NetSelector,
    snackbar: Snackbar
  },
  computed: {
    loading: function() {
      return this.$store.state.loading;
    }
  }
};
</script>
<style scoped>
@import "/vuetify/lib";

.tight {
  padding: 1px !important;
}
.v-list__tile__action,
.v-list__tile__avatar {
  display: flex;
  justify-content: flex-start;
  min-width: 32px !important;
}
.v-btn {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
