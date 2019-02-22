/**
  * @module MerakiDashboardAPINFOFeb21Lib
  *
  * This collection of API calls provides an easy way to interact with a Cisco Meraki network
  */

'use strict';

const Configuration = require('./configuration');
const SMController = require('./Controllers/SMController');
const NamedTagScopeController = require('./Controllers/NamedTagScopeController');
const VLANsController = require('./Controllers/VLANsController');
const SAMLRolesController = require('./Controllers/SAMLRolesController');
const PhoneContactsController = require('./Controllers/PhoneContactsController');
const UplinkSettingsController = require('./Controllers/UplinkSettingsController');
const StaticRoutesController = require('./Controllers/StaticRoutesController');
const MXPortForwardingRulesController = require('./Controllers/MXPortForwardingRulesController');
const MX11NATRulesController = require('./Controllers/MX11NATRulesController');
const FirewalledServicesController = require('./Controllers/FirewalledServicesController');
const ContentFilteringRulesController = require('./Controllers/ContentFilteringRulesController');
const ContentFilteringCategoriesController =
  require('./Controllers/ContentFilteringCategoriesController');
const SyslogServersController = require('./Controllers/SyslogServersController');
const SwitchPortsController = require('./Controllers/SwitchPortsController');
const SwitchSettingsController = require('./Controllers/SwitchSettingsController');
const SSIDsController = require('./Controllers/SSIDsController');
const SplashSettingsController = require('./Controllers/SplashSettingsController');
const PhoneConferenceRoomsController = require('./Controllers/PhoneConferenceRoomsController');
const PhoneCallgroupsController = require('./Controllers/PhoneCallgroupsController');
const PhoneAssignmentsController = require('./Controllers/PhoneAssignmentsController');
const OrganizationsController = require('./Controllers/OrganizationsController');
const SplashLoginAttemptsController = require('./Controllers/SplashLoginAttemptsController');
const OpenAPISpecController = require('./Controllers/OpenAPISpecController');
const NetworksController = require('./Controllers/NetworksController');
const PIIController = require('./Controllers/PIIController');
const PhoneNumbersController = require('./Controllers/PhoneNumbersController');
const MerakiAuthUsersController = require('./Controllers/MerakiAuthUsersController');
const PhoneAnnouncementsController = require('./Controllers/PhoneAnnouncementsController');
const HTTPServersController = require('./Controllers/HTTPServersController');
const MX1ManyNATRulesController = require('./Controllers/MX1ManyNATRulesController');
const MRL3FirewallController = require('./Controllers/MRL3FirewallController');
const MXVPNFirewallController = require('./Controllers/MXVPNFirewallController');
const MXL3FirewallController = require('./Controllers/MXL3FirewallController');
const MXCellularFirewallController = require('./Controllers/MXCellularFirewallController');
const DevicesController = require('./Controllers/DevicesController');
const GroupPoliciesController = require('./Controllers/GroupPoliciesController');
const ClientsController = require('./Controllers/ClientsController');
const MXL7FirewallController = require('./Controllers/MXL7FirewallController');
const ClientSecurityEventsController = require('./Controllers/ClientSecurityEventsController');
const ConfigTemplatesController = require('./Controllers/ConfigTemplatesController');
const BluetoothClientsController = require('./Controllers/BluetoothClientsController');
const AnalyticsController = require('./Controllers/AnalyticsController');
const AlertSettingsController = require('./Controllers/AlertSettingsController');
const AdminsController = require('./Controllers/AdminsController');
const ActionBatchesController = require('./Controllers/ActionBatchesController');
const CamerasController = require('./Controllers/CamerasController');
const WirelessHealthController = require('./Controllers/WirelessHealthController');
const Body34 = require('./Models/Body34');
const Body33 = require('./Models/Body33');
const Body30 = require('./Models/Body30');
const Body28 = require('./Models/Body28');
const Body27 = require('./Models/Body27');
const Body26 = require('./Models/Body26');
const Body22 = require('./Models/Body22');
const Body19 = require('./Models/Body19');
const Body18 = require('./Models/Body18');
const Body50 = require('./Models/Body50');
const Body52 = require('./Models/Body52');
const Rule3 = require('./Models/Rule3');
const Body47 = require('./Models/Body47');
const Body48 = require('./Models/Body48');
const Body45 = require('./Models/Body45');
const Body46 = require('./Models/Body46');
const Body69 = require('./Models/Body69');
const BandwidthLimits = require('./Models/BandwidthLimits');
const Rule2 = require('./Models/Rule2');
const Body43 = require('./Models/Body43');
const Body44 = require('./Models/Body44');
const Body37 = require('./Models/Body37');
const Body42 = require('./Models/Body42');
const Body66 = require('./Models/Body66');
const Body62 = require('./Models/Body62');
const Body61 = require('./Models/Body61');
const Rule = require('./Models/Rule');
const Server = require('./Models/Server');
const Body9 = require('./Models/Body9');
const PowerException = require('./Models/PowerException');
const Body58 = require('./Models/Body58');
const ApTagsAndVlanId = require('./Models/ApTagsAndVlanId');
const Body6 = require('./Models/Body6');
const Alert = require('./Models/Alert');
const RadiusAccountingServer = require('./Models/RadiusAccountingServer');
const RadiusServer = require('./Models/RadiusServer');
const Body56 = require('./Models/Body56');
const Body54 = require('./Models/Body54');
const Body3 = require('./Models/Body3');
const Body53 = require('./Models/Body53');
const Body51 = require('./Models/Body51');
const Body49 = require('./Models/Body49');
const Body2 = require('./Models/Body2');
const Body40 = require('./Models/Body40');
const Network2 = require('./Models/Network2');
const Tag2 = require('./Models/Tag2');
const Body38 = require('./Models/Body38');
const Subnet = require('./Models/Subnet');
const Body32 = require('./Models/Body32');
const Body31 = require('./Models/Body31');
const Hub = require('./Models/Hub');
const Body21 = require('./Models/Body21');
const Body20 = require('./Models/Body20');
const Body15 = require('./Models/Body15');
const Body14 = require('./Models/Body14');
const Body71 = require('./Models/Body71');
const Body13 = require('./Models/Body13');
const Body68 = require('./Models/Body68');
const Body12 = require('./Models/Body12');
const Body7 = require('./Models/Body7');
const DefaultDestinations = require('./Models/DefaultDestinations');
const Body4 = require('./Models/Body4');
const Body65 = require('./Models/Body65');
const Network = require('./Models/Network');
const Tag = require('./Models/Tag');
const Action = require('./Models/Action');
const Body64 = require('./Models/Body64');
const Body63 = require('./Models/Body63');
const Body = require('./Models/Body');
const Body60 = require('./Models/Body60');
const Body36 = require('./Models/Body36');
const Body35 = require('./Models/Body35');
const Body29 = require('./Models/Body29');
const Body25 = require('./Models/Body25');
const Body23 = require('./Models/Body23');
const Body17 = require('./Models/Body17');
const Body11 = require('./Models/Body11');
const Body10 = require('./Models/Body10');
const IpsecPolicies = require('./Models/IpsecPolicies');
const Ssids = require('./Models/Ssids');
const Body8 = require('./Models/Body8');
const Body5 = require('./Models/Body5');
const Body1 = require('./Models/Body1');
const Body55 = require('./Models/Body55');
const Body57 = require('./Models/Body57');
const Body59 = require('./Models/Body59');
const Rule4 = require('./Models/Rule4');
const Rule5 = require('./Models/Rule5');
const Rule6 = require('./Models/Rule6');
const Body67 = require('./Models/Body67');
const Body70 = require('./Models/Body70');
const APIException = require('./Exceptions/APIException');


