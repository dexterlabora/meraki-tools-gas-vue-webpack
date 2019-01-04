import Vue from "vue";
import Router from "vue-router";
//import Home from "./home.vue";
import PageHome from "./page-home.vue";
import PageApiKey from "./page-apikey.vue";
import PageReports from "./page-reports.vue";
import PageTools from "./page-tools.vue";
import ToolProvisionClient from "./tool-provision-client.vue";
import ToolClaimOrder from "./tool-claim-order.vue";
import ToolConfigureSsid from "./tool-configure-ssid.vue";
import ToolConfigureVlan from "./tool-configure-vlan.vue";
import ReportClients from "./report-clients.vue";
import ReportOrganizations from "./report-organizations.vue";
import ReportNetworks from "./report-networks.vue";
import ReportSsids from "./report-ssids.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/home", component: PageHome },
    { path: "/apikey", component: PageApiKey },
    { path: "/reports", component: PageReports },
    { path: "/tools", component: PageTools },
    { path: "/provision-client", component: ToolProvisionClient },
    { path: "/claim-order", component: ToolClaimOrder },
    { path: "/configure-ssid", component: ToolConfigureSsid },
    { path: "/configure-vlan", component: ToolConfigureVlan },
    { path: "/report-clients", component: ReportClients },
    { path: "/report-organizations", component: ReportOrganizations },
    { path: "/report-networks", component: ReportNetworks } //,
    //{ path: "/report-ssids", component: ReportSsids }
  ]
});
