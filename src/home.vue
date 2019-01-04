<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-btn @click="onOrgs">orgs</v-btn>
      </v-flex>
      <v-flex xs12>
        <ul>
          <li v-for="org in orgs" :key="org.id">ID: {{org.id}} - Name {{org.name}}</li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

/**
 * Wrapping the export in Vue.extend() gives you TypeScript IntelliSense about the Vue component inside its functions.
 * For example, if you have a prop called "name" and in a method you refer to "this.nname", TypeScript will notice
 * that the component doesn't have such a field and give you an opportunity to fix the typo.
 */

import { getOrganizations } from "./meraki-api.js";
export default Vue.extend({
  data: () => ({
    orgs: []
  }),
  methods: {
    onOrgs() {
      getOrganizations({
        config: {
          headers: {
            "X-Cisco-Meraki-API-Key": "093b24e85df15a3e66f1fc359f4c48493eaa1b73"
          }
        }
      }).then(response => {
        console.log(response.data);
        this.orgs = response.data;
      });
    }
  }
});
</script>

<style>
</style>
