export class APIException {
  static mappingInfo(): any;
  reason: any;
  context: any;
}
export class APIUsageController {
  static getOrganizationApiRequests(input: any, callback: any): any;
}
export class ActionBatchesController {
  static createOrganizationActionBatches(input: any, callback: any): any;
  static deleteOrganizationActionBatch(input: any, callback: any): any;
  static getOrganizationActionBatch(input: any, callback: any): any;
  static getOrganizationActionBatches(organizationId: any, callback: any): any;
  static updateOrganizationActionBatch(input: any, callback: any): any;
}
export class ActionModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  resource: any;
  operation: any;
  body: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class AddNetworkSmProfileClarityModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  pluginBundleID: any;
  filterBrowsers: any;
  filterSockets: any;
  vendorConfig: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class AddNetworkSmProfileUmbrellaModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  appBundleIdentifier: any;
  providerBundleIdentifier: any;
  providerConfiguration: any;
  usesCert: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class AddNetworkSwitchStackModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  serial: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class AdminsController {
  static createOrganizationAdmins(input: any, callback: any): any;
  static deleteOrganizationAdmin(input: any, callback: any): any;
  static getOrganizationAdmins(organizationId: any, callback: any): any;
  static updateOrganizationAdmin(input: any, callback: any): any;
}
export class Alert1Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  type: any;
  enabled: any;
  alertDestinations: any;
  filters: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class AlertModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  type: any;
  enabled: any;
  alertDestinations: any;
  filters: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class AlertSettingsController {
  static getNetworkAlertSettings(networkId: any, callback: any): any;
  static updateNetworkAlertSettings(input: any, callback: any): any;
}
export class AnalyticsController {
  static getDeviceCameraAnalyticsLive(serial: any, callback: any): any;
  static getDeviceCameraAnalyticsOverview(input: any, callback: any): any;
  static getDeviceCameraAnalyticsRecent(serial: any, callback: any): any;
  static getDeviceCameraAnalyticsZoneHistory(input: any, callback: any): any;
  static getDeviceCameraAnalyticsZones(serial: any, callback: any): any;
}
export class ApTagsAndVlanIdModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  tags: any;
  vlanId: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class BandwidthLimits1Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  limitUp: any;
  limitDown: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class BandwidthLimits6Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  limitUp: any;
  limitDown: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class BandwidthLimitsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  limitUp: any;
  limitDown: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class BandwidthModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  settings: any;
  bandwidthLimits: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class BindNetworkModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  configTemplateId: any;
  autoBind: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class BlinkLedsNetworkDeviceModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  duration: any;
  period: any;
  duty: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class BluetoothClientsController {
  static getNetworkBluetoothClient(input: any, callback: any): any;
  static getNetworkBluetoothClients(input: any, callback: any): any;
}
export class CamerasController {
  static createSnapshotNetworkCamera(input: any, callback: any): any;
  static getNetworkCameraVideoLink(input: any, callback: any): any;
}
export class ClaimNetworkDevicesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  serial: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class ClaimOrganizationModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  order: any;
  serial: any;
  licenseKey: any;
  licenseMode: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class ClientSecurityEventsController {
  static getNetworkClientSecurityEvents(input: any, callback: any): any;
}
export class ClientsController {
  static createProvisionNetworkClients(input: any, callback: any): any;
  static getDeviceClients(input: any, callback: any): any;
  static getNetworkClient(input: any, callback: any): any;
  static getNetworkClientConnectionHealth(input: any, callback: any): any;
  static getNetworkClientEvents(input: any, callback: any): any;
  static getNetworkClientLatencyHistory(input: any, callback: any): any;
  static getNetworkClientPolicy(input: any, callback: any): any;
  static getNetworkClientSplashAuthorizationStatus(
    input: any,
    callback: any
  ): any;
  static getNetworkClientTrafficHistory(input: any, callback: any): any;
  static getNetworkClientUsageHistory(input: any, callback: any): any;
  static getNetworkClients(input: any, callback: any): any;
  static updateNetworkClientPolicy(input: any, callback: any): any;
  static updateNetworkClientSplashAuthorizationStatus(
    input: any,
    callback: any
  ): any;
}
export class CloneOrganizationModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class ConfigTemplatesController {
  static deleteOrganizationConfigTemplate(input: any, callback: any): any;
  static getOrganizationConfigTemplates(
    organizationId: any,
    callback: any
  ): any;
  static updateOrganizationConfigTemplate(input: any, callback: any): any;
}
export namespace Configuration {
  const currentEnvironment: string;
  //function getBaseUri(server: any): any;
  const networkId: string;
  const organizationId: string;
  const xCiscoMerakiAPIKey: string;
}
export class ContentFilteringCategoriesController {
  static getNetworkContentFilteringCategories(
    networkId: any,
    callback: any
  ): any;
}
export class ContentFilteringRulesController {
  static getNetworkContentFiltering(networkId: any, callback: any): any;
  static updateNetworkContentFiltering(input: any, callback: any): any;
}
export class CreateNetworkGroupPoliciesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  scheduling: any;
  bandwidth: any;
  firewallAndTrafficShaping: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkHttpServersModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  url: any;
  sharedSecret: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkHttpServersWebhookTestsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  url: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkPiiRequestsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  type: any;
  datasets: any;
  username: any;
  email: any;
  mac: any;
  smDeviceId: any;
  smUserId: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkSmAppPolarisModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  scope: any;
  manifestUrl: any;
  bundleId: any;
  preventAutoInstall: any;
  usesVPP: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkSmGeofenceRegionsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  description: any;
  type: any;
  lat: any;
  lon: any;
  radius: any;
  north: any;
  east: any;
  south: any;
  west: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkSmGeofencesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  description: any;
  maxTimeOutside: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkSmProfileClarityModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  scope: any;
  pluginBundleID: any;
  filterBrowsers: any;
  filterSockets: any;
  vendorConfig: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkSmProfileUmbrellaModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  scope: any;
  appBundleIdentifier: any;
  providerBundleIdentifier: any;
  providerConfiguration: any;
  usesCert: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkSmTagModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  type: any;
  name: any;
  associatedId: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkSmTargetGroupsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  scope: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkStaticRoutesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  subnet: any;
  gatewayIp: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkSwitchStacksModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  serials: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateNetworkVlansModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  id: any;
  name: any;
  subnet: any;
  applianceIp: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateOrganizationActionBatchesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  confirmed: any;
  synchronous: any;
  actions: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateOrganizationAdminsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  email: any;
  name: any;
  orgAccess: any;
  tags: any;
  networks: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateOrganizationNetworksModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  type: any;
  tags: any;
  timeZone: any;
  copyFromNetworkId: any;
  disableMyMerakiCom: any;
  disableRemoteStatusPage: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateOrganizationSamlRolesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  role: any;
  orgAccess: any;
  tags: any;
  networks: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class CreateOrganizationsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class DefaultDestinations1Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  emails: any;
  allAdmins: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class DefaultDestinationsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  emails: any;
  allAdmins: any;
  snmp: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class DefinitionModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  type: any;
  value: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class DevicesController {
  static createBlinkLedsNetworkDevice(input: any, callback: any): any;
  static createClaimNetworkDevices(input: any, callback: any): any;
  static createRebootNetworkDevice(input: any, callback: any): any;
  static createRemoveNetworkDevice(input: any, callback: any): any;
  static getNetworkDevice(input: any, callback: any): any;
  static getNetworkDeviceLldpCdp(input: any, callback: any): any;
  static getNetworkDeviceLossAndLatencyHistory(input: any, callback: any): any;
  static getNetworkDevicePerformance(input: any, callback: any): any;
  static getNetworkDeviceUplink(input: any, callback: any): any;
  static getNetworkDevices(networkId: any, callback: any): any;
  static updateNetworkDevice(input: any, callback: any): any;
}
export class DhcpOptionModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  code: any;
  type: any;
  value: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export const Environments: {
  PRODUCTION: string;
};
export class FirewallAndTrafficShapingModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  settings: any;
  trafficShapingRules: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class FirewalledServicesController {
  static getNetworkFirewalledService(input: any, callback: any): any;
  static getNetworkFirewalledServices(networkId: any, callback: any): any;
  static updateNetworkFirewalledService(input: any, callback: any): any;
}
export class FridayModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  active: any;
  from: any;
  to: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class GeofenceRegionsController {
  static createNetworkSmGeofenceRegions(input: any, callback: any): any;
  static deleteNetworkSmGeofenceRegion(input: any, callback: any): any;
  static getNetworkSmGeofenceRegion(input: any, callback: any): any;
  static getNetworkSmGeofenceRegions(input: any, callback: any): any;
  static updateNetworkSmGeofenceRegion(input: any, callback: any): any;
}
export class GeofencesController {
  static createNetworkSmGeofences(input: any, callback: any): any;
  static deleteNetworkSmGeofence(input: any, callback: any): any;
  static getNetworkSmGeofence(input: any, callback: any): any;
  static getNetworkSmGeofences(networkId: any, callback: any): any;
  static updateNetworkSmGeofence(input: any, callback: any): any;
}
export class GroupPoliciesController {
  static createNetworkGroupPolicies(input: any, callback: any): any;
  static deleteNetworkGroupPolicy(input: any, callback: any): any;
  static getNetworkGroupPolicies(networkId: any, callback: any): any;
  static getNetworkGroupPolicy(input: any, callback: any): any;
  static updateNetworkGroupPolicy(input: any, callback: any): any;
}
export class HTTPServersController {
  static createNetworkHttpServers(input: any, callback: any): any;
  static createNetworkHttpServersWebhookTests(input: any, callback: any): any;
  static deleteNetworkHttpServer(input: any, callback: any): any;
  static getNetworkHttpServer(input: any, callback: any): any;
  static getNetworkHttpServers(networkId: any, callback: any): any;
  static getNetworkHttpServersWebhookTest(input: any, callback: any): any;
  static updateNetworkHttpServer(input: any, callback: any): any;
}
export class HubModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  hubId: any;
  useDefaultRoute: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class IDSAlertsController {
  static getIdsAlertsPacketQTsIdsAlertTimestampQOrganizationIdOrganizationIdQNetworkIdNetworkId(
    input: any,
    callback: any
  ): any;
  static getIdsAlertsStartTimeFloatStartTimeEndTimeOptionalFloatEndTime(
    input: any,
    callback: any
  ): any;
}
export class IntrusionSettingsController {
  static getNetworkSecurityIntrusionSettings(
    networkId: any,
    callback: any
  ): any;
  static getOrganizationSecurityIntrusionSettings(
    organizationId: any,
    callback: any
  ): any;
  static updateNetworkSecurityIntrusionSettings(input: any, callback: any): any;
}
export class IpsecPoliciesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  ikeCipherAlgo: any;
  ikeAuthAlgo: any;
  ikeDiffieHellmanGroup: any;
  ikeLifetime: any;
  childCipherAlgo: any;
  childAuthAlgo: any;
  childPfsGroup: any;
  childLifetime: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class MRL3FirewallController {
  static getNetworkSsidL3FirewallRules(input: any, callback: any): any;
  static updateNetworkSsidL3FirewallRules(input: any, callback: any): any;
}
export class MX11NATRulesController {
  static getNetworkOneToOneNatRules(networkId: any, callback: any): any;
  static updateNetworkOneToOneNatRules(input: any, callback: any): any;
}
export class MX1ManyNATRulesController {
  static getNetworkOneToManyNatRules(networkId: any, callback: any): any;
  static updateNetworkOneToManyNatRules(input: any, callback: any): any;
}
export class MXCellularFirewallController {
  static getNetworkCellularFirewallRules(networkId: any, callback: any): any;
  static updateNetworkCellularFirewallRules(input: any, callback: any): any;
}
export class MXL3FirewallController {
  static getNetworkL3FirewallRules(networkId: any, callback: any): any;
  static updateNetworkL3FirewallRules(input: any, callback: any): any;
}
export class MXL7ApplicationCategoriesController {
  static getNetworkL7FirewallRulesApplicationCategories(
    networkId: any,
    callback: any
  ): any;
}
export class MXL7FirewallController {
  static getNetworkL7FirewallRules(networkId: any, callback: any): any;
  static updateNetworkL7FirewallRules(input: any, callback: any): any;
}
export class MXPortForwardingRulesController {
  static getNetworkPortForwardingRules(networkId: any, callback: any): any;
  static updateNetworkPortForwardingRules(input: any, callback: any): any;
}
export class MXVPNFirewallController {
  static getOrganizationVpnFirewallRules(
    organizationId: any,
    callback: any
  ): any;
  static updateOrganizationVpnFirewallRules(input: any, callback: any): any;
}
export class MalwareSettingsController {
  static getNetworkSecurityMalwareSettings(networkId: any, callback: any): any;
  static updateNetworkSecurityMalwareSettings(input: any, callback: any): any;
}
export class MerakiAuthUsersController {
  static getNetworkMerakiAuthUser(input: any, callback: any): any;
  static getNetworkMerakiAuthUsers(networkId: any, callback: any): any;
}
export class MondayModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  active: any;
  from: any;
  to: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class NamedTagScopeController {
  static createNetworkSmTargetGroups(input: any, callback: any): any;
  static deleteNetworkSmTargetGroup(input: any, callback: any): any;
  static getNetworkSmTargetGroup(input: any, callback: any): any;
  static getNetworkSmTargetGroups(input: any, callback: any): any;
  static updateNetworkSmTargetGroup(input: any, callback: any): any;
}
export class Network2Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  id: any;
  access: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class NetworkModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  id: any;
  access: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class NetworksController {
  static createBindNetwork(input: any, callback: any): any;
  static createOrganizationNetworks(input: any, callback: any): any;
  static createUnbindNetwork(networkId: any, callback: any): any;
  static deleteNetwork(networkId: any, callback: any): any;
  static getNetwork(networkId: any, callback: any): any;
  static getNetworkAccessPolicies(networkId: any, callback: any): any;
  static getNetworkAirMarshal(input: any, callback: any): any;
  static getNetworkBluetoothSettings(networkId: any, callback: any): any;
  static getNetworkSiteToSiteVpn(networkId: any, callback: any): any;
  static getNetworkTraffic(input: any, callback: any): any;
  static getOrganizationNetworks(input: any, callback: any): any;
  static updateNetwork(input: any, callback: any): any;
  static updateNetworkBluetoothSettings(input: any, callback: any): any;
  static updateNetworkSiteToSiteVpn(input: any, callback: any): any;
}
export class OpenAPISpecController {
  static getOrganizationOpenapiSpec(organizationId: any, callback: any): any;
}
export class OrganizationAlertSettingsController {
  static getOrganizationAlertSettings(organizationId: any, callback: any): any;
  static updateOrganizationAlertSettings(input: any, callback: any): any;
}
export class OrganizationsController {
  static createClaimOrganization(input: any, callback: any): any;
  static createCloneOrganization(input: any, callback: any): any;
  static createOrganizations(createOrganizations: any, callback: any): any;
  static getOrganization(id: any, callback: any): any;
  static getOrganizationDeviceStatuses(id: any, callback: any): any;
  static getOrganizationInventory(id: any, callback: any): any;
  static getOrganizationLicenseState(id: any, callback: any): any;
  static getOrganizationSnmp(id: any, callback: any): any;
  static getOrganizationThirdPartyVPNPeers(id: any, callback: any): any;
  static getOrganizationUplinksLossAndLatency(input: any, callback: any): any;
  static getOrganizations(callback: any): any;
  static updateOrganization(input: any, callback: any): any;
  static updateOrganizationSnmp(input: any, callback: any): any;
  static updateOrganizationThirdPartyVPNPeers(input: any, callback: any): any;
}
export class PIIController {
  static createNetworkPiiRequests(input: any, callback: any): any;
  static deleteNetworkPiiRequest(input: any, callback: any): any;
  static getNetworkPiiPiiKeys(input: any, callback: any): any;
  static getNetworkPiiRequest(input: any, callback: any): any;
  static getNetworkPiiRequests(networkId: any, callback: any): any;
  static getNetworkPiiSmDevicesForKey(input: any, callback: any): any;
  static getNetworkPiiSmOwnersForKey(input: any, callback: any): any;
}
export class PerClientBandwidthLimitsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  settings: any;
  bandwidthLimits: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class PowerExceptionModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  serial: any;
  powerType: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class ProtectedNetworksModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  useDefault: any;
  includedCidr: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class ProvisionNetworkClientsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  mac: any;
  name: any;
  devicePolicy: any;
  groupPolicyId: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class RadioSettingsController {
  static getNetworkDeviceWirelessRadioSettings(input: any, callback: any): any;
  static getNetworkWirelessRfProfiles(input: any, callback: any): any;
  static updateNetworkDeviceWirelessRadioSettings(
    input: any,
    callback: any
  ): any;
}
export class RadiusAccountingServerModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  host: any;
  port: any;
  secret: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class RadiusServerModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  host: any;
  port: any;
  secret: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class RemoveNetworkSwitchStackModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  serial: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class ReservedIpRangeModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  start: any;
  end: any;
  comment: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class Rule1Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  comment: any;
  policy: any;
  protocol: any;
  srcPort: any;
  srcCidr: any;
  destPort: any;
  destCidr: any;
  syslogEnabled: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class Rule2Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  policy: any;
  type: any;
  value: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class Rule3Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  comment: any;
  policy: any;
  protocol: any;
  srcPort: any;
  srcCidr: any;
  destPort: any;
  destCidr: any;
  syslogEnabled: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class Rule4Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  policy: any;
  protocol: any;
  destPort: any;
  destCidr: any;
  comment: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class Rule5Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  definitions: any;
  perClientBandwidthLimits: any;
  dscpTagValue: any;
  priority: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class Rule6Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  definitions: any;
  perClientBandwidthLimits: any;
  dscpTagValue: any;
  pcpTagValue: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class Rule7Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  publicIp: any;
  uplink: any;
  portRules: any;
  name: any;
  protocol: any;
  publicPort: any;
  localIp: any;
  localPort: any;
  allowedIps: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class Rule8Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  publicIp: any;
  lanIp: any;
  uplink: any;
  allowedInbound: any;
  protocol: any;
  destinationPorts: any;
  allowedIps: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class Rule9Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  lanIp: any;
  uplink: any;
  publicPort: any;
  localPort: any;
  allowedIps: any;
  protocol: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class RuleModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  comment: any;
  policy: any;
  protocol: any;
  srcPort: any;
  srcCidr: any;
  destPort: any;
  destCidr: any;
  syslogEnabled: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class SAMLRolesController {
  static createOrganizationSamlRoles(input: any, callback: any): any;
  static deleteOrganizationSamlRole(input: any, callback: any): any;
  static getOrganizationSamlRole(input: any, callback: any): any;
  static getOrganizationSamlRoles(organizationId: any, callback: any): any;
  static updateOrganizationSamlRole(input: any, callback: any): any;
}
export class SMController {
  static addNetworkSmProfileClarity(input: any, callback: any): any;
  static addNetworkSmProfileUmbrella(input: any, callback: any): any;
  static createNetworkSmAppPolaris(input: any, callback: any): any;
  static createNetworkSmProfileClarity(input: any, callback: any): any;
  static createNetworkSmProfileUmbrella(input: any, callback: any): any;
  static createUnenrollNetworkSmDevice(input: any, callback: any): any;
  static deleteNetworkSmAppPolari(input: any, callback: any): any;
  static deleteNetworkSmProfileClarity(input: any, callback: any): any;
  static deleteNetworkSmProfileUmbrella(input: any, callback: any): any;
  static getNetworkSmAppPolaris(input: any, callback: any): any;
  static getNetworkSmCellularUsageHistory(input: any, callback: any): any;
  static getNetworkSmCerts(input: any, callback: any): any;
  static getNetworkSmConnectivity(input: any, callback: any): any;
  static getNetworkSmDesktopLogs(input: any, callback: any): any;
  static getNetworkSmDeviceCommandLogs(input: any, callback: any): any;
  static getNetworkSmDeviceProfiles(input: any, callback: any): any;
  static getNetworkSmDevices(input: any, callback: any): any;
  static getNetworkSmNetworkAdapters(input: any, callback: any): any;
  static getNetworkSmPerformanceHistory(input: any, callback: any): any;
  static getNetworkSmProfileClarity(input: any, callback: any): any;
  static getNetworkSmProfileUmbrella(input: any, callback: any): any;
  static getNetworkSmProfiles(networkId: any, callback: any): any;
  static getNetworkSmRestrictions(input: any, callback: any): any;
  static getNetworkSmSecurityCenters(input: any, callback: any): any;
  static getNetworkSmSoftwares(input: any, callback: any): any;
  static getNetworkSmUserDeviceProfiles(input: any, callback: any): any;
  static getNetworkSmUserSoftwares(input: any, callback: any): any;
  static getNetworkSmUsers(input: any, callback: any): any;
  static getNetworkSmWlanLists(input: any, callback: any): any;
  static updateNetworkSmAppPolari(input: any, callback: any): any;
  static updateNetworkSmDeviceFields(input: any, callback: any): any;
  static updateNetworkSmDeviceWipe(input: any, callback: any): any;
  static updateNetworkSmDevicesCheckin(input: any, callback: any): any;
  static updateNetworkSmDevicesLock(input: any, callback: any): any;
  static updateNetworkSmDevicesMove(input: any, callback: any): any;
  static updateNetworkSmDevicesTags(input: any, callback: any): any;
  static updateNetworkSmProfileClarity(input: any, callback: any): any;
  static updateNetworkSmProfileUmbrella(input: any, callback: any): any;
}
export class SaturdayModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  active: any;
  from: any;
  to: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class SchedulingModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  enabled: any;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class SecurityEventsController {
  static getNetworkSecurityEvents(input: any, callback: any): any;
  static getOrganizationSecurityEvents(input: any, callback: any): any;
}
export class ServerModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  host: any;
  port: any;
  roles: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class SnapshotNetworkCameraModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  timestamp: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class SplashLoginAttemptsController {
  static getNetworkSplashLoginAttempts(input: any, callback: any): any;
}
export class SplashSettingsController {
  static getNetwork_ssids_PlashSettings(input: any, callback: any): any;
  static updateNetwork_ssids_PlashSettings(input: any, callback: any): any;
}
export class SsidsController {
  static createResetNetworkSsid(input: any, callback: any): any;
  static getNetworkSsid(input: any, callback: any): any;
  static getNetwork_ssids(networkId: any, callback: any): any;
  static updateNetworkSsid(input: any, callback: any): any;
}
export class SsidsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  isAuthorized: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class StaticRoutesController {
  static createNetworkStaticRoutes(input: any, callback: any): any;
  static deleteNetworkStaticRoute(input: any, callback: any): any;
  static getNetworkStaticRoute(input: any, callback: any): any;
  static getNetworkStaticRoutes(networkId: any, callback: any): any;
  static updateNetworkStaticRoute(input: any, callback: any): any;
}
export class SubnetModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  localSubnet: any;
  useVpn: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class SundayModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  active: any;
  from: any;
  to: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class SwitchPortsController {
  static getDeviceSwitchPort(input: any, callback: any): any;
  static getDeviceSwitchPorts(serial: any, callback: any): any;
  static updateDeviceSwitchPort(input: any, callback: any): any;
}
export class SwitchSettingsController {
  static getNetworkSwitchSettings(networkId: any, callback: any): any;
  static updateNetworkSwitchSettings(input: any, callback: any): any;
}
export class SwitchStacksController {
  static addNetworkSwitchStack(input: any, callback: any): any;
  static createNetworkSwitchStacks(input: any, callback: any): any;
  static createRemoveNetworkSwitchStack(input: any, callback: any): any;
  static deleteNetworkSwitchStack(input: any, callback: any): any;
  static getNetworkSwitchStack(input: any, callback: any): any;
  static getNetworkSwitchStacks(networkId: any, callback: any): any;
}
export class SyslogServersController {
  static getNetworkSyslogServers(networkId: any, callback: any): any;
  static updateNetworkSyslogServers(input: any, callback: any): any;
}
export class Tag2Model {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  tag: any;
  access: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class TagModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  tag: any;
  access: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class TagsController {
  static createNetworkSmTag(input: any, callback: any): any;
  static deleteNetworkSmTag(input: any, callback: any): any;
  static getNetworkSmTag(input: any, callback: any): any;
  static getNetworkSmTags(networkId: any, callback: any): any;
  static updateNetworkSmTag(input: any, callback: any): any;
}
export class ThursdayModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  active: any;
  from: any;
  to: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class TrafficShapingController {
  static getNetworkSsidTrafficShaping(input: any, callback: any): any;
  static getNetworkTrafficShaping(networkId: any, callback: any): any;
  static getNetworkTrafficShapingApplicationCategories(
    networkId: any,
    callback: any
  ): any;
  static getNetworkTrafficShapingDscpTaggingOptions(
    networkId: any,
    callback: any
  ): any;
  static updateNetworkSsidTrafficShaping(input: any, callback: any): any;
  static updateNetworkTrafficShaping(input: any, callback: any): any;
}
export class TrafficShapingRuleModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  definitions: any;
  perClientBandwidthLimits: any;
  dscpTagValue: any;
  pcpTagValue: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class TuesdayModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  active: any;
  from: any;
  to: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateDeviceSwitchPortModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  tags: any;
  enabled: any;
  type: any;
  vlan: any;
  voiceVlan: any;
  allowed_vlans: any;
  poeEnabled: any;
  isolationEnabled: any;
  rstpEnabled: any;
  stpGuard: any;
  accessPolicyNumber: any;
  linkNegotiation: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkAlertSettingsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  defaultDestinations: any;
  alerts: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkBluetoothSettingsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  scanningEnabled: any;
  advertisingEnabled: any;
  uuid: any;
  majorMinorAssignmentMode: any;
  major: any;
  minor: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkCellularFirewallRulesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  rules: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkClientPolicyModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  devicePolicy: any;
  groupPolicyId: any;
  timespan: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkClientSplashAuthorizationStatusModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  ssids: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkContentFilteringModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  allowedUrlPatterns: any;
  blockedUrlPatterns: any;
  blockedUrlCategories: any;
  urlCategoryListSize: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkDeviceModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  tags: any;
  lat: any;
  lng: any;
  address: any;
  notes: any;
  moveMapMarker: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkDeviceWirelessRadioSettingsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  rfProfileId: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkFirewalledServiceModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  access: any;
  allowedIps: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkGroupPolicyModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  scheduling: any;
  bandwidth: any;
  firewallAndTrafficShaping: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkHttpServerModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  url: any;
  sharedSecret: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkL3FirewallRulesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  rules: any;
  syslogDefaultRule: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkL7FirewallRulesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  rules: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  timeZone: any;
  tags: any;
  disableMyMerakiCom: any;
  disableRemoteStatusPage: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkOneToManyNatRulesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  rules: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkOneToOneNatRulesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  rules: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkPortForwardingRulesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  rules: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSecurityIntrusionSettingsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  mode: any;
  protectedNetworks: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSecurityMalwareSettingsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  mode: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSiteToSiteVpnModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  mode: any;
  hubs: any;
  subnets: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmAppPolariModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  scope: any;
  preventAutoInstall: any;
  usesVPP: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmDeviceFieldsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  wifiMac: any;
  id: any;
  serial: any;
  deviceFields: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmDeviceWipeModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  wifiMac: any;
  id: any;
  serial: any;
  pin: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmDevicesCheckinModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  wifiMacs: any;
  ids: any;
  serials: any;
  scope: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmDevicesLockModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  wifiMacs: any;
  ids: any;
  serials: any;
  scope: any;
  pin: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmDevicesMoveModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  wifiMacs: any;
  ids: any;
  serials: any;
  scope: any;
  newNetwork: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmDevicesTagsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  wifiMacs: any;
  ids: any;
  serials: any;
  scope: any;
  tags: any;
  updateAction: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmGeofenceModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  description: any;
  maxTimeOutside: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmGeofenceRegionModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  description: any;
  type: any;
  lat: any;
  lon: any;
  radius: any;
  north: any;
  east: any;
  south: any;
  west: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmProfileClarityModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  scope: any;
  pluginBundleID: any;
  filterBrowsers: any;
  filterSockets: any;
  vendorConfig: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmProfileUmbrellaModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  scope: any;
  appBundleIdentifier: any;
  providerBundleIdentifier: any;
  providerConfiguration: any;
  usesCert: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmTagModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  type: any;
  name: any;
  associatedId: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSmTargetGroupModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  scope: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSsidL3FirewallRulesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  rules: any;
  allowLanAccess: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSsidModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  enabled: any;
  authMode: any;
  encryptionMode: any;
  psk: any;
  wpaEncryptionMode: any;
  splashPage: any;
  radiusServers: any;
  radiusCoaEnabled: any;
  radiusFailoverPolicy: any;
  radiusLoadBalancingPolicy: any;
  radiusAccountingEnabled: any;
  radiusAccountingServers: any;
  radiusAttributeForGroupPolicies: any;
  ipAssignmentMode: any;
  useVlanTagging: any;
  concentratorNetworkId: any;
  vlanId: any;
  defaultVlanId: any;
  apTagsAndVlanIds: any;
  walledGardenEnabled: any;
  walledGardenRanges: any;
  radiusOverride: any;
  minBitrate: any;
  bandSelection: any;
  perClientBandwidthLimitUp: any;
  perClientBandwidthLimitDown: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSsidTrafficShapingModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  trafficShapingEnabled: any;
  defaultRulesEnabled: any;
  rules: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSsidsPlashSettingsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  splashUrl: any;
  useSplashUrl: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkStaticRouteModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  subnet: any;
  gatewayIp: any;
  enabled: any;
  fixedIpAssignments: any;
  reservedIpRanges: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSwitchSettingsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  useCombinedPower: any;
  powerExceptions: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkSyslogServersModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  servers: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkTrafficShapingModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  defaultRulesEnabled: any;
  rules: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkUplinkSettingsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  bandwidthLimits: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkVlanModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  subnet: any;
  applianceIp: any;
  vpnNatSubnet: any;
  dhcpHandling: any;
  dhcpRelayServerIps: any;
  dhcpLeaseTime: any;
  dhcpBootOptionsEnabled: any;
  dhcpBootNextServer: any;
  dhcpBootFilename: any;
  fixedIpAssignments: any;
  reservedIpRanges: any;
  dnsNameservers: any;
  dhcpOptions: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateNetworkVlansEnabledStateModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  enabled: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateOrganizationActionBatchModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  confirmed: any;
  synchronous: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateOrganizationAdminModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  email: any;
  name: any;
  orgAccess: any;
  tags: any;
  networks: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateOrganizationAlertSettingsModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  defaultDestinations: any;
  alerts: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateOrganizationConfigTemplateModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  timeZone: any;
  version: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateOrganizationModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateOrganizationSamlRoleModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  role: any;
  orgAccess: any;
  tags: any;
  networks: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateOrganizationSnmpModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  v2cEnabled: any;
  v3Enabled: any;
  v3AuthMode: any;
  v3AuthPass: any;
  v3PrivMode: any;
  v3PrivPass: any;
  peerIps: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateOrganizationThirdPartyVPNPeersModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  name: any;
  publicIp: any;
  privateSubnets: any;
  ipsecPolicies: any;
  ipsecPoliciesPreset: any;
  secret: any;
  networkTags: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UpdateOrganizationVpnFirewallRulesModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  rules: any;
  syslogDefaultRule: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class UplinkSettingsController {
  static getNetworkUplinkSettings(networkId: any, callback: any): any;
  static updateNetworkUplinkSettings(input: any, callback: any): any;
}
export class VlansController {
  static createNetwork_vlans(input: any, callback: any): any;
  static deleteNetworkVlan(input: any, callback: any): any;
  static getNetworkVlan(input: any, callback: any): any;
  static getNetwork_vlans(networkId: any, callback: any): any;
  static getNetwork_vlans_EnabledState(networkId: any, callback: any): any;
  static updateNetworkVlan(input: any, callback: any): any;
  static updateNetwork_vlans_EnabledState(input: any, callback: any): any;
}
export class WebhookLogsController {
  static getOrganizationWebhookLogs(input: any, callback: any): any;
}
export class WednesdayModel {
  static discriminatorMap(): any;
  static getValue(obj: any, defaultValue: any): any;
  static mappingInfo(): any;
  constructor(obj: any);
  active: any;
  from: any;
  to: any;
  addAdditionalProperty(key: any, value: any): void;
  getDateTimeValueForField(name: any): any;
  mappingInfoContains(val: any): any;
  toJSON(): any;
}
export class WirelessHealthController {
  static getNetworkClientConnectionStats(input: any, callback: any): any;
  static getNetworkClientLatencyStats(input: any, callback: any): any;
  static getNetworkClientsConnectionStats(input: any, callback: any): any;
  static getNetworkClientsLatencyStats(input: any, callback: any): any;
  static getNetworkConnectionStats(input: any, callback: any): any;
  static getNetworkDeviceConnectionStats(input: any, callback: any): any;
  static getNetworkDeviceLatencyStats(input: any, callback: any): any;
  static getNetworkDevicesConnectionStats(input: any, callback: any): any;
  static getNetworkDevicesLatencyStats(input: any, callback: any): any;
  static getNetworkFailedConnections(input: any, callback: any): any;
  static getNetworkLatencyStats(input: any, callback: any): any;
}
