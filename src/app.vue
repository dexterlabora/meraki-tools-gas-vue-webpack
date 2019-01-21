<template>
  <div>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
    >
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons">
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
    <div id="app">
      <v-app>
        <v-content>
          <v-container>
            <nav-menu></nav-menu>

            <org-selector></org-selector>
            <net-selector></net-selector>
            <!--
            <v-dialog v-model="loading" max-width hide-overlay>
              <v-progress-linear indeterminate color="green" class="mb-0"></v-progress-linear>
            </v-dialog>
            -->
            <router-view></router-view>
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

export default {
  name: "App",
  components: {
    "nav-menu": NavMenu,
    "org-selector": OrgSelector,
    "net-selector": NetSelector
  },
  data() {
    return {
      //
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  mounted() {
    //this.$router.push("/home");
  }
};
</script>
<style>
</style>
