import * as meraki from "./meraki-api.js";

// Organizations
export function reportOrganizations() {
  return meraki.getOrganizations().then(res => res.data);
}

export function reportOrganization(orgId) {
  return meraki.getOrganization({ id: orgId }).then(res => res.data);
}

// Networks

export function reportOrganizationNetworks(orgId) {
  return meraki
    .getOrganizationNetworks({ organizationId: orgId })
    .then(res => res.data);
}

export function reportNetwork(netId) {
  return meraki.getNetwork({ id: netId }).then(res => res.data);
}

// Devices
export function reportNetworkDevices(netId) {
  return meraki.getNetworkDevices({ networkId: netId }).then(res => res.data);
}

export function reportNetworkDevice(netId, serial) {
  return meraki
    .getNetworkDevice({ networkId: netId, serial: serial })
    .then(res => res.data);
}

export function reportNetworkDeviceUplink(netId, serial) {
  return meraki
    .getNetworkDeviceUplink({ networkId: netId, serial: serial })
    .then(res => res.data);
}

// SSIDS
export function reportNetworkSsids(netId) {
  return meraki.getNetworkSsids({ networkId: netId }).then(res => res.data);
}

export async function reportNetworksSsids(nets) {
  var ssids = [];
  for (var i = 0; i < nets.length; i++) {
    try {
      const api = await meraki
        .getNetworkSsids({ networkId: nets[i].id })
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
  return ssids;
}

export function reportNetworkSsid(netId, ssidNumber) {
  return meraki
    .getNetworkSsid({ networkId: netId, number: ssidNumber })
    .then(res => res.data);
}