const initializer = {
    // functional components of MerakiDashboardAPINFOFeb21Lib
    Configuration,
    // controllers of MerakiDashboardAPINFOFeb21Lib
    SMController,
    NamedTagScopeController,
    VLANsController,
    SAMLRolesController,
    PhoneContactsController,
    UplinkSettingsController,
    StaticRoutesController,
    MXPortForwardingRulesController,
    MX11NATRulesController,
    FirewalledServicesController,
    ContentFilteringRulesController,
    ContentFilteringCategoriesController,
    SyslogServersController,
    SwitchPortsController,
    SwitchSettingsController,
    SSIDsController,
    SplashSettingsController,
    PhoneConferenceRoomsController,
    PhoneCallgroupsController,
    PhoneAssignmentsController,
    OrganizationsController,
    SplashLoginAttemptsController,
    OpenAPISpecController,
    NetworksController,
    PIIController,
    PhoneNumbersController,
    MerakiAuthUsersController,
    PhoneAnnouncementsController,
    HTTPServersController,
    MX1ManyNATRulesController,
    MRL3FirewallController,
    MXVPNFirewallController,
    MXL3FirewallController,
    MXCellularFirewallController,
    DevicesController,
    GroupPoliciesController,
    ClientsController,
    MXL7FirewallController,
    ClientSecurityEventsController,
    ConfigTemplatesController,
    BluetoothClientsController,
    AnalyticsController,
    AlertSettingsController,
    AdminsController,
    ActionBatchesController,
    CamerasController,
    WirelessHealthController,
    // models of MerakiDashboardAPINFOFeb21Lib
    Body34,
    Body33,
    Body30,
    Body28,
    Body27,
    Body26,
    Body22,
    Body19,
    Body18,
    Body50,
    Body52,
    Rule3,
    Body47,
    Body48,
    Body45,
    Body46,
    Body69,
    BandwidthLimits,
    Rule2,
    Body43,
    Body44,
    Body37,
    Body42,
    Body66,
    Body62,
    Body61,
    Rule,
    Server,
    Body9,
    PowerException,
    Body58,
    ApTagsAndVlanId,
    Body6,
    Alert,
    RadiusAccountingServer,
    RadiusServer,
    Body56,
    Body54,
    Body3,
    Body53,
    Body51,
    Body49,
    Body2,
    Body40,
    Network2,
    Tag2,
    Body38,
    Subnet,
    Body32,
    Body31,
    Hub,
    Body21,
    Body20,
    Body15,
    Body14,
    Body71,
    Body13,
    Body68,
    Body12,
    Body7,
    DefaultDestinations,
    Body4,
    Body65,
    Network,
    Tag,
    Action,
    Body64,
    Body63,
    Body,
    Body60,
    Body36,
    Body35,
    Body29,
    Body25,
    Body23,
    Body17,
    Body11,
    Body10,
    IpsecPolicies,
    Ssids,
    Body8,
    Body5,
    Body1,
    Body55,
    Body57,
    Body59,
    Rule4,
    Rule5,
    Rule6,
    Body67,
    Body70,
    // exceptions of MerakiDashboardAPINFOFeb21Lib
    APIException,
};

module.exports = initializer;
