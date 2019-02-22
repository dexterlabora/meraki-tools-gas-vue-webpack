/**
 * MerakiDashboardAPINFOFeb21Lib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io ).
 */

'use strict';

const Body34 = require('../lib/Models/Body34');
const Body33 = require('../lib/Models/Body33');
const Body30 = require('../lib/Models/Body30');
const Body28 = require('../lib/Models/Body28');
const Body27 = require('../lib/Models/Body27');
const Body26 = require('../lib/Models/Body26');
const Body22 = require('../lib/Models/Body22');
const Body19 = require('../lib/Models/Body19');
const Body18 = require('../lib/Models/Body18');
const Body50 = require('../lib/Models/Body50');
const Body52 = require('../lib/Models/Body52');
const Rule3 = require('../lib/Models/Rule3');
const Body47 = require('../lib/Models/Body47');
const Body48 = require('../lib/Models/Body48');
const Body45 = require('../lib/Models/Body45');
const Body46 = require('../lib/Models/Body46');
const Body69 = require('../lib/Models/Body69');
const BandwidthLimits = require('../lib/Models/BandwidthLimits');
const Rule2 = require('../lib/Models/Rule2');
const Body43 = require('../lib/Models/Body43');
const Body44 = require('../lib/Models/Body44');
const Body37 = require('../lib/Models/Body37');
const Body42 = require('../lib/Models/Body42');
const Body66 = require('../lib/Models/Body66');
const Body62 = require('../lib/Models/Body62');
const Body61 = require('../lib/Models/Body61');
const Rule = require('../lib/Models/Rule');
const Server = require('../lib/Models/Server');
const Body9 = require('../lib/Models/Body9');
const PowerException = require('../lib/Models/PowerException');
const Body58 = require('../lib/Models/Body58');
const ApTagsAndVlanId = require('../lib/Models/ApTagsAndVlanId');
const Body6 = require('../lib/Models/Body6');
const Alert = require('../lib/Models/Alert');
const RadiusAccountingServer = require('../lib/Models/RadiusAccountingServer');
const RadiusServer = require('../lib/Models/RadiusServer');
const Body56 = require('../lib/Models/Body56');
const Body54 = require('../lib/Models/Body54');
const Body3 = require('../lib/Models/Body3');
const Body53 = require('../lib/Models/Body53');
const Body51 = require('../lib/Models/Body51');
const Body49 = require('../lib/Models/Body49');
const Body2 = require('../lib/Models/Body2');
const Body40 = require('../lib/Models/Body40');
const Network2 = require('../lib/Models/Network2');
const Tag2 = require('../lib/Models/Tag2');
const Body38 = require('../lib/Models/Body38');
const Subnet = require('../lib/Models/Subnet');
const Body32 = require('../lib/Models/Body32');
const Body31 = require('../lib/Models/Body31');
const Hub = require('../lib/Models/Hub');
const Body21 = require('../lib/Models/Body21');
const Body20 = require('../lib/Models/Body20');
const Body15 = require('../lib/Models/Body15');
const Body14 = require('../lib/Models/Body14');
const Body71 = require('../lib/Models/Body71');
const Body13 = require('../lib/Models/Body13');
const Body68 = require('../lib/Models/Body68');
const Body12 = require('../lib/Models/Body12');
const Body7 = require('../lib/Models/Body7');
const DefaultDestinations = require('../lib/Models/DefaultDestinations');
const Body4 = require('../lib/Models/Body4');
const Body65 = require('../lib/Models/Body65');
const Network = require('../lib/Models/Network');
const Tag = require('../lib/Models/Tag');
const Action = require('../lib/Models/Action');
const Body64 = require('../lib/Models/Body64');
const Body63 = require('../lib/Models/Body63');
const Body = require('../lib/Models/Body');
const Body60 = require('../lib/Models/Body60');
const Body36 = require('../lib/Models/Body36');
const Body35 = require('../lib/Models/Body35');
const Body29 = require('../lib/Models/Body29');
const Body25 = require('../lib/Models/Body25');
const Body23 = require('../lib/Models/Body23');
const Body17 = require('../lib/Models/Body17');
const Body11 = require('../lib/Models/Body11');
const Body10 = require('../lib/Models/Body10');
const IpsecPolicies = require('../lib/Models/IpsecPolicies');
const Ssids = require('../lib/Models/Ssids');
const Body8 = require('../lib/Models/Body8');
const Body5 = require('../lib/Models/Body5');
const Body1 = require('../lib/Models/Body1');
const Body55 = require('../lib/Models/Body55');
const Body57 = require('../lib/Models/Body57');
const Body59 = require('../lib/Models/Body59');
const Rule4 = require('../lib/Models/Rule4');
const Rule5 = require('../lib/Models/Rule5');
const Rule6 = require('../lib/Models/Rule6');
const Body67 = require('../lib/Models/Body67');
const Body70 = require('../lib/Models/Body70');

const classMap = {
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
};

/**
 * Factory class to create instances of models and exception classes
 */
class ModelFactory {
    /**
     * Creates instance of a model class
     * @param  modelName  {string}  Name of class to instantiate
     * @returns  {object} Instance of the model class
     */
    static getInstance(modelName) {
        return new classMap[modelName]();
    }
}

module.exports = ModelFactory;
