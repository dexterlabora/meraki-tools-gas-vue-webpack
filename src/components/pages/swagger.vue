<template id="page-swagger">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title></v-card-title>
          <v-card-text p1>
            <h3>Swagger</h3>
            <v-swagger :spec="openapiSpec"/>
            <v-swagger :spec="organizations"/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import VSwagger from "v-swagger";

Vue.use(VSwagger);
export default Vue.extend({
  template: "#page-swagger",
  computed: {
    apiKey() {
      return this.$store.state.apiKey;
    }
  },
  data() {
    return {
      openapiSpec: {
        host: "http://localhost:8085/api",
        title: "Meraki Dashboard API",
        description: "Cisco Meraki API",
        opened: true,
        request: [
          {
            method: "get", // post, delete or put
            description: "Open API Spec",
            url: "/openapiSpec"
          }
        ]
      },
      organizations: {
        host: "http://localhost:8085/api",
        title: "Meraki Dashboard API",
        description: "Cisco Meraki API",
        opened: true,
        request: [
          {
            method: "get",
            description: "Organizations",
            url: "/organizations",
            headers: [
              {
                key: "X-Cisco-Meraki-API-Key",
                description: "{{apiKey}}"
              }
            ]
          }
        ]
      }
    };
  }
});
</script>
