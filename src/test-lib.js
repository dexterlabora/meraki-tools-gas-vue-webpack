const lib = require("./lib");
const configuration = lib.Configuration;
const orgController = lib.OrganizationsController;

configuration.xCiscoMerakiAPIKey = "093b24e85df15a3e66f1fc359f4c48493eaa1b73";

/*
orgController.getOrganizations().then(
  response => {
    // this block will be executed on successful endpoint call
    // `response` will be of type 'mixed'
    console.log(response);
  },
  err => {
    // this block will be executed on endpoint call failure
    // `err` is an 'object' containing more information about the error
  }
);
*/

/*
const bleController = lib.BluetoothClientsController;
bleController
  .getNetworkBluetoothClients({
    networkId: "L_646829496481100388",
    perPage: 20
  })
  .then(res => console.log(res));
*/

getParamNames = function(func) {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  var ARGUMENT_NAMES = /([^\s,]+)/g;
  try {
    var fnStr = func.toString().replace(STRIP_COMMENTS, "");
    var result = fnStr
      .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
      .match(ARGUMENT_NAMES);
    if (result === null) result = [];
    return result;
  } catch (e) {
    console.log("error getParamNames", e);
    return;
  }
};

/*
console.log(
  getParamNames(lib.BluetoothClientsController.getNetworkBluetoothClients)
);
*/

const input = {
  networkId: "L_646829496481100388"
};
lib.DevicesController.getNetworkDevices(input.networkId)
  .then(res => console.log(res))
  .catch(e => console.log(e));
//lib.DevicesController.getNetworkDeviceUplink()

const getFunctionArguments = require("get-function-arguments");
console.log(getFunctionArguments(lib.DevicesController.getNetworkDeviceUplink));
