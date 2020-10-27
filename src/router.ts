import Vue from "vue";
import Router from "vue-router";
import PageHome from "./components/pages/home.vue";
import PageSettings from "./components/pages/settings.vue";
//import PageReports from "./components/pages/reports.vue";
import PageReportsAutoOas from "./components/pages/reports-auto-oas.vue";
import PageTools from "./components/pages/tools.vue";
import JsonToSheet from "./components/pages/json-to-sheet.vue";
import PageSwagger from "./components/pages/swagger.vue";

import ToolProvisionClient from "./components/tools/tool-provision-client.vue";
import ToolClaimOrder from "./components/tools/tool-claim-order.vue";
import ToolConfigureSsid from "./components/tools/tool-configure-ssid.vue";
import ToolConfigureVlan from "./components/tools/tool-configure-vlan.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "*", redirect: "/" },
    { path: "/", component: PageHome },
    { path: "/home", component: PageHome },
    { path: "/settings", component: PageSettings },
   // { path: "/reports-old", component: PageReports },
    { path: "/reports", component: PageReportsAutoOas },
    { path: "/tools", component: PageTools },
    { path: "/swagger", component: PageSwagger },
    { path: "/provision-client", component: ToolProvisionClient },
    { path: "/claim-order", component: ToolClaimOrder },
    { path: "/configure-ssid", component: ToolConfigureSsid },
    { path: "/configure-vlan", component: ToolConfigureVlan },
    { path: "/json-to-sheet", component: JsonToSheet }
  ]
});
