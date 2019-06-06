<template>
  <div>
    <!--link rel="stylesheet" href="/public/fonts/materialIcons.css" /-->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
    >
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
    >
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons">
    <!-- Vuetify is not being directly imported via require, and using stylus -->
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
    <div id="app">
      <v-app>
        <v-content class="font-weight-light">
          <v-container class="pa-1">
            <nav-menu></nav-menu>
            <org-selector></org-selector>
            <net-selector></net-selector>
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
import OrgSelector from "./components/shared/OrgSelector.vue";
import NetSelector from "./components/shared/NetSelector.vue";
import Snackbar from "./components/shared/Snackbar.vue";
import "vuetify/dist/vuetify.min.css";

export default {
  name: "App",
  components: {
    "nav-menu": NavMenu,
    "org-selector": OrgSelector,
    "net-selector": NetSelector,
    snackbar: Snackbar
  }
};
</script>
<style>
.tight {
  padding: 1px !important;
}
.v-list__tile__action,
.v-list__tile__avatar {
  display: flex;
  justify-content: flex-start;
  min-width: 32px !important;
}
</style>
