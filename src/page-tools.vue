<template id="page-tools">
  <v-container>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-card-title>
            <h3>Tools</h3>
          </v-card-title>
          <v-card-text>
            <v-flex xs12 md12 pt-1>
              <v-list>
                <v-list-tile v-for="(tool, i) in tools" :key="i" :to="tool.path">
                  <v-list-tile-title v-text="tool.title"></v-list-tile-title>
                  <v-list-tile-action>
                    <!-- v-icon v-text="tool.icon"></v-icon -->
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  template: "#page-tools",
  data() {
    return {
      tools: [
        {
          title: "Provision Client",
          path: "/provision-client"
        },
        {
          title: "Configure SSID",
          path: "/configure-ssid"
        },
        {
          title: "Update VLANs",
          path: "/configure-vlan"
        },
        {
          title: "Claim Order",
          path: "/claim-order"
        }
      ]
    };
  },
  methods: {}
});
</script>
