import Vue from "vue";
import Router from "vue-router";
//import Home from "./home.vue";
import PageHome from "./components/pages/page-home.vue";
import PageSettings from "./components/pages/page-settings.vue";
import PageReports from "./components/pages/page-reports.vue";
import PageTools from "./components/pages/page-tools.vue";
import PageSwagger from "./components/pages/page-swagger.vue";

// to be removed
import ToolProvisionClient from "./components/tools/tool-provision-client.vue";
import ToolClaimOrder from "./components/tools/tool-claim-order.vue";
import ToolConfigureSsid from "./components/tools/tool-configure-ssid.vue";
import ToolConfigureVlan from "./components/tools/tool-configure-vlan.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: PageHome },
    { path: "/home", component: PageHome },
    { path: "/settings", component: PageSettings },
    { path: "/reports", component: PageReports },
    { path: "/tools", component: PageTools },
    { path: "/swagger", component: PageSwagger },
    { path: "/provision-client", component: ToolProvisionClient },
    { path: "/claim-order", component: ToolClaimOrder },
    { path: "/configure-ssid", component: ToolConfigureSsid },
    { path: "/configure-vlan", component: ToolConfigureVlan }
  ]
});
