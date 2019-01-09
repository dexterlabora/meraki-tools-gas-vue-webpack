import * as meraki from "./meraki-api.js";

// SSIDs
export async function getNetworksSsids({ networkIds = [] }) {
  var res = {};
  var ssids = [];
  for (var i = 0; i < networkIds.length; i++) {
    try {
      const api = await meraki
        .getNetworkSsids({ networkId: networkIds[i] })
        .then(res => {
          console.log("pushing ssid, ", res.data);
          ssids = ssids.concat(res.data);
        })
        .catch(err => {
          console.log("getSsids error: ", err);
        });
    } catch (e) {
      console.log("try report catch error", e);
      continue;
    }
  }
  console.log("getNetworksSsids ssids: ", ssids);
  res["data"] = ssids;
  return res;
}

export async function getDevicesClients(parameters = {}) {
  console.log("getDevicesClients parameters", parameters);
  var res = {};
  var clients = [];
  for (var i = 0; i < parameters["serials"].length; i++) {
    try {
      var params = {
        serial: parameters["serials"][i],
        timespan: parameters["$queryParameters"]["timespan"]
      };
      console.log("params ", params);
      const api = await meraki
        .getDeviceClients({
          serial: parameters["serials"][i],
          $queryParameters: {
            timespan: parameters["$queryParameters"]["timespan"]
          }
        })
        .then(res => {
          console.log("pushing client, ", res.data);
          clients = clients.concat(res.data);
        })
        .catch(err => {
          console.log("getClients error: ", err);
        });
    } catch (e) {
      console.log("try report catch error", e);
      continue;
    }
  }
  console.log("getDevicesClients clients: ", clients);
  res["data"] = clients;
  return res;
}
