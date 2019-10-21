<template id="page-reports">
  <v-container>
    <!--
    <org-selector></org-selector>
    <net-selector></net-selector>
    -->
    <v-layout wrap>
      <v-flex xs12 sm6 md6>
        <v-select
          v-model="selectedTool"
          :items="tools"
          item-text="title"
          return-object
          label="Select a Tool"
          outline
        ></v-select>
      </v-flex>

      <v-flex xs12 sm12 md12>
        <component :is="selectedTool.component"></component>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import ToolProvisionClient from "../tools/tool-provision-client.vue";
import ToolClaimOrder from "../tools/tool-claim-order.vue";
import ToolConfigureSsid from "../tools/tool-configure-ssid.vue";
import ToolConfigureVlan from "../tools/tool-configure-vlan.vue";
import OrgSelector from "../shared/meraki-state-selectors/OrgSelector.vue";
import NetSelector from "../shared/meraki-state-selectors/NetSelector.vue";

import Vue from "vue";
export default Vue.extend({
  template: "#page-tools",
  components: {
    "org-selector": OrgSelector,
    "net-selector": NetSelector
  },
  data() {
    return {
      selectedTool: {},
      tools: [
        {
          title: "Provision Client",
          component: ToolProvisionClient
        },
        {
          title: "Configure SSID",
          component: ToolConfigureSsid
        },
        {
          title: "Update VLANs",
          component: ToolConfigureVlan
        },
        {
          title: "Claim Order",
          component: ToolClaimOrder
        }
      ]
    };
  },
  methods: {}
});
</script>
<style>
.v-list__tile__content {
  font-size: small;
}
</style>