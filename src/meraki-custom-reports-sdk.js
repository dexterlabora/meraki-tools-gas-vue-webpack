// Meraki API Service
import * as meraki from "./lib";

function errorHandler(e) {
  console.log(e);
}

// Meraki Handlers

export async function fetchVlans(nets) {
  console.log("fetchNets nets", nets);

  try {
    if (!nets) {
      throw "missing networks";
    }
    console.log("\n Getting VLAN information..");
    let allVlans = [];
    if (nets) {
      for (let n of nets) {
        const vlans = await meraki.VLANsController.getNetworkVlans(n.id).catch(
          e => errorHandler(e)
        );
        if (!vlans) {
          continue;
        }
        allVlans = [...allVlans, ...vlans];
      }
    }
    return allVlans;
  } catch (error) {
    errorHandler(error);
  }
}

// Primary Script
export async function main() {
  // Get Networks
  const networks = await meraki.NetworksController.getOrganizationNetworks(
    ORG_ID
  ).catch(e => errorHandler(e));
  console.log("Networks: ", networks);

  // Get Template Info
  const templates = await meraki.ConfigTemplatesController.getOrganizationConfigTemplates(
    ORG_ID
  ).catch(e => errorHandler(e));
  console.log("Templates: ", templates);

  // Get VLANs for every network
  let vlans = await fetchVlans(networks);

  // attach template and network name info to results
  vlans.map(v => {
    // attach network name
    let net = networks.filter(n => n.id === v.networkId)[0];
    v.networkName = net.name;

    // attach template name
    if (net.configTemplateId) {
      v.configTemplateId = net.configTemplateId;
      let template = templates.filter(t => t.id === v.configTemplateId)[0];
      v.configTemplateName = template.name;
    }
    return v;
  });

  // Print Final Results
  console.log("VLANS with Network Template Info", vlans);

  // Write CSV to File
  let file = program.file;
  if (file) {
    csv.writeCSVfile(vlans, file);
  }
}
