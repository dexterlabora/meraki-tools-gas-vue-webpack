/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
let domain = ''
export const getDomain = () => {
  return domain;
};
export const setDomain = $domain => {
  domain = $domain;
};

// Custom
let apiKey = ''
let service = process.env.VUE_APP_SERVICE;'' //  'gas' or 'axios' 
var JSONbig = require("json-bigint")({ "storeAsString": true });

export const setApiKey = $apiKey => {
  apiKey = $apiKey;
  axios.defaults.headers.common["X-Cisco-Meraki-API-Key"] = apiKey; // for all requests
};

export const setService = $service => {
    service = $service;
};

export const getService = () => {
    return service;
};




export const request = (method, url, body, queryParameters, form, config) => {
    console.log("API service:", service);
    method = method.toLowerCase();
    let keys = Object.keys(queryParameters)
    let queryUrl = url
    if (keys.length > 0) {
        queryUrl = url + '?' + qs.stringify(queryParameters)
    }
    if(service !== "dev"){
        const options = {
            contentType: "application/json",
            method: method,
            headers: {
                "X-Cisco-Meraki-API-Key": apiKey
            }
        };
        config = config || {};
        Object.assign(config,options);
        if (body) {
            config.payload = JSON.stringify(body);

            return googleFetch(queryUrl, config);
        } else if (method === 'get') {
            console.log('gas fetch: queryUrl, config', queryUrl, config);
            return googleFetch(queryUrl, config);
        } else {
            return googleFetch(queryUrl, qs.stringify(form), config); // not sure how to handle qs properly in GAS
        }
    }
    else {
        if (body) {
            return axios[method](queryUrl, body, config)
        } else if (method === 'get') {
            return axios[method](queryUrl, {
                params: form
            }, config)
        } else {
            return axios[method](queryUrl, qs.stringify(form), config)
        }
    }

}

export const googleFetch = (url, options, body) => {
    return new Promise((resolve, reject) => {
        if (typeof google == "undefined") {reject('not running on google apps server')}
        google.script.run
            .withSuccessHandler(response => {
                //console.log("fetch res: ", response);
                try {
                    var json = JSONbig.parse(response);
                    var res = {};
                    res.data = json; // match output format of axios
                    resolve(res);
                } catch (e) {
                    resolve(response);
                }
            })
            .withFailureHandler(error => {
                console.log("MerakiService error: ", error);
                reject(error);
            })
            .fetch(url, options);
    });
};


/*==========================================================
 *                    This collection of API calls provides an easy way to interact with a Cisco Meraki network
 ==========================================================*/

// custom

/**
* Add a static route
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My route","subnet":"192.168.1.0/24","gatewayIp":"1.2.3.5"}' 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes'
```
* request: createNetworkStaticRoutes
* url: createNetworkStaticRoutesURL
* method: createNetworkStaticRoutes_TYPE
* raw_url: createNetworkStaticRoutes_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkClientProvision = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = "/networks/{networkId}/clients/provision";
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkClientProvision_RAW_URL = function () {
    return "/networks/{networkId}/clients/provision";
}
export const createNetworkClientProvision_TYPE = function () {
    return 'post'
}
export const createNetworkClientProvisionURL = function(parameters = {}) {
         let queryParameters = {};
         const domain = parameters.$domain ? parameters.$domain : getDomain();
         let path = "/networks/{networkId}/clients/provision";
         path = path.replace("{networkId}", `${parameters["networkId"]}`);
         if (parameters.$queryParameters) {
           Object.keys(parameters.$queryParameters).forEach(function(
             parameterName
           ) {
             queryParameters[parameterName] =
               parameters.$queryParameters[parameterName];
           });
         }
         let keys = Object.keys(queryParameters);
         return domain + path + (keys.length > 0 ? "?" + keys
                 .map(
                   key =>
                     key + "=" + encodeURIComponent(queryParameters[key])
                 )
                 .join("&") : "");
       };

/**
* List the API requests made by an organization
 
## SAMPLE REQUEST
 
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/networks'
```
* request: getOrganizationApiRequests
* url: getOrganizationApiRequestsURL
* method: getOrganizationApiRequests_TYPE
* raw_url: getOrganizationApiRequests_RAW_URL
* @param organizationId - 
* @param body - 
*/
export const getOrganizationApiRequests = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/apiRequests'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters['t0'] !== undefined) {
        queryParameters['t0'] = parameters['t0']
    }
    if (parameters['t1'] !== undefined) {
        queryParameters['t1'] = parameters['t1']
    }
    if (parameters['method'] !== undefined) {
        queryParameters['method'] = parameters['method']
    }
    if (parameters['timespan'] !== undefined) {
        queryParameters['timespan'] = parameters['timespan']
    }
    if (parameters['perPage'] !== undefined) {
        queryParameters['perPage'] = parameters['perPage']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationApiRequests_RAW_URL = function () {
    return '/organizations/{organizationId}/apiRequests'
}
export const getOrganizationApiRequests_TYPE = function () {
    return 'get'
}
export const getOrganizationApiRequestsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/apiRequests'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
// end custom


/**
* Return the firewall rules for an organization's site-to-site VPN
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/vpnFirewallRules'
```
* request: getOrganizationVpnFirewallRules
* url: getOrganizationVpnFirewallRulesURL
* method: getOrganizationVpnFirewallRules_TYPE
* raw_url: getOrganizationVpnFirewallRules_RAW_URL
     * @param organizationId - 
*/
export const getOrganizationVpnFirewallRules = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/vpnFirewallRules'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationVpnFirewallRules_RAW_URL = function () {
    return '/organizations/{organizationId}/vpnFirewallRules'
}
export const getOrganizationVpnFirewallRules_TYPE = function () {
    return 'get'
}
export const getOrganizationVpnFirewallRulesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/vpnFirewallRules'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update firewall rules of an organization's site-to-site VPN
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24","srcPort":"Any","srcCidr":"Any","syslogEnabled":false}]}' 'https://api.meraki.com/api/v0/organizations/[organizationId]/vpnFirewallRules'
```
* request: updateOrganizationVpnFirewallRules
* url: updateOrganizationVpnFirewallRulesURL
* method: updateOrganizationVpnFirewallRules_TYPE
* raw_url: updateOrganizationVpnFirewallRules_RAW_URL
     * @param organizationId - 
     * @param body - 
*/
export const updateOrganizationVpnFirewallRules = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/vpnFirewallRules'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateOrganizationVpnFirewallRules_RAW_URL = function () {
    return '/organizations/{organizationId}/vpnFirewallRules'
}
export const updateOrganizationVpnFirewallRules_TYPE = function () {
    return 'put'
}
export const updateOrganizationVpnFirewallRulesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/vpnFirewallRules'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the L3 firewall rules for an SSID on an MR network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/l3FirewallRules'
```
* request: getNetworkSsidL3FirewallRules
* url: getNetworkSsidL3FirewallRulesURL
* method: getNetworkSsidL3FirewallRules_TYPE
* raw_url: getNetworkSsidL3FirewallRules_RAW_URL
     * @param networkId - 
     * @param number - 
*/
export const getNetworkSsidL3FirewallRules = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/ssids/{number}/l3FirewallRules'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters['number'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: number'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkSsidL3FirewallRules_RAW_URL = function () {
    return '/networks/{networkId}/ssids/{number}/l3FirewallRules'
}
export const getNetworkSsidL3FirewallRules_TYPE = function () {
    return 'get'
}
export const getNetworkSsidL3FirewallRulesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/ssids/{number}/l3FirewallRules'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the L3 firewall rules of an SSID on an MR network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24"}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/l3FirewallRules'
```
* request: updateNetworkSsidL3FirewallRules
* url: updateNetworkSsidL3FirewallRulesURL
* method: updateNetworkSsidL3FirewallRules_TYPE
* raw_url: updateNetworkSsidL3FirewallRules_RAW_URL
     * @param networkId - 
     * @param number - 
     * @param body - 
*/
export const updateNetworkSsidL3FirewallRules = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/ssids/{number}/l3FirewallRules'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters['number'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: number'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkSsidL3FirewallRules_RAW_URL = function () {
    return '/networks/{networkId}/ssids/{number}/l3FirewallRules'
}
export const updateNetworkSsidL3FirewallRules_TYPE = function () {
    return 'put'
}
export const updateNetworkSsidL3FirewallRulesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/ssids/{number}/l3FirewallRules'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the L3 firewall rules for an MX network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/l3FirewallRules'
```
* request: getNetworkL3FirewallRules
* url: getNetworkL3FirewallRulesURL
* method: getNetworkL3FirewallRules_TYPE
* raw_url: getNetworkL3FirewallRules_RAW_URL
     * @param networkId - 
*/
export const getNetworkL3FirewallRules = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/l3FirewallRules'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkL3FirewallRules_RAW_URL = function () {
    return '/networks/{networkId}/l3FirewallRules'
}
export const getNetworkL3FirewallRules_TYPE = function () {
    return 'get'
}
export const getNetworkL3FirewallRulesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/l3FirewallRules'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the L3 firewall rules of an MX network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24","srcPort":"Any","srcCidr":"Any","syslogEnabled":false}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/l3FirewallRules'
```
* request: updateNetworkL3FirewallRules
* url: updateNetworkL3FirewallRulesURL
* method: updateNetworkL3FirewallRules_TYPE
* raw_url: updateNetworkL3FirewallRules_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const updateNetworkL3FirewallRules = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/l3FirewallRules'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkL3FirewallRules_RAW_URL = function () {
    return '/networks/{networkId}/l3FirewallRules'
}
export const updateNetworkL3FirewallRules_TYPE = function () {
    return 'put'
}
export const updateNetworkL3FirewallRulesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/l3FirewallRules'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the cellular firewall rules for an MX network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/cellularFirewallRules'
```
* request: getNetworkCellularFirewallRules
* url: getNetworkCellularFirewallRulesURL
* method: getNetworkCellularFirewallRules_TYPE
* raw_url: getNetworkCellularFirewallRules_RAW_URL
     * @param networkId - 
*/
export const getNetworkCellularFirewallRules = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/cellularFirewallRules'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkCellularFirewallRules_RAW_URL = function () {
    return '/networks/{networkId}/cellularFirewallRules'
}
export const getNetworkCellularFirewallRules_TYPE = function () {
    return 'get'
}
export const getNetworkCellularFirewallRulesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/cellularFirewallRules'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the cellular firewall rules of an MX network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"rules":[{"comment":"Allow TCP traffic to subnet with HTTP servers.","policy":"allow","protocol":"tcp","destPort":443,"destCidr":"192.168.1.0/24","srcPort":"Any","srcCidr":"Any","syslogEnabled":false}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/cellularFirewallRules'
```
* request: updateNetworkCellularFirewallRules
* url: updateNetworkCellularFirewallRulesURL
* method: updateNetworkCellularFirewallRules_TYPE
* raw_url: updateNetworkCellularFirewallRules_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const updateNetworkCellularFirewallRules = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/cellularFirewallRules'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkCellularFirewallRules_RAW_URL = function () {
    return '/networks/{networkId}/cellularFirewallRules'
}
export const updateNetworkCellularFirewallRules_TYPE = function () {
    return 'put'
}
export const updateNetworkCellularFirewallRulesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/cellularFirewallRules'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Returns all configured analytic zones for this camera
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/camera/analytics/zones'
```
* request: getDeviceCameraAnalyticsZones
* url: getDeviceCameraAnalyticsZonesURL
* method: getDeviceCameraAnalyticsZones_TYPE
* raw_url: getDeviceCameraAnalyticsZones_RAW_URL
     * @param serial - 
*/
export const getDeviceCameraAnalyticsZones = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/devices/{serial}/camera/analytics/zones'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getDeviceCameraAnalyticsZones_RAW_URL = function () {
    return '/devices/{serial}/camera/analytics/zones'
}
export const getDeviceCameraAnalyticsZones_TYPE = function () {
    return 'get'
}
export const getDeviceCameraAnalyticsZonesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/devices/{serial}/camera/analytics/zones'
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Returns most recent record for analytics zones
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/camera/analytics/recent'
```
* request: getDeviceCameraAnalyticsRecent
* url: getDeviceCameraAnalyticsRecentURL
* method: getDeviceCameraAnalyticsRecent_TYPE
* raw_url: getDeviceCameraAnalyticsRecent_RAW_URL
     * @param serial - 
*/
export const getDeviceCameraAnalyticsRecent = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/devices/{serial}/camera/analytics/recent'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getDeviceCameraAnalyticsRecent_RAW_URL = function () {
    return '/devices/{serial}/camera/analytics/recent'
}
export const getDeviceCameraAnalyticsRecent_TYPE = function () {
    return 'get'
}
export const getDeviceCameraAnalyticsRecentURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/devices/{serial}/camera/analytics/recent'
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Returns live state from camera of analytics zones
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/camera/analytics/live'
```
* request: getDeviceCameraAnalyticsLive
* url: getDeviceCameraAnalyticsLiveURL
* method: getDeviceCameraAnalyticsLive_TYPE
* raw_url: getDeviceCameraAnalyticsLive_RAW_URL
     * @param serial - 
*/
export const getDeviceCameraAnalyticsLive = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/devices/{serial}/camera/analytics/live'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getDeviceCameraAnalyticsLive_RAW_URL = function () {
    return '/devices/{serial}/camera/analytics/live'
}
export const getDeviceCameraAnalyticsLive_TYPE = function () {
    return 'get'
}
export const getDeviceCameraAnalyticsLiveURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/devices/{serial}/camera/analytics/live'
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Returns an overview of aggregate analytics data for a timespan
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/{serial}/camera/analytics/overview'
```
* request: getDeviceCameraAnalyticsOverview
* url: getDeviceCameraAnalyticsOverviewURL
* method: getDeviceCameraAnalyticsOverview_TYPE
* raw_url: getDeviceCameraAnalyticsOverview_RAW_URL
     * @param serial - 
     * @param t0 - The beginning of the timespan for the data. The maximum lookback period is 12 months from today.
     * @param t1 - The end of the timespan for the data. t1 can be a maximum of 7 days after t0.
     * @param timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 604800. The default is 3600.
*/
export const getDeviceCameraAnalyticsOverview = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/devices/{serial}/camera/analytics/overview'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters['t0'] !== undefined) {
        queryParameters['t0'] = parameters['t0']
    }
    if (parameters['t1'] !== undefined) {
        queryParameters['t1'] = parameters['t1']
    }
    if (parameters['timespan'] !== undefined) {
        queryParameters['timespan'] = parameters['timespan']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getDeviceCameraAnalyticsOverview_RAW_URL = function () {
    return '/devices/{serial}/camera/analytics/overview'
}
export const getDeviceCameraAnalyticsOverview_TYPE = function () {
    return 'get'
}
export const getDeviceCameraAnalyticsOverviewURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/devices/{serial}/camera/analytics/overview'
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['t0'] !== undefined) {
        queryParameters['t0'] = parameters['t0']
    }
    if (parameters['t1'] !== undefined) {
        queryParameters['t1'] = parameters['t1']
    }
    if (parameters['timespan'] !== undefined) {
        queryParameters['timespan'] = parameters['timespan']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return historical records for analytic zones
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/{serial}/camera/analytics/zones/{zoneId}/history'
```
* request: getDeviceCameraAnalyticsZoneHistory
* url: getDeviceCameraAnalyticsZoneHistoryURL
* method: getDeviceCameraAnalyticsZoneHistory_TYPE
* raw_url: getDeviceCameraAnalyticsZoneHistory_RAW_URL
     * @param serial - 
     * @param zoneId - 
     * @param t0 - The beginning of the timespan for the data. The maximum lookback period is 12 months from today.
     * @param t1 - The end of the timespan for the data. t1 can be a maximum of about 14 hours after t0.
     * @param timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 50400. The default is 3600.
     * @param resolution - The time resolution in seconds for returned data. The valid resolutions are: 60. The default is 60.
*/
export const getDeviceCameraAnalyticsZoneHistory = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/devices/{serial}/camera/analytics/zones/{zoneId}/history'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    path = path.replace('{zoneId}', `${parameters['zoneId']}`)
    if (parameters['zoneId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: zoneId'))
    }
    if (parameters['t0'] !== undefined) {
        queryParameters['t0'] = parameters['t0']
    }
    if (parameters['t1'] !== undefined) {
        queryParameters['t1'] = parameters['t1']
    }
    if (parameters['timespan'] !== undefined) {
        queryParameters['timespan'] = parameters['timespan']
    }
    if (parameters['resolution'] !== undefined) {
        queryParameters['resolution'] = parameters['resolution']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getDeviceCameraAnalyticsZoneHistory_RAW_URL = function () {
    return '/devices/{serial}/camera/analytics/zones/{zoneId}/history'
}
export const getDeviceCameraAnalyticsZoneHistory_TYPE = function () {
    return 'get'
}
export const getDeviceCameraAnalyticsZoneHistoryURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/devices/{serial}/camera/analytics/zones/{zoneId}/history'
    path = path.replace('{serial}', `${parameters['serial']}`)
    path = path.replace('{zoneId}', `${parameters['zoneId']}`)
    if (parameters['t0'] !== undefined) {
        queryParameters['t0'] = parameters['t0']
    }
    if (parameters['t1'] !== undefined) {
        queryParameters['t1'] = parameters['t1']
    }
    if (parameters['timespan'] !== undefined) {
        queryParameters['timespan'] = parameters['timespan']
    }
    if (parameters['resolution'] !== undefined) {
        queryParameters['resolution'] = parameters['resolution']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the syslog servers for a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/syslogServers'
```
* request: getNetworkSyslogServers
* url: getNetworkSyslogServersURL
* method: getNetworkSyslogServers_TYPE
* raw_url: getNetworkSyslogServers_RAW_URL
     * @param networkId - 
     * @param perPage - The number of entries per page returned
     * @param startingAfter - A token used by the server to indicate the start of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
     * @param endingBefore - A token used by the server to indicate the end of the page. Often this is a timestamp or an ID but it is not limited to those. This parameter should not be defined by client applications. The link for the first, last, prev, or next page in the HTTP Link header should define it.
*/
export const getNetworkSyslogServers = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/syslogServers'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['perPage'] !== undefined) {
        queryParameters['perPage'] = parameters['perPage']
    }
    if (parameters['startingAfter'] !== undefined) {
        queryParameters['startingAfter'] = parameters['startingAfter']
    }
    if (parameters['endingBefore'] !== undefined) {
        queryParameters['endingBefore'] = parameters['endingBefore']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkSyslogServers_RAW_URL = function () {
    return '/networks/{networkId}/syslogServers'
}
export const getNetworkSyslogServers_TYPE = function () {
    return 'get'
}
export const getNetworkSyslogServersURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/syslogServers'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['perPage'] !== undefined) {
        queryParameters['perPage'] = parameters['perPage']
    }
    if (parameters['startingAfter'] !== undefined) {
        queryParameters['startingAfter'] = parameters['startingAfter']
    }
    if (parameters['endingBefore'] !== undefined) {
        queryParameters['endingBefore'] = parameters['endingBefore']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the syslog servers for a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"servers":[{"host":"1.2.3.4","port":443,"roles":["Wireless event log","URLs"]}]}' 'https://api.meraki.com/api/v0/networks/{networkId}/syslogServers'
```
* request: updateNetworkSyslogServers
* url: updateNetworkSyslogServersURL
* method: updateNetworkSyslogServers_TYPE
* raw_url: updateNetworkSyslogServers_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const updateNetworkSyslogServers = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/syslogServers'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters['body'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: body'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkSyslogServers_RAW_URL = function () {
    return '/networks/{networkId}/syslogServers'
}
export const updateNetworkSyslogServers_TYPE = function () {
    return 'put'
}
export const updateNetworkSyslogServersURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/syslogServers'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List all the phone conference rooms in a network.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms'
```
* request: getNetworkPhoneConferenceRooms
* url: getNetworkPhoneConferenceRoomsURL
* method: getNetworkPhoneConferenceRooms_TYPE
* raw_url: getNetworkPhoneConferenceRooms_RAW_URL
     * @param networkId - 
*/
export const getNetworkPhoneConferenceRooms = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneConferenceRooms'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneConferenceRooms_RAW_URL = function () {
    return '/networks/{networkId}/phoneConferenceRooms'
}
export const getNetworkPhoneConferenceRooms_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneConferenceRoomsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneConferenceRooms'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Add a conference room.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Meraki Conference Room"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms'
```
* request: createNetworkPhoneConferenceRooms
* url: createNetworkPhoneConferenceRoomsURL
* method: createNetworkPhoneConferenceRooms_TYPE
* raw_url: createNetworkPhoneConferenceRooms_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkPhoneConferenceRooms = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneConferenceRooms'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkPhoneConferenceRooms_RAW_URL = function () {
    return '/networks/{networkId}/phoneConferenceRooms'
}
export const createNetworkPhoneConferenceRooms_TYPE = function () {
    return 'post'
}
export const createNetworkPhoneConferenceRoomsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneConferenceRooms'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Show a conference room's details.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms/[id]'
```
* request: getNetworkPhoneConferenceRoom
* url: getNetworkPhoneConferenceRoomURL
* method: getNetworkPhoneConferenceRoom_TYPE
* raw_url: getNetworkPhoneConferenceRoom_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const getNetworkPhoneConferenceRoom = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneConferenceRooms/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneConferenceRoom_RAW_URL = function () {
    return '/networks/{networkId}/phoneConferenceRooms/{id}'
}
export const getNetworkPhoneConferenceRoom_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneConferenceRoomURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneConferenceRooms/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update a conference room's. Only submit parameters you would like to update. Omitting any parameters will leave them as-is.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Meraki Conference Room"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms/[id]'
```
* request: updateNetworkPhoneConferenceRoom
* url: updateNetworkPhoneConferenceRoomURL
* method: updateNetworkPhoneConferenceRoom_TYPE
* raw_url: updateNetworkPhoneConferenceRoom_RAW_URL
     * @param networkId - 
     * @param id - 
     * @param body - 
*/
export const updateNetworkPhoneConferenceRoom = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneConferenceRooms/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkPhoneConferenceRoom_RAW_URL = function () {
    return '/networks/{networkId}/phoneConferenceRooms/{id}'
}
export const updateNetworkPhoneConferenceRoom_TYPE = function () {
    return 'put'
}
export const updateNetworkPhoneConferenceRoomURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneConferenceRooms/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete a conference room.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneConferenceRooms/[id]'
```
* request: deleteNetworkPhoneConferenceRoom
* url: deleteNetworkPhoneConferenceRoomURL
* method: deleteNetworkPhoneConferenceRoom_TYPE
* raw_url: deleteNetworkPhoneConferenceRoom_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const deleteNetworkPhoneConferenceRoom = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneConferenceRooms/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkPhoneConferenceRoom_RAW_URL = function () {
    return '/networks/{networkId}/phoneConferenceRooms/{id}'
}
export const deleteNetworkPhoneConferenceRoom_TYPE = function () {
    return 'delete'
}
export const deleteNetworkPhoneConferenceRoomURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneConferenceRooms/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List all phones in a network and their contact assignment
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments'
```
* request: getNetworkPhoneAssignments
* url: getNetworkPhoneAssignmentsURL
* method: getNetworkPhoneAssignments_TYPE
* raw_url: getNetworkPhoneAssignments_RAW_URL
     * @param networkId - 
*/
export const getNetworkPhoneAssignments = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneAssignments'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneAssignments_RAW_URL = function () {
    return '/networks/{networkId}/phoneAssignments'
}
export const getNetworkPhoneAssignments_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneAssignmentsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneAssignments'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a phone's contact assignment
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments/[serial]'
```
* request: getNetworkPhoneAssignment
* url: getNetworkPhoneAssignmentURL
* method: getNetworkPhoneAssignment_TYPE
* raw_url: getNetworkPhoneAssignment_RAW_URL
     * @param networkId - 
     * @param serial - 
*/
export const getNetworkPhoneAssignment = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneAssignments/{serial}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneAssignment_RAW_URL = function () {
    return '/networks/{networkId}/phoneAssignments/{serial}'
}
export const getNetworkPhoneAssignment_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneAssignmentURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneAssignments/{serial}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Assign a contact and number(s) to a phone
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"contactId":"823","contactType":"Google","publicNumber":["+15555555555"],"ext":"1234"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments/[serial]'
```
* request: updateNetworkPhoneAssignment
* url: updateNetworkPhoneAssignmentURL
* method: updateNetworkPhoneAssignment_TYPE
* raw_url: updateNetworkPhoneAssignment_RAW_URL
     * @param networkId - 
     * @param serial - 
     * @param body - 
*/
export const updateNetworkPhoneAssignment = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneAssignments/{serial}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkPhoneAssignment_RAW_URL = function () {
    return '/networks/{networkId}/phoneAssignments/{serial}'
}
export const updateNetworkPhoneAssignment_TYPE = function () {
    return 'put'
}
export const updateNetworkPhoneAssignmentURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneAssignments/{serial}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Remove a phone assignment (unprovision a phone)
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAssignments/[serial]'
```
* request: deleteNetworkPhoneAssignment
* url: deleteNetworkPhoneAssignmentURL
* method: deleteNetworkPhoneAssignment_TYPE
* raw_url: deleteNetworkPhoneAssignment_RAW_URL
     * @param networkId - 
     * @param serial - 
*/
export const deleteNetworkPhoneAssignment = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneAssignments/{serial}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkPhoneAssignment_RAW_URL = function () {
    return '/networks/{networkId}/phoneAssignments/{serial}'
}
export const deleteNetworkPhoneAssignment_TYPE = function () {
    return 'delete'
}
export const deleteNetworkPhoneAssignmentURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneAssignments/{serial}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List all call groups in a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups'
```
* request: getNetworkPhoneCallgroups
* url: getNetworkPhoneCallgroupsURL
* method: getNetworkPhoneCallgroups_TYPE
* raw_url: getNetworkPhoneCallgroups_RAW_URL
     * @param networkId - 
*/
export const getNetworkPhoneCallgroups = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneCallgroups'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneCallgroups_RAW_URL = function () {
    return '/networks/{networkId}/phoneCallgroups'
}
export const getNetworkPhoneCallgroups_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneCallgroupsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneCallgroups'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Show a call group's details
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/[id]'
```
* request: getNetworkPhoneCallgroup
* url: getNetworkPhoneCallgroupURL
* method: getNetworkPhoneCallgroup_TYPE
* raw_url: getNetworkPhoneCallgroup_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const getNetworkPhoneCallgroup = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneCallgroups/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneCallgroup_RAW_URL = function () {
    return '/networks/{networkId}/phoneCallgroups/{id}'
}
export const getNetworkPhoneCallgroup_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneCallgroupURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneCallgroups/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update a call group's details. Only submit parameters you would like to update. Omitting any parameters will leave them as-is.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ext":"1234","publicNumber":"+15555555555","ringStrategy":"ring-all","scope":"some","tags":["sales","support"],"noAnswerAction":"transfer-to-ext","transferExtension":"1003"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/[id]'
```
* request: updateNetworkPhoneCallgroup
* url: updateNetworkPhoneCallgroupURL
* method: updateNetworkPhoneCallgroup_TYPE
* raw_url: updateNetworkPhoneCallgroup_RAW_URL
     * @param networkId - 
     * @param id - 
     * @param body - 
*/
export const updateNetworkPhoneCallgroup = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneCallgroups/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkPhoneCallgroup_RAW_URL = function () {
    return '/networks/{networkId}/phoneCallgroups/{id}'
}
export const updateNetworkPhoneCallgroup_TYPE = function () {
    return 'put'
}
export const updateNetworkPhoneCallgroupURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneCallgroups/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete a call group
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/[id]'
```
* request: deleteNetworkPhoneCallgroup
* url: deleteNetworkPhoneCallgroupURL
* method: deleteNetworkPhoneCallgroup_TYPE
* raw_url: deleteNetworkPhoneCallgroup_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const deleteNetworkPhoneCallgroup = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneCallgroups/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkPhoneCallgroup_RAW_URL = function () {
    return '/networks/{networkId}/phoneCallgroups/{id}'
}
export const deleteNetworkPhoneCallgroup_TYPE = function () {
    return 'delete'
}
export const deleteNetworkPhoneCallgroupURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneCallgroups/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Create a new call group.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Sales Group","ext":"1234","publicNumber":"+15555555555","ringStrategy":"ring-all","scope":"some","tags":["sales","support"],"noAnswerAction":"transfer-to-ext","transferExtension":"1003"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneCallgroups/'
```
* request: createNetworkPhoneCallgroups
* url: createNetworkPhoneCallgroupsURL
* method: createNetworkPhoneCallgroups_TYPE
* raw_url: createNetworkPhoneCallgroups_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkPhoneCallgroups = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneCallgroups/'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkPhoneCallgroups_RAW_URL = function () {
    return '/networks/{networkId}/phoneCallgroups/'
}
export const createNetworkPhoneCallgroups_TYPE = function () {
    return 'post'
}
export const createNetworkPhoneCallgroupsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneCallgroups/'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List all the phone numbers in a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneNumbers'
```
* request: getNetworkPhoneNumbers
* url: getNetworkPhoneNumbersURL
* method: getNetworkPhoneNumbers_TYPE
* raw_url: getNetworkPhoneNumbers_RAW_URL
     * @param networkId - 
*/
export const getNetworkPhoneNumbers = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneNumbers'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneNumbers_RAW_URL = function () {
    return '/networks/{networkId}/phoneNumbers'
}
export const getNetworkPhoneNumbers_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneNumbersURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneNumbers'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the available phone numbers in a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneNumbers/available'
```
* request: getNetworkPhoneNumbersAvailable
* url: getNetworkPhoneNumbersAvailableURL
* method: getNetworkPhoneNumbersAvailable_TYPE
* raw_url: getNetworkPhoneNumbersAvailable_RAW_URL
     * @param networkId - 
*/
export const getNetworkPhoneNumbersAvailable = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneNumbers/available'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneNumbersAvailable_RAW_URL = function () {
    return '/networks/{networkId}/phoneNumbers/available'
}
export const getNetworkPhoneNumbersAvailable_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneNumbersAvailableURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneNumbers/available'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List all announcement groups in a network.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAnnouncements'
```
* request: getNetworkPhoneAnnouncements
* url: getNetworkPhoneAnnouncementsURL
* method: getNetworkPhoneAnnouncements_TYPE
* raw_url: getNetworkPhoneAnnouncements_RAW_URL
     * @param networkId - 
*/
export const getNetworkPhoneAnnouncements = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneAnnouncements'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneAnnouncements_RAW_URL = function () {
    return '/networks/{networkId}/phoneAnnouncements'
}
export const getNetworkPhoneAnnouncements_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneAnnouncementsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneAnnouncements'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Add an announcement group.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My announcement group"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAnnouncements'
```
* request: createNetworkPhoneAnnouncements
* url: createNetworkPhoneAnnouncementsURL
* method: createNetworkPhoneAnnouncements_TYPE
* raw_url: createNetworkPhoneAnnouncements_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkPhoneAnnouncements = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneAnnouncements'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkPhoneAnnouncements_RAW_URL = function () {
    return '/networks/{networkId}/phoneAnnouncements'
}
export const createNetworkPhoneAnnouncements_TYPE = function () {
    return 'post'
}
export const createNetworkPhoneAnnouncementsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneAnnouncements'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete an announcement group.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneAnnouncements/[id]'
```
* request: deleteNetworkPhoneAnnouncement
* url: deleteNetworkPhoneAnnouncementURL
* method: deleteNetworkPhoneAnnouncement_TYPE
* raw_url: deleteNetworkPhoneAnnouncement_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const deleteNetworkPhoneAnnouncement = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneAnnouncements/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkPhoneAnnouncement_RAW_URL = function () {
    return '/networks/{networkId}/phoneAnnouncements/{id}'
}
export const deleteNetworkPhoneAnnouncement_TYPE = function () {
    return 'delete'
}
export const deleteNetworkPhoneAnnouncementURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneAnnouncements/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the phone contacts in a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts'
```
* request: getNetworkPhoneContacts
* url: getNetworkPhoneContactsURL
* method: getNetworkPhoneContacts_TYPE
* raw_url: getNetworkPhoneContacts_RAW_URL
     * @param networkId - 
*/
export const getNetworkPhoneContacts = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneContacts'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPhoneContacts_RAW_URL = function () {
    return '/networks/{networkId}/phoneContacts'
}
export const getNetworkPhoneContacts_TYPE = function () {
    return 'get'
}
export const getNetworkPhoneContactsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneContacts'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Add a contact
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Miles Meraki"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts'
```
* request: createNetworkPhoneContacts
* url: createNetworkPhoneContactsURL
* method: createNetworkPhoneContacts_TYPE
* raw_url: createNetworkPhoneContacts_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkPhoneContacts = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneContacts'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkPhoneContacts_RAW_URL = function () {
    return '/networks/{networkId}/phoneContacts'
}
export const createNetworkPhoneContacts_TYPE = function () {
    return 'post'
}
export const createNetworkPhoneContactsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneContacts'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update a phone contact. Google Directory contacts cannot be modified.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Miles Meraki"}' 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts/[contactId]'
```
* request: updateNetworkPhoneContact
* url: updateNetworkPhoneContactURL
* method: updateNetworkPhoneContact_TYPE
* raw_url: updateNetworkPhoneContact_RAW_URL
     * @param networkId - 
     * @param contactId - 
     * @param body - 
*/
export const updateNetworkPhoneContact = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneContacts/{contactId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{contactId}', `${parameters['contactId']}`)
    if (parameters['contactId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: contactId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkPhoneContact_RAW_URL = function () {
    return '/networks/{networkId}/phoneContacts/{contactId}'
}
export const updateNetworkPhoneContact_TYPE = function () {
    return 'put'
}
export const updateNetworkPhoneContactURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneContacts/{contactId}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{contactId}', `${parameters['contactId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete a phone contact. Google Directory contacts cannot be removed.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/phoneContacts/[contactId]'
```
* request: deleteNetworkPhoneContact
* url: deleteNetworkPhoneContactURL
* method: deleteNetworkPhoneContact_TYPE
* raw_url: deleteNetworkPhoneContact_RAW_URL
     * @param networkId - 
     * @param contactId - 
*/
export const deleteNetworkPhoneContact = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/phoneContacts/{contactId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{contactId}', `${parameters['contactId']}`)
    if (parameters['contactId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: contactId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkPhoneContact_RAW_URL = function () {
    return '/networks/{networkId}/phoneContacts/{contactId}'
}
export const deleteNetworkPhoneContact_TYPE = function () {
    return 'delete'
}
export const deleteNetworkPhoneContactURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/phoneContacts/{contactId}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{contactId}', `${parameters['contactId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the clients of a device, up to a maximum of a month ago. The usage of each client is returned in kilobytes. If the device is a switch, the switchport is returned; otherwise the switchport field is null.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/clients?timespan=7200'
```
* request: getDeviceClients
* url: getDeviceClientsURL
* method: getDeviceClients_TYPE
* raw_url: getDeviceClients_RAW_URL
     * @param serial - 
     * @param body - 
*/
export const getDeviceClients = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/devices/{serial}/clients'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getDeviceClients_RAW_URL = function () {
    return '/devices/{serial}/clients'
}
export const getDeviceClients_TYPE = function () {
    return 'get'
}
export const getDeviceClientsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/devices/{serial}/clients'
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the client associated with the given identifier. This endpoint will lookup by client ID or either the MAC or IP depending on whether the network uses Track-by-IP.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[id_or_mac_or_ip]'
```
* request: getNetworkClient
* url: getNetworkClientURL
* method: getNetworkClient_TYPE
* raw_url: getNetworkClient_RAW_URL
     * @param networkId - 
     * @param idOrMacOrIp - 
*/
export const getNetworkClient = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters['idOrMacOrIp'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: idOrMacOrIp'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClient_RAW_URL = function () {
    return '/networks/{networkId}/clients/{id_or_mac_or_ip}'
}
export const getNetworkClient_TYPE = function () {
    return 'get'
}
export const getNetworkClientURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the client's daily usage history. Usage data is in kilobytes.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[id_or_mac_or_ip]/usageHistory'
```
* request: getNetworkClientUsageHistory
* url: getNetworkClientUsageHistoryURL
* method: getNetworkClientUsageHistory_TYPE
* raw_url: getNetworkClientUsageHistory_RAW_URL
     * @param networkId - 
     * @param idOrMacOrIp - 
*/
export const getNetworkClientUsageHistory = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}/usageHistory'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters['idOrMacOrIp'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: idOrMacOrIp'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientUsageHistory_RAW_URL = function () {
    return '/networks/{networkId}/clients/{id_or_mac_or_ip}/usageHistory'
}
export const getNetworkClientUsageHistory_TYPE = function () {
    return 'get'
}
export const getNetworkClientUsageHistoryURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}/usageHistory'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the client's network traffic data over time. Usage data is in kilobytes. This endpoint requires detailed traffic analysis to be enabled on the Network-wide > General page.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[id_or_mac_or_ip]/trafficHistory'
```
* request: getNetworkClientTrafficHistory
* url: getNetworkClientTrafficHistoryURL
* method: getNetworkClientTrafficHistory_TYPE
* raw_url: getNetworkClientTrafficHistory_RAW_URL
     * @param networkId - 
     * @param idOrMacOrIp - 
     * @param body - 
*/
export const getNetworkClientTrafficHistory = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}/trafficHistory'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters['idOrMacOrIp'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: idOrMacOrIp'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientTrafficHistory_RAW_URL = function () {
    return '/networks/{networkId}/clients/{id_or_mac_or_ip}/trafficHistory'
}
export const getNetworkClientTrafficHistory_TYPE = function () {
    return 'get'
}
export const getNetworkClientTrafficHistoryURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}/trafficHistory'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the events associated with this client.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[id_or_mac_or_ip]/events'
```
* request: getNetworkClientEvents
* url: getNetworkClientEventsURL
* method: getNetworkClientEvents_TYPE
* raw_url: getNetworkClientEvents_RAW_URL
     * @param networkId - 
     * @param idOrMacOrIp - 
     * @param body - 
*/
export const getNetworkClientEvents = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}/events'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters['idOrMacOrIp'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: idOrMacOrIp'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientEvents_RAW_URL = function () {
    return '/networks/{networkId}/clients/{id_or_mac_or_ip}/events'
}
export const getNetworkClientEvents_TYPE = function () {
    return 'get'
}
export const getNetworkClientEventsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}/events'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the latency history for a client. The latency data is from a sample of 2% of packets and is grouped into 4 traffic categories: background, best effort, video, voice. Within these categories the sampled packet counters are bucketed by latency in milliseconds.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[id_or_mac_or_ip]/latencyHistory?timespan=7200'
```
* request: getNetworkClientLatencyHistory
* url: getNetworkClientLatencyHistoryURL
* method: getNetworkClientLatencyHistory_TYPE
* raw_url: getNetworkClientLatencyHistory_RAW_URL
     * @param networkId - 
     * @param idOrMacOrIp - 
     * @param body - 
*/
export const getNetworkClientLatencyHistory = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}/latencyHistory'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters['idOrMacOrIp'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: idOrMacOrIp'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientLatencyHistory_RAW_URL = function () {
    return '/networks/{networkId}/clients/{id_or_mac_or_ip}/latencyHistory'
}
export const getNetworkClientLatencyHistory_TYPE = function () {
    return 'get'
}
export const getNetworkClientLatencyHistoryURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{id_or_mac_or_ip}/latencyHistory'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id_or_mac_or_ip}', `${parameters['idOrMacOrIp']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the policy assigned to a client on the network.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[mac]/policy?timespan=7200'
```
* request: getNetworkClientPolicy
* url: getNetworkClientPolicyURL
* method: getNetworkClientPolicy_TYPE
* raw_url: getNetworkClientPolicy_RAW_URL
     * @param networkId - 
     * @param mac - 
     * @param body - 
*/
export const getNetworkClientPolicy = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{mac}/policy'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{mac}', `${parameters['mac']}`)
    if (parameters['mac'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: mac'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientPolicy_RAW_URL = function () {
    return '/networks/{networkId}/clients/{mac}/policy'
}
export const getNetworkClientPolicy_TYPE = function () {
    return 'get'
}
export const getNetworkClientPolicyURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{mac}/policy'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{mac}', `${parameters['mac']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the policy assigned to a client on the network.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"mac":"00:11:22:33:44:55","type":"Group policy","groupPolicyId":"101"}' 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[mac]/policy'
```
* request: updateNetworkClientPolicy
* url: updateNetworkClientPolicyURL
* method: updateNetworkClientPolicy_TYPE
* raw_url: updateNetworkClientPolicy_RAW_URL
     * @param networkId - 
     * @param mac - 
     * @param body - 
*/
export const updateNetworkClientPolicy = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{mac}/policy'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{mac}', `${parameters['mac']}`)
    if (parameters['mac'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: mac'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkClientPolicy_RAW_URL = function () {
    return '/networks/{networkId}/clients/{mac}/policy'
}
export const updateNetworkClientPolicy_TYPE = function () {
    return 'put'
}
export const updateNetworkClientPolicyURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{mac}/policy'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{mac}', `${parameters['mac']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the splash authorization for a client, for each SSID they've associated with through splash.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/clients/[mac]/splashAuthorizationStatus'
```
* request: getNetworkClientSplashAuthorizationStatus
* url: getNetworkClientSplashAuthorizationStatusURL
* method: getNetworkClientSplashAuthorizationStatus_TYPE
* raw_url: getNetworkClientSplashAuthorizationStatus_RAW_URL
     * @param id - 
     * @param mac - 
*/
export const getNetworkClientSplashAuthorizationStatus = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/clients/{mac}/splashAuthorizationStatus'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    path = path.replace('{mac}', `${parameters['mac']}`)
    if (parameters['mac'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: mac'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientSplashAuthorizationStatus_RAW_URL = function () {
    return '/networks/{id}/clients/{mac}/splashAuthorizationStatus'
}
export const getNetworkClientSplashAuthorizationStatus_TYPE = function () {
    return 'get'
}
export const getNetworkClientSplashAuthorizationStatusURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/clients/{mac}/splashAuthorizationStatus'
    path = path.replace('{id}', `${parameters['id']}`)
    path = path.replace('{mac}', `${parameters['mac']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update a client's splash authorization.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"ssids":{"0":{"isAuthorized":true,"authorizedAt":"2017-07-19 16:24:13 UTC","expiresAt":"2017-07-20 16:24:13 UTC"},"2":{"isAuthorized":false}}}' 'https://api.meraki.com/api/v0/networks/[id]/clients/[mac]/splashAuthorizationStatus'
```
* request: updateNetworkClientSplashAuthorizationStatus
* url: updateNetworkClientSplashAuthorizationStatusURL
* method: updateNetworkClientSplashAuthorizationStatus_TYPE
* raw_url: updateNetworkClientSplashAuthorizationStatus_RAW_URL
     * @param id - 
     * @param mac - 
     * @param body - 
*/
export const updateNetworkClientSplashAuthorizationStatus = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/clients/{mac}/splashAuthorizationStatus'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    path = path.replace('{mac}', `${parameters['mac']}`)
    if (parameters['mac'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: mac'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkClientSplashAuthorizationStatus_RAW_URL = function () {
    return '/networks/{id}/clients/{mac}/splashAuthorizationStatus'
}
export const updateNetworkClientSplashAuthorizationStatus_TYPE = function () {
    return 'put'
}
export const updateNetworkClientSplashAuthorizationStatusURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/clients/{mac}/splashAuthorizationStatus'
    path = path.replace('{id}', `${parameters['id']}`)
    path = path.replace('{mac}', `${parameters['mac']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the networks in an organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/networks'
```
* request: getOrganizationNetworks
* url: getOrganizationNetworksURL
* method: getOrganizationNetworks_TYPE
* raw_url: getOrganizationNetworks_RAW_URL
     * @param organizationId - 
     * @param body - 
*/
export const getOrganizationNetworks = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/networks'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationNetworks_RAW_URL = function () {
    return '/organizations/{organizationId}/networks'
}
export const getOrganizationNetworks_TYPE = function () {
    return 'get'
}
export const getOrganizationNetworksURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/networks'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Create a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My organization","type":"appliance switch camera","tags":" tag1 tag2 ","disableMyMerakiCom":false}' 'https://api.meraki.com/api/v0/organizations/[organizationId]/networks'
```
* request: createOrganizationNetworks
* url: createOrganizationNetworksURL
* method: createOrganizationNetworks_TYPE
* raw_url: createOrganizationNetworks_RAW_URL
     * @param organizationId - 
     * @param body - 
*/
export const createOrganizationNetworks = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/networks'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createOrganizationNetworks_RAW_URL = function () {
    return '/organizations/{organizationId}/networks'
}
export const createOrganizationNetworks_TYPE = function () {
    return 'post'
}
export const createOrganizationNetworksURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/networks'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]'
```
* request: getNetwork
* url: getNetworkURL
* method: getNetwork_TYPE
* raw_url: getNetwork_RAW_URL
     * @param id - 
*/
export const getNetwork = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetwork_RAW_URL = function () {
    return '/networks/{id}'
}
export const getNetwork_TYPE = function () {
    return 'get'
}
export const getNetworkURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My organization","timeZone":"America/Los_Angeles","tags":" tag1 tag2 ","disableMyMerakiCom":false}' 'https://api.meraki.com/api/v0/networks/[id]'
```
* request: updateNetwork
* url: updateNetworkURL
* method: updateNetwork_TYPE
* raw_url: updateNetwork_RAW_URL
     * @param id - 
     * @param body - 
*/
export const updateNetwork = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetwork_RAW_URL = function () {
    return '/networks/{id}'
}
export const updateNetwork_TYPE = function () {
    return 'put'
}
export const updateNetworkURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[id]'
```
* request: deleteNetwork
* url: deleteNetworkURL
* method: deleteNetwork_TYPE
* raw_url: deleteNetwork_RAW_URL
     * @param id - 
*/
export const deleteNetwork = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetwork_RAW_URL = function () {
    return '/networks/{id}'
}
export const deleteNetwork_TYPE = function () {
    return 'delete'
}
export const deleteNetworkURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Bind a network to a template.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"configTemplateId":"N_23952905","autoBind":false}' 'https://api.meraki.com/api/v0/networks/[id]/bind'
```
* request: bindNetwork
* url: bindNetworkURL
* method: bindNetwork_TYPE
* raw_url: bindNetwork_RAW_URL
     * @param id - 
     * @param body - 
*/
export const bindNetwork = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/bind'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const bindNetwork_RAW_URL = function () {
    return '/networks/{id}/bind'
}
export const bindNetwork_TYPE = function () {
    return 'post'
}
export const bindNetworkURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/bind'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Unbind a network from a template.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/[id]/unbind'
```
* request: unbindNetwork
* url: unbindNetworkURL
* method: unbindNetwork_TYPE
* raw_url: unbindNetwork_RAW_URL
     * @param id - 
*/
export const unbindNetwork = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/unbind'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const unbindNetwork_RAW_URL = function () {
    return '/networks/{id}/unbind'
}
export const unbindNetwork_TYPE = function () {
    return 'post'
}
export const unbindNetworkURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/unbind'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the site-to-site VPN settings of a network. Only valid for MX networks.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/siteToSiteVpn'
```
* request: getNetworkSiteToSiteVpn
* url: getNetworkSiteToSiteVpnURL
* method: getNetworkSiteToSiteVpn_TYPE
* raw_url: getNetworkSiteToSiteVpn_RAW_URL
     * @param id - 
*/
export const getNetworkSiteToSiteVpn = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/siteToSiteVpn'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkSiteToSiteVpn_RAW_URL = function () {
    return '/networks/{id}/siteToSiteVpn'
}
export const getNetworkSiteToSiteVpn_TYPE = function () {
    return 'get'
}
export const getNetworkSiteToSiteVpnURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/siteToSiteVpn'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the site-to-site VPN settings of a network. Only valid for MX networks in NAT mode.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"mode":"spoke","hubs":[{"hubId":"N_4901849","useDefaultRoute":true},{"hubId":"N_1892489","useDefaultRoute":false}],"subnets":[{"localSubnet":"192.168.1.0/24","useVpn":true},{"localSubnet":"192.168.128.0/24","useVpn":true}]}' 'https://api.meraki.com/api/v0/networks/[id]/siteToSiteVpn'
```
* request: updateNetworkSiteToSiteVpn
* url: updateNetworkSiteToSiteVpnURL
* method: updateNetworkSiteToSiteVpn_TYPE
* raw_url: updateNetworkSiteToSiteVpn_RAW_URL
     * @param id - 
     * @param body - 
*/
export const updateNetworkSiteToSiteVpn = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/siteToSiteVpn'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkSiteToSiteVpn_RAW_URL = function () {
    return '/networks/{id}/siteToSiteVpn'
}
export const updateNetworkSiteToSiteVpn_TYPE = function () {
    return 'put'
}
export const updateNetworkSiteToSiteVpnURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/siteToSiteVpn'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* The traffic analysis data for this network.
<a href="https://documentation.meraki.com/MR/Monitoring_and_Reporting/Hostname_Visibility">Traffic Analysis with Hostname Visibility</a> must be enabled on the network.
    
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/traffic?timespan=7200'
```
* request: getNetworkTraffic
* url: getNetworkTrafficURL
* method: getNetworkTraffic_TYPE
* raw_url: getNetworkTraffic_RAW_URL
     * @param id - 
     * @param body - 
*/
export const getNetworkTraffic = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/traffic'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkTraffic_RAW_URL = function () {
    return '/networks/{id}/traffic'
}
export const getNetworkTraffic_TYPE = function () {
    return 'get'
}
export const getNetworkTrafficURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/traffic'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the access policies for this network. Only valid for MS networks.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/accessPolicies'
```
* request: getNetworkAccessPolicies
* url: getNetworkAccessPoliciesURL
* method: getNetworkAccessPolicies_TYPE
* raw_url: getNetworkAccessPolicies_RAW_URL
     * @param id - 
*/
export const getNetworkAccessPolicies = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/accessPolicies'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkAccessPolicies_RAW_URL = function () {
    return '/networks/{id}/accessPolicies'
}
export const getNetworkAccessPolicies_TYPE = function () {
    return 'get'
}
export const getNetworkAccessPoliciesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/accessPolicies'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List Air Marshal scan results from a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/airMarshal?timespan=7200'
```
* request: getNetworkAirMarshal
* url: getNetworkAirMarshalURL
* method: getNetworkAirMarshal_TYPE
* raw_url: getNetworkAirMarshal_RAW_URL
     * @param id - 
     * @param body - 
*/
export const getNetworkAirMarshal = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/airMarshal'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkAirMarshal_RAW_URL = function () {
    return '/networks/{id}/airMarshal'
}
export const getNetworkAirMarshal_TYPE = function () {
    return 'get'
}
export const getNetworkAirMarshalURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/airMarshal'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the Bluetooth settings for a network.
<a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a> must be enabled on the network.
    
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/bluetoothSettings'
```
* request: getNetworkBluetoothSettings
* url: getNetworkBluetoothSettingsURL
* method: getNetworkBluetoothSettings_TYPE
* raw_url: getNetworkBluetoothSettings_RAW_URL
     * @param id - 
*/
export const getNetworkBluetoothSettings = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/bluetoothSettings'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkBluetoothSettings_RAW_URL = function () {
    return '/networks/{id}/bluetoothSettings'
}
export const getNetworkBluetoothSettings_TYPE = function () {
    return 'get'
}
export const getNetworkBluetoothSettingsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/bluetoothSettings'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the Bluetooth settings for a network. See the docs page for <a href="https://documentation.meraki.com/MR/Bluetooth/Bluetooth_Low_Energy_(BLE)">Bluetooth settings</a>.
    
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"id":"N_24329156","scanningEnabled":true,"advertisingEnabled":true,"uuid":"00000000-0000-0000-000-000000000000","majorMinorAssignmentMode":"Non-unique","major":1}' 'https://api.meraki.com/api/v0/networks/[id]/bluetoothSettings'
```
* request: updateNetworkBluetoothSettings
* url: updateNetworkBluetoothSettingsURL
* method: updateNetworkBluetoothSettings_TYPE
* raw_url: updateNetworkBluetoothSettings_RAW_URL
     * @param id - 
     * @param body - 
*/
export const updateNetworkBluetoothSettings = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/bluetoothSettings'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkBluetoothSettings_RAW_URL = function () {
    return '/networks/{id}/bluetoothSettings'
}
export const updateNetworkBluetoothSettings_TYPE = function () {
    return 'put'
}
export const updateNetworkBluetoothSettingsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/bluetoothSettings'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the splash or RADIUS users configured under Meraki Authentication for a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/merakiAuthUsers'
```
* request: getNetworkMerakiAuthUsers
* url: getNetworkMerakiAuthUsersURL
* method: getNetworkMerakiAuthUsers_TYPE
* raw_url: getNetworkMerakiAuthUsers_RAW_URL
     * @param networkId - 
*/
export const getNetworkMerakiAuthUsers = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/merakiAuthUsers'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkMerakiAuthUsers_RAW_URL = function () {
    return '/networks/{networkId}/merakiAuthUsers'
}
export const getNetworkMerakiAuthUsers_TYPE = function () {
    return 'get'
}
export const getNetworkMerakiAuthUsersURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/merakiAuthUsers'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the Meraki Auth splash or RADIUS user
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/merakiAuthUsers/[id]'
```
* request: getNetworkMerakiAuthUser
* url: getNetworkMerakiAuthUserURL
* method: getNetworkMerakiAuthUser_TYPE
* raw_url: getNetworkMerakiAuthUser_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const getNetworkMerakiAuthUser = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/merakiAuthUsers/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkMerakiAuthUser_RAW_URL = function () {
    return '/networks/{networkId}/merakiAuthUsers/{id}'
}
export const getNetworkMerakiAuthUser_TYPE = function () {
    return 'get'
}
export const getNetworkMerakiAuthUserURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/merakiAuthUsers/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the HTTP servers for a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers'
```
* request: getNetworkHttpServers
* url: getNetworkHttpServersURL
* method: getNetworkHttpServers_TYPE
* raw_url: getNetworkHttpServers_RAW_URL
     * @param networkId - 
*/
export const getNetworkHttpServers = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/httpServers'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkHttpServers_RAW_URL = function () {
    return '/networks/{networkId}/httpServers'
}
export const getNetworkHttpServers_TYPE = function () {
    return 'get'
}
export const getNetworkHttpServersURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/httpServers'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Add an HTTP server
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My HTTP server","url":"https://www.example.com/webhooks","sharedSecret":"foobar"}' 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers'
```
* request: createNetworkHttpServers
* url: createNetworkHttpServersURL
* method: createNetworkHttpServers_TYPE
* raw_url: createNetworkHttpServers_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkHttpServers = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/httpServers'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkHttpServers_RAW_URL = function () {
    return '/networks/{networkId}/httpServers'
}
export const createNetworkHttpServers_TYPE = function () {
    return 'post'
}
export const createNetworkHttpServersURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/httpServers'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return an HTTP server
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/[id]'
```
* request: getNetworkHttpServer
* url: getNetworkHttpServerURL
* method: getNetworkHttpServer_TYPE
* raw_url: getNetworkHttpServer_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const getNetworkHttpServer = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/httpServers/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkHttpServer_RAW_URL = function () {
    return '/networks/{networkId}/httpServers/{id}'
}
export const getNetworkHttpServer_TYPE = function () {
    return 'get'
}
export const getNetworkHttpServerURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/httpServers/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update an HTTP server
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My HTTP server","url":"https://www.example.com/webhooks","sharedSecret":"foobar"}' 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/[id]'
```
* request: updateNetworkHttpServer
* url: updateNetworkHttpServerURL
* method: updateNetworkHttpServer_TYPE
* raw_url: updateNetworkHttpServer_RAW_URL
     * @param networkId - 
     * @param id - 
     * @param body - 
*/
export const updateNetworkHttpServer = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/httpServers/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkHttpServer_RAW_URL = function () {
    return '/networks/{networkId}/httpServers/{id}'
}
export const updateNetworkHttpServer_TYPE = function () {
    return 'put'
}
export const updateNetworkHttpServerURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/httpServers/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete an HTTP server
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/[id]'
```
* request: deleteNetworkHttpServer
* url: deleteNetworkHttpServerURL
* method: deleteNetworkHttpServer_TYPE
* raw_url: deleteNetworkHttpServer_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const deleteNetworkHttpServer = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/httpServers/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkHttpServer_RAW_URL = function () {
    return '/networks/{networkId}/httpServers/{id}'
}
export const deleteNetworkHttpServer_TYPE = function () {
    return 'delete'
}
export const deleteNetworkHttpServerURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/httpServers/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Send a test webhook
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/webhookTests'
```
* request: createNetworkHttpServersWebhookTests
* url: createNetworkHttpServersWebhookTestsURL
* method: createNetworkHttpServersWebhookTests_TYPE
* raw_url: createNetworkHttpServersWebhookTests_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkHttpServersWebhookTests = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/httpServers/webhookTests'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkHttpServersWebhookTests_RAW_URL = function () {
    return '/networks/{networkId}/httpServers/webhookTests'
}
export const createNetworkHttpServersWebhookTests_TYPE = function () {
    return 'post'
}
export const createNetworkHttpServersWebhookTestsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/httpServers/webhookTests'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the status of a webhook test
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/httpServers/webhookTests/[id]'
```
* request: getNetworkHttpServersWebhookTest
* url: getNetworkHttpServersWebhookTestURL
* method: getNetworkHttpServersWebhookTest_TYPE
* raw_url: getNetworkHttpServersWebhookTest_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const getNetworkHttpServersWebhookTest = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/httpServers/webhookTests/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkHttpServersWebhookTest_RAW_URL = function () {
    return '/networks/{networkId}/httpServers/webhookTests/{id}'
}
export const getNetworkHttpServersWebhookTest_TYPE = function () {
    return 'get'
}
export const getNetworkHttpServersWebhookTestURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/httpServers/webhookTests/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the Bluetooth clients seen by APs in this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/bluetoothClients?timespan=7200'
```
* request: getNetworkBluetoothClients
* url: getNetworkBluetoothClientsURL
* method: getNetworkBluetoothClients_TYPE
* raw_url: getNetworkBluetoothClients_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkBluetoothClients = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/bluetoothClients'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkBluetoothClients_RAW_URL = function () {
    return '/networks/{networkId}/bluetoothClients'
}
export const getNetworkBluetoothClients_TYPE = function () {
    return 'get'
}
export const getNetworkBluetoothClientsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/bluetoothClients'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a Bluetooth client
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/bluetoothClients/[id]'
```
* request: getNetworkBluetoothClient
* url: getNetworkBluetoothClientURL
* method: getNetworkBluetoothClient_TYPE
* raw_url: getNetworkBluetoothClient_RAW_URL
     * @param networkId - 
     * @param id - 
     * @param body - 
*/
export const getNetworkBluetoothClient = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/bluetoothClients/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkBluetoothClient_RAW_URL = function () {
    return '/networks/{networkId}/bluetoothClients/{id}'
}
export const getNetworkBluetoothClient_TYPE = function () {
    return 'get'
}
export const getNetworkBluetoothClientURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/bluetoothClients/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the SSIDs in a network. Supports networks with access points or wireless-enabled security appliances and teleworker gateways.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids'
```
* request: getNetworkSsids
* url: getNetworkSsidsURL
* method: getNetworkSsids_TYPE
* raw_url: getNetworkSsids_RAW_URL
     * @param networkId - 
*/
export const getNetworkSsids = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/ssids'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkSsids_RAW_URL = function () {
    return '/networks/{networkId}/ssids'
}
export const getNetworkSsids_TYPE = function () {
    return 'get'
}
export const getNetworkSsidsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/ssids'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a single SSID
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]'
```
* request: getNetworkSsid
* url: getNetworkSsidURL
* method: getNetworkSsid_TYPE
* raw_url: getNetworkSsid_RAW_URL
     * @param networkId - 
     * @param number - 
*/
export const getNetworkSsid = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/ssids/{number}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters['number'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: number'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkSsid_RAW_URL = function () {
    return '/networks/{networkId}/ssids/{number}'
}
export const getNetworkSsid_TYPE = function () {
    return 'get'
}
export const getNetworkSsidURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/ssids/{number}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the attributes of an SSID
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My SSID","enabled":true}' 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]'
```
* request: updateNetworkSsid
* url: updateNetworkSsidURL
* method: updateNetworkSsid_TYPE
* raw_url: updateNetworkSsid_RAW_URL
     * @param networkId - 
     * @param number - 
     * @param body - 
*/
export const updateNetworkSsid = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/ssids/{number}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters['number'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: number'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkSsid_RAW_URL = function () {
    return '/networks/{networkId}/ssids/{number}'
}
export const updateNetworkSsid_TYPE = function () {
    return 'put'
}
export const updateNetworkSsidURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/ssids/{number}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the switch ports for a switch
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/switchPorts'
```
* request: getDeviceSwitchPorts
* url: getDeviceSwitchPortsURL
* method: getDeviceSwitchPorts_TYPE
* raw_url: getDeviceSwitchPorts_RAW_URL
     * @param serial - 
*/
export const getDeviceSwitchPorts = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/devices/{serial}/switchPorts'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getDeviceSwitchPorts_RAW_URL = function () {
    return '/devices/{serial}/switchPorts'
}
export const getDeviceSwitchPorts_TYPE = function () {
    return 'get'
}
export const getDeviceSwitchPortsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/devices/{serial}/switchPorts'
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a switch port
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/devices/[serial]/switchPorts/[number]'
```
* request: getDeviceSwitchPort
* url: getDeviceSwitchPortURL
* method: getDeviceSwitchPort_TYPE
* raw_url: getDeviceSwitchPort_RAW_URL
     * @param serial - 
     * @param number - 
*/
export const getDeviceSwitchPort = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/devices/{serial}/switchPorts/{number}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters['number'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: number'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getDeviceSwitchPort_RAW_URL = function () {
    return '/devices/{serial}/switchPorts/{number}'
}
export const getDeviceSwitchPort_TYPE = function () {
    return 'get'
}
export const getDeviceSwitchPortURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/devices/{serial}/switchPorts/{number}'
    path = path.replace('{serial}', `${parameters['serial']}`)
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update a switch port
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT 'https://api.meraki.com/api/v0/devices/[serial]/switchPorts/[number]'
```
* request: updateDeviceSwitchPort
* url: updateDeviceSwitchPortURL
* method: updateDeviceSwitchPort_TYPE
* raw_url: updateDeviceSwitchPort_RAW_URL
     * @param serial - 
     * @param number - 
     * @param body - 
*/
export const updateDeviceSwitchPort = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/devices/{serial}/switchPorts/{number}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters['number'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: number'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateDeviceSwitchPort_RAW_URL = function () {
    return '/devices/{serial}/switchPorts/{number}'
}
export const updateDeviceSwitchPort_TYPE = function () {
    return 'put'
}
export const updateDeviceSwitchPortURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/devices/{serial}/switchPorts/{number}'
    path = path.replace('{serial}', `${parameters['serial']}`)
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the splash login attempts for a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/splashLoginAttempts?timespan=7200'
```
* request: getNetworkSplashLoginAttempts
* url: getNetworkSplashLoginAttemptsURL
* method: getNetworkSplashLoginAttempts_TYPE
* raw_url: getNetworkSplashLoginAttempts_RAW_URL
     * @param id - 
     * @param body - 
*/
export const getNetworkSplashLoginAttempts = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/splashLoginAttempts'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkSplashLoginAttempts_RAW_URL = function () {
    return '/networks/{id}/splashLoginAttempts'
}
export const getNetworkSplashLoginAttempts_TYPE = function () {
    return 'get'
}
export const getNetworkSplashLoginAttemptsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/splashLoginAttempts'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the keys required to access Personally Identifiable Information (PII) for a given identifier. Exactly one identifier will be accepted. If the organization contains org-wide Systems Manager users matching the key provided then there will be an entry with the key "0" containing the applicable keys.
    
## ALTERNATE PATH
    
```
/organizations/{organizationId}/pii/piiKeys
```
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/piiKeys'
```
* request: getNetworkPiiPiiKeys
* url: getNetworkPiiPiiKeysURL
* method: getNetworkPiiPiiKeys_TYPE
* raw_url: getNetworkPiiPiiKeys_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkPiiPiiKeys = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/pii/piiKeys'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPiiPiiKeys_RAW_URL = function () {
    return '/networks/{networkId}/pii/piiKeys'
}
export const getNetworkPiiPiiKeys_TYPE = function () {
    return 'get'
}
export const getNetworkPiiPiiKeysURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/pii/piiKeys'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Given a piece of Personally Identifiable Information (PII), return the Systems Manager device ID(s) associated with that identifier. These device IDs can be used with the Systems Manager API endpoints to retrieve device details. Exactly one identifier will be accepted.
    
## ALTERNATE PATH
    
```
/organizations/{organizationId}/pii/smDevicesForKey
```
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/smDevicesForKey'
```
* request: getNetworkPiiSmDevicesForKey
* url: getNetworkPiiSmDevicesForKeyURL
* method: getNetworkPiiSmDevicesForKey_TYPE
* raw_url: getNetworkPiiSmDevicesForKey_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkPiiSmDevicesForKey = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/pii/smDevicesForKey'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPiiSmDevicesForKey_RAW_URL = function () {
    return '/networks/{networkId}/pii/smDevicesForKey'
}
export const getNetworkPiiSmDevicesForKey_TYPE = function () {
    return 'get'
}
export const getNetworkPiiSmDevicesForKeyURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/pii/smDevicesForKey'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Given a piece of Personally Identifiable Information (PII), return the Systems Manager owner ID(s) associated with that identifier. These owner IDs can be used with the Systems Manager API endpoints to retrieve owner details. Exactly one identifier will be accepted.
    
## ALTERNATE PATH
    
```
/organizations/{organizationId}/pii/smOwnersForKey
```
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/smOwnersForKey'
```
* request: getNetworkPiiSmOwnersForKey
* url: getNetworkPiiSmOwnersForKeyURL
* method: getNetworkPiiSmOwnersForKey_TYPE
* raw_url: getNetworkPiiSmOwnersForKey_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkPiiSmOwnersForKey = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/pii/smOwnersForKey'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPiiSmOwnersForKey_RAW_URL = function () {
    return '/networks/{networkId}/pii/smOwnersForKey'
}
export const getNetworkPiiSmOwnersForKey_TYPE = function () {
    return 'get'
}
export const getNetworkPiiSmOwnersForKeyURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/pii/smOwnersForKey'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the PII requests for this network or organization
    
## ALTERNATE PATH
    
```
/organizations/{organizationId}/pii/requests
```
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests'
```
* request: getNetworkPiiRequests
* url: getNetworkPiiRequestsURL
* method: getNetworkPiiRequests_TYPE
* raw_url: getNetworkPiiRequests_RAW_URL
     * @param networkId - 
*/
export const getNetworkPiiRequests = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/pii/requests'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPiiRequests_RAW_URL = function () {
    return '/networks/{networkId}/pii/requests'
}
export const getNetworkPiiRequests_TYPE = function () {
    return 'get'
}
export const getNetworkPiiRequestsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/pii/requests'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Submit a new delete or restrict processing PII request
    
## ALTERNATE PATH
    
```
/organizations/{organizationId}/pii/requests
```
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -X POST -H 'Content-Type: application/json' --data-binary '{"type":"delete", "datasets":"["usage","events"]", "mac":"00:77:00:77:00:77"}' 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests'
    
```
* request: createNetworkPiiRequests
* url: createNetworkPiiRequestsURL
* method: createNetworkPiiRequests_TYPE
* raw_url: createNetworkPiiRequests_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkPiiRequests = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/pii/requests'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkPiiRequests_RAW_URL = function () {
    return '/networks/{networkId}/pii/requests'
}
export const createNetworkPiiRequests_TYPE = function () {
    return 'post'
}
export const createNetworkPiiRequestsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/pii/requests'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a PII request
    
## ALTERNATE PATH
    
```
/organizations/{organizationId}/pii/requests/{id}
```
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests/[id]'
```
* request: getNetworkPiiRequest
* url: getNetworkPiiRequestURL
* method: getNetworkPiiRequest_TYPE
* raw_url: getNetworkPiiRequest_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const getNetworkPiiRequest = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/pii/requests/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkPiiRequest_RAW_URL = function () {
    return '/networks/{networkId}/pii/requests/{id}'
}
export const getNetworkPiiRequest_TYPE = function () {
    return 'get'
}
export const getNetworkPiiRequestURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/pii/requests/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete a restrict processing PII request
    
## ALTERNATE PATH
    
```
/organizations/{organizationId}/pii/requests/{id}
```
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/pii/requests/[id]'
```
* request: deleteNetworkPiiRequest
* url: deleteNetworkPiiRequestURL
* method: deleteNetworkPiiRequest_TYPE
* raw_url: deleteNetworkPiiRequest_RAW_URL
     * @param networkId - 
     * @param id - 
*/
export const deleteNetworkPiiRequest = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/pii/requests/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkPiiRequest_RAW_URL = function () {
    return '/networks/{networkId}/pii/requests/{id}'
}
export const deleteNetworkPiiRequest_TYPE = function () {
    return 'delete'
}
export const deleteNetworkPiiRequestURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/pii/requests/{id}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Display the splash page settings for the given SSID
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/splashSettings'
```
* request: getNetworkSsidSplashSettings
* url: getNetworkSsidSplashSettingsURL
* method: getNetworkSsidSplashSettings_TYPE
* raw_url: getNetworkSsidSplashSettings_RAW_URL
     * @param networkId - 
     * @param number - 
*/
export const getNetworkSsidSplashSettings = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/ssids/{number}/splashSettings'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters['number'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: number'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkSsidSplashSettings_RAW_URL = function () {
    return '/networks/{networkId}/ssids/{number}/splashSettings'
}
export const getNetworkSsidSplashSettings_TYPE = function () {
    return 'get'
}
export const getNetworkSsidSplashSettingsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/ssids/{number}/splashSettings'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Modify the splash page settings for the given SSID
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"splashUrl":"https://www.custom_splash_url.com"}' 'https://api.meraki.com/api/v0/networks/[networkId]/ssids/[number]/splashSettings'
```
* request: updateNetworkSsidSplashSettings
* url: updateNetworkSsidSplashSettingsURL
* method: updateNetworkSsidSplashSettings_TYPE
* raw_url: updateNetworkSsidSplashSettings_RAW_URL
     * @param networkId - 
     * @param number - 
     * @param body - 
*/
export const updateNetworkSsidSplashSettings = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/ssids/{number}/splashSettings'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters['number'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: number'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkSsidSplashSettings_RAW_URL = function () {
    return '/networks/{networkId}/ssids/{number}/splashSettings'
}
export const updateNetworkSsidSplashSettings_TYPE = function () {
    return 'put'
}
export const updateNetworkSsidSplashSettingsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/ssids/{number}/splashSettings'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{number}', `${parameters['number']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Create a new profile containing a Cisco Clarity payload
    
## SAMPLE REQUEST
    
```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "name=Cisco Clarity Config" \
  -F "PluginBundleID=com.cisco.security.app" \
  -F 'VendorConfig=[ {"key":"cloud_asn1_server_host", "type":"manual_string", "value":"immunet.com"}, {"key":"cloud_asn1_server_port", "type":"manual_int", "value":443} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity"
    
```
* request: createNetworkSmProfileClarity
* url: createNetworkSmProfileClarityURL
* method: createNetworkSmProfileClarity_TYPE
* raw_url: createNetworkSmProfileClarity_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkSmProfileClarity = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{network_id}/sm/profile/clarity'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkSmProfileClarity_RAW_URL = function () {
    return '/networks/{network_id}/sm/profile/clarity'
}
export const createNetworkSmProfileClarity_TYPE = function () {
    return 'post'
}
export const createNetworkSmProfileClarityURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{network_id}/sm/profile/clarity'
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update an existing profile containing a Cisco Clarity payload
    
## SAMPLE REQUEST
    
```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X PUT \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "name=Cisco Clarity Config" \
  -F 'VendorConfig=[ {"key":"cloud_asn1_server_host", "type":"manual_string", "value":"immunet.com"}, {"key":"cloud_asn1_server_port", "type":"manual_int", "value":443} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"
    
```
* request: updateNetworkSmProfileClarity
* url: updateNetworkSmProfileClarityURL
* method: updateNetworkSmProfileClarity_TYPE
* raw_url: updateNetworkSmProfileClarity_RAW_URL
     * @param networkId - 
     * @param profileId - 
     * @param body - 
*/
export const updateNetworkSmProfileClarity = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{network_id}/sm/profile/clarity/{profileId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{profileId}', `${parameters['profileId']}`)
    if (parameters['profileId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: profileId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkSmProfileClarity_RAW_URL = function () {
    return '/networks/{network_id}/sm/profile/clarity/{profileId}'
}
export const updateNetworkSmProfileClarity_TYPE = function () {
    return 'put'
}
export const updateNetworkSmProfileClarityURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{network_id}/sm/profile/clarity/{profileId}'
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    path = path.replace('{profileId}', `${parameters['profileId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}

/**
* Get details for a Cisco Clarity payload
    
## SAMPLE REQUEST
    
```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X GET \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"
    
```
* request: getNetworkSmProfileClarity
* url: getNetworkSmProfileClarityURL
* method: getNetworkSmProfileClarity_TYPE
* raw_url: getNetworkSmProfileClarity_RAW_URL
     * @param networkId - 
     * @param profileId - 
*/
export const getNetworkSmProfileClarity = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{network_id}/sm/profile/clarity/{profileId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{profileId}', `${parameters['profileId']}`)
    if (parameters['profileId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: profileId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkSmProfileClarity_RAW_URL = function () {
    return '/networks/{network_id}/sm/profile/clarity/{profileId}'
}
export const getNetworkSmProfileClarity_TYPE = function () {
    return 'get'
}
export const getNetworkSmProfileClarityURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{network_id}/sm/profile/clarity/{profileId}'
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    path = path.replace('{profileId}', `${parameters['profileId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete a Cisco Clarity payload. Deletes the entire profile if it's empty after removing the payload.
    
## SAMPLE REQUEST
    
```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X DELETE \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/clarity/[profileId]"
    
```
* request: deleteNetworkSmProfileClarity
* url: deleteNetworkSmProfileClarityURL
* method: deleteNetworkSmProfileClarity_TYPE
* raw_url: deleteNetworkSmProfileClarity_RAW_URL
     * @param networkId - 
     * @param profileId - 
*/
export const deleteNetworkSmProfileClarity = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{network_id}/sm/profile/clarity/{profileId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{profileId}', `${parameters['profileId']}`)
    if (parameters['profileId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: profileId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkSmProfileClarity_RAW_URL = function () {
    return '/networks/{network_id}/sm/profile/clarity/{profileId}'
}
export const deleteNetworkSmProfileClarity_TYPE = function () {
    return 'delete'
}
export const deleteNetworkSmProfileClarityURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{network_id}/sm/profile/clarity/{profileId}'
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    path = path.replace('{profileId}', `${parameters['profileId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Create a new profile containing a Cisco Umbrella payload
    
## SAMPLE REQUEST
    
```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X POST \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "name=Cisco Umbrella Config" \
  -F "AppBundleIdentifier=com.cisco.security" \
  -F "ProviderBundleIdentifier=com.cisco.umbrella" \
  -F 'ProviderConfiguration=[ {"key":"internalDomains", "type":"manual_list", "value":["meraki.com", "cisco.com"] }, {"key":"user_id", "type":"manual_string", "value":"miles"} ]' \
  -F "usesCert=true" \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella"
    
```
* request: createNetworkSmProfileUmbrella
* url: createNetworkSmProfileUmbrellaURL
* method: createNetworkSmProfileUmbrella_TYPE
* raw_url: createNetworkSmProfileUmbrella_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkSmProfileUmbrella = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{network_id}/sm/profile/umbrella'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkSmProfileUmbrella_RAW_URL = function () {
    return '/networks/{network_id}/sm/profile/umbrella'
}
export const createNetworkSmProfileUmbrella_TYPE = function () {
    return 'post'
}
export const createNetworkSmProfileUmbrellaURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{network_id}/sm/profile/umbrella'
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update an existing profile containing a Cisco Umbrella payload
    
## SAMPLE REQUEST
    
```
curl -L -H "X-Cisco-Meraki-API-KEY: <key>" \
  -X PUT \
  -H "Content-Type: multipart/form-data" \
  -F "scope=withAny, tag1, tag2" \
  -F "name=Cisco Umbrella Config" \
  -F 'ProviderConfiguration=[ {"key":"internalDomains", "type":"manual_list", "value":["meraki.com", "cisco.com"] }, {"key":"user_id", "type":"manual_string", "value":"miles"} ]' \
  "https://api.meraki.com/api/v0/networks/[networkId]/sm/profile/umbrella/[profileId]"
    
```
* request: updateNetworkSmProfileUmbrella
* url: updateNetworkSmProfileUmbrellaURL
* method: updateNetworkSmProfileUmbrella_TYPE
* raw_url: updateNetworkSmProfileUmbrella_RAW_URL
     * @param networkId - 
     * @param profileId - 
     * @param body - 
*/
export const updateNetworkSmProfileUmbrella = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{network_id}/sm/profile/umbrella/{profileId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{profileId}', `${parameters['profileId']}`)
    if (parameters['profileId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: profileId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkSmProfileUmbrella_RAW_URL = function () {
    return '/networks/{network_id}/sm/profile/umbrella/{profileId}'
}
export const updateNetworkSmProfileUmbrella_TYPE = function () {
    return 'put'
}
export const updateNetworkSmProfileUmbrellaURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{network_id}/sm/profile/umbrella/{profileId}'
    path = path.replace('{network_id}', `${parameters['networkId']}`)
    path = path.replace('{profileId}', `${parameters['profileId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}


/**
* Return the alert configuration for this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/alertSettings'
```
* request: getNetworkAlertSettings
* url: getNetworkAlertSettingsURL
* method: getNetworkAlertSettings_TYPE
* raw_url: getNetworkAlertSettings_RAW_URL
     * @param networkId - 
*/
export const getNetworkAlertSettings = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/alertSettings'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkAlertSettings_RAW_URL = function () {
    return '/networks/{networkId}/alertSettings'
}
export const getNetworkAlertSettings_TYPE = function () {
    return 'get'
}
export const getNetworkAlertSettingsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/alertSettings'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the alert configuration for this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"defaultDestinations":{"emails":["miles@meraki.com"],"allAdmins":true,"snmp":true},"alerts":[{"type":"gatewayDown","enabled":true,"alertDestinations":{"emails":["miles@meraki.com"],"allAdmins":false,"snmp":false},"filters":{"timeout":60}}]}' 'https://api.meraki.com/api/v0/networks/[networkId]/alertSettings'
```
* request: updateNetworkAlertSettings
* url: updateNetworkAlertSettingsURL
* method: updateNetworkAlertSettings_TYPE
* raw_url: updateNetworkAlertSettings_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const updateNetworkAlertSettings = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/alertSettings'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkAlertSettings_RAW_URL = function () {
    return '/networks/{networkId}/alertSettings'
}
export const updateNetworkAlertSettings_TYPE = function () {
    return 'put'
}
export const updateNetworkAlertSettingsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/alertSettings'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the dashboard administrators in this organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organization_id]/admins'
```
* request: getOrganizationAdmins
* url: getOrganizationAdminsURL
* method: getOrganizationAdmins_TYPE
* raw_url: getOrganizationAdmins_RAW_URL
     * @param organizationId - 
*/
export const getOrganizationAdmins = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organization_id}/admins'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organization_id}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationAdmins_RAW_URL = function () {
    return '/organizations/{organization_id}/admins'
}
export const getOrganizationAdmins_TYPE = function () {
    return 'get'
}
export const getOrganizationAdminsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organization_id}/admins'
    path = path.replace('{organization_id}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Create a new dashboard administrator
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"Miles Meraki","email":"miles@meraki.com","orgAccess":"none","tags":[{"tag":"west","access":"read-only"}]}' 'https://api.meraki.com/api/v0/organizations/[organization_id]/admins'
```
* request: createOrganizationAdmins
* url: createOrganizationAdminsURL
* method: createOrganizationAdmins_TYPE
* raw_url: createOrganizationAdmins_RAW_URL
     * @param organizationId - 
     * @param body - 
*/
export const createOrganizationAdmins = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organization_id}/admins'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organization_id}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createOrganizationAdmins_RAW_URL = function () {
    return '/organizations/{organization_id}/admins'
}
export const createOrganizationAdmins_TYPE = function () {
    return 'post'
}
export const createOrganizationAdminsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organization_id}/admins'
    path = path.replace('{organization_id}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update an administrator
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"Miles Meraki","email":"miles@meraki.com","orgAccess":"none","tags":[{"tag":"west","access":"read-only"}]}' 'https://api.meraki.com/api/v0/organizations/[organization_id]/admins/[id]'
```
* request: updateOrganizationAdmin
* url: updateOrganizationAdminURL
* method: updateOrganizationAdmin_TYPE
* raw_url: updateOrganizationAdmin_RAW_URL
     * @param organizationId - 
     * @param id - 
     * @param body - 
*/
export const updateOrganizationAdmin = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organization_id}/admins/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organization_id}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateOrganizationAdmin_RAW_URL = function () {
    return '/organizations/{organization_id}/admins/{id}'
}
export const updateOrganizationAdmin_TYPE = function () {
    return 'put'
}
export const updateOrganizationAdminURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organization_id}/admins/{id}'
    path = path.replace('{organization_id}', `${parameters['organizationId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Revoke all access for a dashboard administrator within this organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/organizations/[organization_id]/admins/[id]'
```
* request: deleteOrganizationAdmin
* url: deleteOrganizationAdminURL
* method: deleteOrganizationAdmin_TYPE
* raw_url: deleteOrganizationAdmin_RAW_URL
     * @param organizationId - 
     * @param id - 
*/
export const deleteOrganizationAdmin = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organization_id}/admins/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organization_id}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteOrganizationAdmin_RAW_URL = function () {
    return '/organizations/{organization_id}/admins/{id}'
}
export const deleteOrganizationAdmin_TYPE = function () {
    return 'delete'
}
export const deleteOrganizationAdminURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organization_id}/admins/{id}'
    path = path.replace('{organization_id}', `${parameters['organizationId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated connectivity info for this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/connectionStats'
```
* request: getNetworkConnectionStats
* url: getNetworkConnectionStatsURL
* method: getNetworkConnectionStats_TYPE
* raw_url: getNetworkConnectionStats_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkConnectionStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/connectionStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkConnectionStats_RAW_URL = function () {
    return '/networks/{networkId}/connectionStats'
}
export const getNetworkConnectionStats_TYPE = function () {
    return 'get'
}
export const getNetworkConnectionStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/connectionStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated connectivity info for this network, grouped by node
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/connectionStats'
```
* request: getNetworkDevicesConnectionStats
* url: getNetworkDevicesConnectionStatsURL
* method: getNetworkDevicesConnectionStats_TYPE
* raw_url: getNetworkDevicesConnectionStats_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkDevicesConnectionStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/connectionStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkDevicesConnectionStats_RAW_URL = function () {
    return '/networks/{networkId}/devices/connectionStats'
}
export const getNetworkDevicesConnectionStats_TYPE = function () {
    return 'get'
}
export const getNetworkDevicesConnectionStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/connectionStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated connectivity info for a given AP on this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/connectionStats'
```
* request: getNetworkDeviceConnectionStats
* url: getNetworkDeviceConnectionStatsURL
* method: getNetworkDeviceConnectionStats_TYPE
* raw_url: getNetworkDeviceConnectionStats_RAW_URL
     * @param networkId - 
     * @param serial - 
     * @param body - 
*/
export const getNetworkDeviceConnectionStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/{serial}/connectionStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkDeviceConnectionStats_RAW_URL = function () {
    return '/networks/{networkId}/devices/{serial}/connectionStats'
}
export const getNetworkDeviceConnectionStats_TYPE = function () {
    return 'get'
}
export const getNetworkDeviceConnectionStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/{serial}/connectionStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated connectivity info for this network, grouped by clients
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/connectionStats'
```
* request: getNetworkClientsConnectionStats
* url: getNetworkClientsConnectionStatsURL
* method: getNetworkClientsConnectionStats_TYPE
* raw_url: getNetworkClientsConnectionStats_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkClientsConnectionStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/connectionStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientsConnectionStats_RAW_URL = function () {
    return '/networks/{networkId}/clients/connectionStats'
}
export const getNetworkClientsConnectionStats_TYPE = function () {
    return 'get'
}
export const getNetworkClientsConnectionStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/connectionStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated connectivity info for a given client on this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[clientId]/connectionStats'
```
* request: getNetworkClientConnectionStats
* url: getNetworkClientConnectionStatsURL
* method: getNetworkClientConnectionStats_TYPE
* raw_url: getNetworkClientConnectionStats_RAW_URL
     * @param networkId - 
     * @param clientId - 
     * @param body - 
*/
export const getNetworkClientConnectionStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{clientId}/connectionStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{clientId}', `${parameters['clientId']}`)
    if (parameters['clientId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: clientId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientConnectionStats_RAW_URL = function () {
    return '/networks/{networkId}/clients/{clientId}/connectionStats'
}
export const getNetworkClientConnectionStats_TYPE = function () {
    return 'get'
}
export const getNetworkClientConnectionStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{clientId}/connectionStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{clientId}', `${parameters['clientId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated latency info for this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/latencyStats'
```
* request: getNetworkLatencyStats
* url: getNetworkLatencyStatsURL
* method: getNetworkLatencyStats_TYPE
* raw_url: getNetworkLatencyStats_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkLatencyStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/latencyStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkLatencyStats_RAW_URL = function () {
    return '/networks/{networkId}/latencyStats'
}
export const getNetworkLatencyStats_TYPE = function () {
    return 'get'
}
export const getNetworkLatencyStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/latencyStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated latency info for this network, grouped by node
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/latencyStats'
```
* request: getNetworkDevicesLatencyStats
* url: getNetworkDevicesLatencyStatsURL
* method: getNetworkDevicesLatencyStats_TYPE
* raw_url: getNetworkDevicesLatencyStats_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkDevicesLatencyStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/latencyStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkDevicesLatencyStats_RAW_URL = function () {
    return '/networks/{networkId}/devices/latencyStats'
}
export const getNetworkDevicesLatencyStats_TYPE = function () {
    return 'get'
}
export const getNetworkDevicesLatencyStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/latencyStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated latency info for a given AP on this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/latencyStats'
```
* request: getNetworkDeviceLatencyStats
* url: getNetworkDeviceLatencyStatsURL
* method: getNetworkDeviceLatencyStats_TYPE
* raw_url: getNetworkDeviceLatencyStats_RAW_URL
     * @param networkId - 
     * @param serial - 
     * @param body - 
*/
export const getNetworkDeviceLatencyStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/{serial}/latencyStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkDeviceLatencyStats_RAW_URL = function () {
    return '/networks/{networkId}/devices/{serial}/latencyStats'
}
export const getNetworkDeviceLatencyStats_TYPE = function () {
    return 'get'
}
export const getNetworkDeviceLatencyStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/{serial}/latencyStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated latency info for this network, grouped by clients
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/latencyStats'
```
* request: getNetworkClientsLatencyStats
* url: getNetworkClientsLatencyStatsURL
* method: getNetworkClientsLatencyStats_TYPE
* raw_url: getNetworkClientsLatencyStats_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkClientsLatencyStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/latencyStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientsLatencyStats_RAW_URL = function () {
    return '/networks/{networkId}/clients/latencyStats'
}
export const getNetworkClientsLatencyStats_TYPE = function () {
    return 'get'
}
export const getNetworkClientsLatencyStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/latencyStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Aggregated latency info for a given client on this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[clientId]/latencyStats'
```
* request: getNetworkClientLatencyStats
* url: getNetworkClientLatencyStatsURL
* method: getNetworkClientLatencyStats_TYPE
* raw_url: getNetworkClientLatencyStats_RAW_URL
     * @param networkId - 
     * @param clientId - 
     * @param body - 
*/
export const getNetworkClientLatencyStats = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{clientId}/latencyStats'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{clientId}', `${parameters['clientId']}`)
    if (parameters['clientId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: clientId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientLatencyStats_RAW_URL = function () {
    return '/networks/{networkId}/clients/{clientId}/latencyStats'
}
export const getNetworkClientLatencyStats_TYPE = function () {
    return 'get'
}
export const getNetworkClientLatencyStatsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{clientId}/latencyStats'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{clientId}', `${parameters['clientId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List of all failed client connection events on this network in a given time range
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/failedConnections'
```
* request: getNetworkFailedConnections
* url: getNetworkFailedConnectionsURL
* method: getNetworkFailedConnections_TYPE
* raw_url: getNetworkFailedConnections_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const getNetworkFailedConnections = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/failedConnections'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkFailedConnections_RAW_URL = function () {
    return '/networks/{networkId}/failedConnections'
}
export const getNetworkFailedConnections_TYPE = function () {
    return 'get'
}
export const getNetworkFailedConnectionsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/failedConnections'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the VLANs for this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/vlans'
```
* request: getNetworkVlans
* url: getNetworkVlansURL
* method: getNetworkVlans_TYPE
* raw_url: getNetworkVlans_RAW_URL
     * @param networkId - 
*/
export const getNetworkVlans = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/vlans'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkVlans_RAW_URL = function () {
    return '/networks/{networkId}/vlans'
}
export const getNetworkVlans_TYPE = function () {
    return 'get'
}
export const getNetworkVlansURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/vlans'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Add a VLAN
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"id":"1234","name":"My VLAN","subnet":"192.168.1.0/24","applianceIp":"1.2.3.4"}' 'https://api.meraki.com/api/v0/networks/[networkId]/vlans'
```
* request: createNetworkVlans
* url: createNetworkVlansURL
* method: createNetworkVlans_TYPE
* raw_url: createNetworkVlans_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkVlans = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/vlans'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkVlans_RAW_URL = function () {
    return '/networks/{networkId}/vlans'
}
export const createNetworkVlans_TYPE = function () {
    return 'post'
}
export const createNetworkVlansURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/vlans'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a VLAN
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/vlans/[vlanId]'
```
* request: getNetworkVlan
* url: getNetworkVlanURL
* method: getNetworkVlan_TYPE
* raw_url: getNetworkVlan_RAW_URL
     * @param networkId - 
     * @param vlanId - 
*/
export const getNetworkVlan = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/vlans/{vlanId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{vlanId}', `${parameters['vlanId']}`)
    if (parameters['vlanId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: vlanId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkVlan_RAW_URL = function () {
    return '/networks/{networkId}/vlans/{vlanId}'
}
export const getNetworkVlan_TYPE = function () {
    return 'get'
}
export const getNetworkVlanURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/vlans/{vlanId}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{vlanId}', `${parameters['vlanId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update a VLAN
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"id":"1234","networkId":"N_24329156","name":"My VLAN","applianceIp":"1.2.3.4","subnet":"192.168.1.0/24","fixedIpAssignments":"{}","reservedIpRanges":"[]","dnsNameservers":"google_dns"}' 'https://api.meraki.com/api/v0/networks/[networkId]/vlans/[vlanId]'
```
* request: updateNetworkVlan
* url: updateNetworkVlanURL
* method: updateNetworkVlan_TYPE
* raw_url: updateNetworkVlan_RAW_URL
     * @param networkId - 
     * @param vlanId - 
     * @param body - 
*/
export const updateNetworkVlan = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/vlans/{vlanId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{vlanId}', `${parameters['vlanId']}`)
    if (parameters['vlanId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: vlanId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkVlan_RAW_URL = function () {
    return '/networks/{networkId}/vlans/{vlanId}'
}
export const updateNetworkVlan_TYPE = function () {
    return 'put'
}
export const updateNetworkVlanURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/vlans/{vlanId}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{vlanId}', `${parameters['vlanId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete a VLAN from a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/vlans/[vlanId]'
```
* request: deleteNetworkVlan
* url: deleteNetworkVlanURL
* method: deleteNetworkVlan_TYPE
* raw_url: deleteNetworkVlan_RAW_URL
     * @param networkId - 
     * @param vlanId - 
*/
export const deleteNetworkVlan = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/vlans/{vlanId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{vlanId}', `${parameters['vlanId']}`)
    if (parameters['vlanId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: vlanId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkVlan_RAW_URL = function () {
    return '/networks/{networkId}/vlans/{vlanId}'
}
export const deleteNetworkVlan_TYPE = function () {
    return 'delete'
}
export const deleteNetworkVlanURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/vlans/{vlanId}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{vlanId}', `${parameters['vlanId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Returns the enabled status of VLANs for the network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/vlansEnabledState'
```
* request: getNetworkVlansEnabledState
* url: getNetworkVlansEnabledStateURL
* method: getNetworkVlansEnabledState_TYPE
* raw_url: getNetworkVlansEnabledState_RAW_URL
     * @param networkId - 
*/
export const getNetworkVlansEnabledState = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/vlansEnabledState'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkVlansEnabledState_RAW_URL = function () {
    return '/networks/{networkId}/vlansEnabledState'
}
export const getNetworkVlansEnabledState_TYPE = function () {
    return 'get'
}
export const getNetworkVlansEnabledStateURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/vlansEnabledState'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Enable/Disable VLANs for the given network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"enabled":true}' 'https://api.meraki.com/api/v0/networks/[networkId]/vlansEnabledState'
```
* request: updateNetworkVlansEnabledState
* url: updateNetworkVlansEnabledStateURL
* method: updateNetworkVlansEnabledState_TYPE
* raw_url: updateNetworkVlansEnabledState_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const updateNetworkVlansEnabledState = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/vlansEnabledState'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkVlansEnabledState_RAW_URL = function () {
    return '/networks/{networkId}/vlansEnabledState'
}
export const updateNetworkVlansEnabledState_TYPE = function () {
    return 'put'
}
export const updateNetworkVlansEnabledStateURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/vlansEnabledState'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the static routes for this network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes'
```
* request: getNetworkStaticRoutes
* url: getNetworkStaticRoutesURL
* method: getNetworkStaticRoutes_TYPE
* raw_url: getNetworkStaticRoutes_RAW_URL
     * @param networkId - 
*/
export const getNetworkStaticRoutes = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/staticRoutes'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkStaticRoutes_RAW_URL = function () {
    return '/networks/{networkId}/staticRoutes'
}
export const getNetworkStaticRoutes_TYPE = function () {
    return 'get'
}
export const getNetworkStaticRoutesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/staticRoutes'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Add a static route
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My route","subnet":"192.168.1.0/24","gatewayIp":"1.2.3.5"}' 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes'
```
* request: createNetworkStaticRoutes
* url: createNetworkStaticRoutesURL
* method: createNetworkStaticRoutes_TYPE
* raw_url: createNetworkStaticRoutes_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const createNetworkStaticRoutes = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/staticRoutes'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createNetworkStaticRoutes_RAW_URL = function () {
    return '/networks/{networkId}/staticRoutes'
}
export const createNetworkStaticRoutes_TYPE = function () {
    return 'post'
}
export const createNetworkStaticRoutesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/staticRoutes'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a static route
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes/[srId]'
```
* request: getNetworkStaticRoute
* url: getNetworkStaticRouteURL
* method: getNetworkStaticRoute_TYPE
* raw_url: getNetworkStaticRoute_RAW_URL
     * @param networkId - 
     * @param srId - 
*/
export const getNetworkStaticRoute = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/staticRoutes/{srId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{srId}', `${parameters['srId']}`)
    if (parameters['srId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: srId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkStaticRoute_RAW_URL = function () {
    return '/networks/{networkId}/staticRoutes/{srId}'
}
export const getNetworkStaticRoute_TYPE = function () {
    return 'get'
}
export const getNetworkStaticRouteURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/staticRoutes/{srId}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{srId}', `${parameters['srId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update a static route
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My route","subnet":"192.168.1.0/24","fixedIpAssignments":"{}","reservedIpRanges":"[]"}' 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes/[srId]'
```
* request: updateNetworkStaticRoute
* url: updateNetworkStaticRouteURL
* method: updateNetworkStaticRoute_TYPE
* raw_url: updateNetworkStaticRoute_RAW_URL
     * @param networkId - 
     * @param srId - 
     * @param body - 
*/
export const updateNetworkStaticRoute = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/staticRoutes/{srId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{srId}', `${parameters['srId']}`)
    if (parameters['srId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: srId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkStaticRoute_RAW_URL = function () {
    return '/networks/{networkId}/staticRoutes/{srId}'
}
export const updateNetworkStaticRoute_TYPE = function () {
    return 'put'
}
export const updateNetworkStaticRouteURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/staticRoutes/{srId}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{srId}', `${parameters['srId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Delete a static route from a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/networks/[networkId]/staticRoutes/[srId]'
```
* request: deleteNetworkStaticRoute
* url: deleteNetworkStaticRouteURL
* method: deleteNetworkStaticRoute_TYPE
* raw_url: deleteNetworkStaticRoute_RAW_URL
     * @param networkId - 
     * @param srId - 
*/
export const deleteNetworkStaticRoute = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/staticRoutes/{srId}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{srId}', `${parameters['srId']}`)
    if (parameters['srId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: srId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteNetworkStaticRoute_RAW_URL = function () {
    return '/networks/{networkId}/staticRoutes/{srId}'
}
export const deleteNetworkStaticRoute_TYPE = function () {
    return 'delete'
}
export const deleteNetworkStaticRouteURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/staticRoutes/{srId}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{srId}', `${parameters['srId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the appliance services and their accessibility rules
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/firewalledServices'
```
* request: getNetworkFirewalledServices
* url: getNetworkFirewalledServicesURL
* method: getNetworkFirewalledServices_TYPE
* raw_url: getNetworkFirewalledServices_RAW_URL
     * @param networkId - 
*/
export const getNetworkFirewalledServices = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/firewalledServices'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkFirewalledServices_RAW_URL = function () {
    return '/networks/{networkId}/firewalledServices'
}
export const getNetworkFirewalledServices_TYPE = function () {
    return 'get'
}
export const getNetworkFirewalledServicesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/firewalledServices'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the accessibility settings of the given service ('ICMP', 'web', or 'SNMP')
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/firewalledServices/[service]'
```
* request: getNetworkFirewalledService
* url: getNetworkFirewalledServiceURL
* method: getNetworkFirewalledService_TYPE
* raw_url: getNetworkFirewalledService_RAW_URL
     * @param networkId - 
     * @param service - 
*/
export const getNetworkFirewalledService = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/firewalledServices/{service}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{service}', `${parameters['service']}`)
    if (parameters['service'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: service'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkFirewalledService_RAW_URL = function () {
    return '/networks/{networkId}/firewalledServices/{service}'
}
export const getNetworkFirewalledService_TYPE = function () {
    return 'get'
}
export const getNetworkFirewalledServiceURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/firewalledServices/{service}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{service}', `${parameters['service']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Updates the accessibility settings for the given service ('ICMP', 'web', or 'SNMP')
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"access":"restricted","allowedIps":["123.123.123.1"]}' 'https://api.meraki.com/api/v0/networks/[networkId]/firewalledServices/[service]'
```
* request: updateNetworkFirewalledService
* url: updateNetworkFirewalledServiceURL
* method: updateNetworkFirewalledService_TYPE
* raw_url: updateNetworkFirewalledService_RAW_URL
     * @param networkId - 
     * @param service - 
     * @param body - 
*/
export const updateNetworkFirewalledService = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/firewalledServices/{service}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{service}', `${parameters['service']}`)
    if (parameters['service'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: service'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkFirewalledService_RAW_URL = function () {
    return '/networks/{networkId}/firewalledServices/{service}'
}
export const updateNetworkFirewalledService_TYPE = function () {
    return 'put'
}
export const updateNetworkFirewalledServiceURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/firewalledServices/{service}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{service}', `${parameters['service']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the group policies in a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[id]/groupPolicies'
```
* request: getNetworkGroupPolicies
* url: getNetworkGroupPoliciesURL
* method: getNetworkGroupPolicies_TYPE
* raw_url: getNetworkGroupPolicies_RAW_URL
     * @param id - 
*/
export const getNetworkGroupPolicies = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{id}/groupPolicies'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkGroupPolicies_RAW_URL = function () {
    return '/networks/{id}/groupPolicies'
}
export const getNetworkGroupPolicies_TYPE = function () {
    return 'get'
}
export const getNetworkGroupPoliciesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{id}/groupPolicies'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the configuration templates for this organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/configTemplates'
```
* request: getOrganizationConfigTemplates
* url: getOrganizationConfigTemplatesURL
* method: getOrganizationConfigTemplates_TYPE
* raw_url: getOrganizationConfigTemplates_RAW_URL
     * @param organizationId - 
*/
export const getOrganizationConfigTemplates = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/configTemplates'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationConfigTemplates_RAW_URL = function () {
    return '/organizations/{organizationId}/configTemplates'
}
export const getOrganizationConfigTemplates_TYPE = function () {
    return 'get'
}
export const getOrganizationConfigTemplatesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/configTemplates'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Remove a configuration template
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/organizations/[organizationId]/configTemplates/[id]'
```
* request: deleteOrganizationConfigTemplate
* url: deleteOrganizationConfigTemplateURL
* method: deleteOrganizationConfigTemplate_TYPE
* raw_url: deleteOrganizationConfigTemplate_RAW_URL
     * @param organizationId - 
     * @param id - 
*/
export const deleteOrganizationConfigTemplate = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/configTemplates/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteOrganizationConfigTemplate_RAW_URL = function () {
    return '/organizations/{organizationId}/configTemplates/{id}'
}
export const deleteOrganizationConfigTemplate_TYPE = function () {
    return 'delete'
}
export const deleteOrganizationConfigTemplateURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/configTemplates/{id}'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the security events
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/clients/[clientId]/securityEvents?timespan=7200'
```
* request: getNetworkClientSecurityEvents
* url: getNetworkClientSecurityEventsURL
* method: getNetworkClientSecurityEvents_TYPE
* raw_url: getNetworkClientSecurityEvents_RAW_URL
     * @param networkId - 
     * @param clientId - 
     * @param body - 
*/
export const getNetworkClientSecurityEvents = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/clients/{clientId}/securityEvents'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{clientId}', `${parameters['clientId']}`)
    if (parameters['clientId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: clientId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkClientSecurityEvents_RAW_URL = function () {
    return '/networks/{networkId}/clients/{clientId}/securityEvents'
}
export const getNetworkClientSecurityEvents_TYPE = function () {
    return 'get'
}
export const getNetworkClientSecurityEventsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/clients/{clientId}/securityEvents'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{clientId}', `${parameters['clientId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the organizations that the user has privileges on
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations'
```
* request: getOrganizations
* url: getOrganizationsURL
* method: getOrganizations_TYPE
* raw_url: getOrganizations_RAW_URL
*/
export const getOrganizations = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizations_RAW_URL = function () {
    return '/organizations'
}
export const getOrganizations_TYPE = function () {
    return 'get'
}
export const getOrganizationsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations'
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Create a new organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My organization"}' 'https://api.meraki.com/api/v0/organizations'
```
* request: createOrganizations
* url: createOrganizationsURL
* method: createOrganizations_TYPE
* raw_url: createOrganizations_RAW_URL
     * @param body - 
*/
export const createOrganizations = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations'
    let body
    let queryParameters = {}
    let form = {}
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createOrganizations_RAW_URL = function () {
    return '/organizations'
}
export const createOrganizations_TYPE = function () {
    return 'post'
}
export const createOrganizationsURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations'
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return an organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]'
```
* request: getOrganization
* url: getOrganizationURL
* method: getOrganization_TYPE
* raw_url: getOrganization_RAW_URL
     * @param id - 
*/
export const getOrganization = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganization_RAW_URL = function () {
    return '/organizations/{id}'
}
export const getOrganization_TYPE = function () {
    return 'get'
}
export const getOrganizationURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update an organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My organization"}' 'https://api.meraki.com/api/v0/organizations/[id]'
```
* request: updateOrganization
* url: updateOrganizationURL
* method: updateOrganization_TYPE
* raw_url: updateOrganization_RAW_URL
     * @param id - 
     * @param body - 
*/
export const updateOrganization = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateOrganization_RAW_URL = function () {
    return '/organizations/{id}'
}
export const updateOrganization_TYPE = function () {
    return 'put'
}
export const updateOrganizationURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Create a new organization by cloning the addressed organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"name":"My organization"}' 'https://api.meraki.com/api/v0/organizations/[id]/clone'
```
* request: cloneOrganization
* url: cloneOrganizationURL
* method: cloneOrganization_TYPE
* raw_url: cloneOrganization_RAW_URL
     * @param id - 
     * @param body - 
*/
export const cloneOrganization = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}/clone'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const cloneOrganization_RAW_URL = function () {
    return '/organizations/{id}/clone'
}
export const cloneOrganization_TYPE = function () {
    return 'post'
}
export const cloneOrganizationURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}/clone'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Claim a device, license key, or order into an organization. When claiming by order, all devices and licenses in the order will be claimed; licenses will be added to the organization and devices will be placed in the organization's inventory. These three types of claims are mutually exclusive and cannot be performed in one request.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"order":"4CXXXXXXX"}' 'https://api.meraki.com/api/v0/organizations/[id]/claim'
```
* request: claimOrganization
* url: claimOrganizationURL
* method: claimOrganization_TYPE
* raw_url: claimOrganization_RAW_URL
     * @param id - 
     * @param body - 
*/
export const claimOrganization = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}/claim'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const claimOrganization_RAW_URL = function () {
    return '/organizations/{id}/claim'
}
export const claimOrganization_TYPE = function () {
    return 'post'
}
export const claimOrganizationURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}/claim'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the license state for an organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/licenseState'
```
* request: getOrganizationLicenseState
* url: getOrganizationLicenseStateURL
* method: getOrganizationLicenseState_TYPE
* raw_url: getOrganizationLicenseState_RAW_URL
     * @param id - 
*/
export const getOrganizationLicenseState = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}/licenseState'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationLicenseState_RAW_URL = function () {
    return '/organizations/{id}/licenseState'
}
export const getOrganizationLicenseState_TYPE = function () {
    return 'get'
}
export const getOrganizationLicenseStateURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}/licenseState'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the inventory for an organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/inventory'
```
* request: getOrganizationInventory
* url: getOrganizationInventoryURL
* method: getOrganizationInventory_TYPE
* raw_url: getOrganizationInventory_RAW_URL
     * @param id - 
*/
export const getOrganizationInventory = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}/inventory'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationInventory_RAW_URL = function () {
    return '/organizations/{id}/inventory'
}
export const getOrganizationInventory_TYPE = function () {
    return 'get'
}
export const getOrganizationInventoryURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}/inventory'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the status of every Meraki device in the organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/deviceStatuses'
```
* request: getOrganizationDeviceStatuses
* url: getOrganizationDeviceStatusesURL
* method: getOrganizationDeviceStatuses_TYPE
* raw_url: getOrganizationDeviceStatuses_RAW_URL
     * @param id - 
*/
export const getOrganizationDeviceStatuses = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}/deviceStatuses'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationDeviceStatuses_RAW_URL = function () {
    return '/organizations/{id}/deviceStatuses'
}
export const getOrganizationDeviceStatuses_TYPE = function () {
    return 'get'
}
export const getOrganizationDeviceStatusesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}/deviceStatuses'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the SNMP settings for an organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/snmp'
```
* request: getOrganizationSnmp
* url: getOrganizationSnmpURL
* method: getOrganizationSnmp_TYPE
* raw_url: getOrganizationSnmp_RAW_URL
     * @param id - 
*/
export const getOrganizationSnmp = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}/snmp'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationSnmp_RAW_URL = function () {
    return '/organizations/{id}/snmp'
}
export const getOrganizationSnmp_TYPE = function () {
    return 'get'
}
export const getOrganizationSnmpURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}/snmp'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the SNMP settings for an organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"v2cEnabled":false,"v3Enabled":false}' 'https://api.meraki.com/api/v0/organizations/[id]/snmp'
```
* request: updateOrganizationSnmp
* url: updateOrganizationSnmpURL
* method: updateOrganizationSnmp_TYPE
* raw_url: updateOrganizationSnmp_RAW_URL
     * @param id - 
     * @param body - 
*/
export const updateOrganizationSnmp = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}/snmp'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateOrganizationSnmp_RAW_URL = function () {
    return '/organizations/{id}/snmp'
}
export const updateOrganizationSnmp_TYPE = function () {
    return 'put'
}
export const updateOrganizationSnmpURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}/snmp'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the third party VPN peers for an organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[id]/thirdPartyVPNPeers'
```
* request: getOrganizationThirdPartyVPNPeers
* url: getOrganizationThirdPartyVPNPeersURL
* method: getOrganizationThirdPartyVPNPeers_TYPE
* raw_url: getOrganizationThirdPartyVPNPeers_RAW_URL
     * @param id - 
*/
export const getOrganizationThirdPartyVPNPeers = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}/thirdPartyVPNPeers'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationThirdPartyVPNPeers_RAW_URL = function () {
    return '/organizations/{id}/thirdPartyVPNPeers'
}
export const getOrganizationThirdPartyVPNPeers_TYPE = function () {
    return 'get'
}
export const getOrganizationThirdPartyVPNPeersURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}/thirdPartyVPNPeers'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the third party VPN peers for an organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '[[{"name":"My peer 1","publicIp":"123.123.123.1","privateSubnets":["192.168.1.0/24","192.168.128.0/24"],"secret":"asdf1234","ipsecPolicies":{"ikeCipherAlgo":["tripledes"],"ikeAuthAlgo":["sha1"],"ikeDHGroup":["group2"],"ikeLifetime":"28800","childCipherAlgo":["aes128"],"childAuthAlgo":["sha1"],"childPfsGroup":["disabled"],"childLifetime":"28800"}},{"name":"My peer 2","publicIp":"123.123.123.2","privateSubnets":["192.168.2.0/24","192.168.129.0/24"],"secret":"asdf56785678567856785678","ipsecPoliciesPreset":"default"}]]' 'https://api.meraki.com/api/v0/organizations/[id]/thirdPartyVPNPeers'
```
* request: updateOrganizationThirdPartyVPNPeers
* url: updateOrganizationThirdPartyVPNPeersURL
* method: updateOrganizationThirdPartyVPNPeers_TYPE
* raw_url: updateOrganizationThirdPartyVPNPeers_RAW_URL
     * @param id - 
     * @param body - 
*/
export const updateOrganizationThirdPartyVPNPeers = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{id}/thirdPartyVPNPeers'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateOrganizationThirdPartyVPNPeers_RAW_URL = function () {
    return '/organizations/{id}/thirdPartyVPNPeers'
}
export const updateOrganizationThirdPartyVPNPeers_TYPE = function () {
    return 'put'
}
export const updateOrganizationThirdPartyVPNPeersURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{id}/thirdPartyVPNPeers'
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the devices in a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices'
```
* request: getNetworkDevices
* url: getNetworkDevicesURL
* method: getNetworkDevices_TYPE
* raw_url: getNetworkDevices_RAW_URL
     * @param networkId - 
*/
export const getNetworkDevices = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkDevices_RAW_URL = function () {
    return '/networks/{networkId}/devices'
}
export const getNetworkDevices_TYPE = function () {
    return 'get'
}
export const getNetworkDevicesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a single device
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]'
```
* request: getNetworkDevice
* url: getNetworkDeviceURL
* method: getNetworkDevice_TYPE
* raw_url: getNetworkDevice_RAW_URL
     * @param networkId - 
     * @param serial - 
*/
export const getNetworkDevice = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/{serial}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkDevice_RAW_URL = function () {
    return '/networks/{networkId}/devices/{serial}'
}
export const getNetworkDevice_TYPE = function () {
    return 'get'
}
export const getNetworkDeviceURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/{serial}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update the attributes of a device
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT --data-binary '{"name":"My AP","lat":37.4180951010362,"lng":-122.098531723022,"serial":"Q234-ABCD-5678","mac":"00:11:22:33:44:55","tags":" recently-added "}' 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]'
```
* request: updateNetworkDevice
* url: updateNetworkDeviceURL
* method: updateNetworkDevice_TYPE
* raw_url: updateNetworkDevice_RAW_URL
     * @param networkId - 
     * @param serial - 
     * @param body - 
*/
export const updateNetworkDevice = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/{serial}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateNetworkDevice_RAW_URL = function () {
    return '/networks/{networkId}/devices/{serial}'
}
export const updateNetworkDevice_TYPE = function () {
    return 'put'
}
export const updateNetworkDeviceURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/{serial}'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return the uplink information for a device.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/uplink'
```
* request: getNetworkDeviceUplink
* url: getNetworkDeviceUplinkURL
* method: getNetworkDeviceUplink_TYPE
* raw_url: getNetworkDeviceUplink_RAW_URL
     * @param networkId - 
     * @param serial - 
*/
export const getNetworkDeviceUplink = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/{serial}/uplink'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkDeviceUplink_RAW_URL = function () {
    return '/networks/{networkId}/devices/{serial}/uplink'
}
export const getNetworkDeviceUplink_TYPE = function () {
    return 'get'
}
export const getNetworkDeviceUplinkURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/{serial}/uplink'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Claim a device into a network
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST --data-binary '{"serial":"Q234-ABCD-5678"}' 'https://api.meraki.com/api/v0/networks/[networkId]/devices/claim'
```
* request: claimNetworkDevices
* url: claimNetworkDevicesURL
* method: claimNetworkDevices_TYPE
* raw_url: claimNetworkDevices_RAW_URL
     * @param networkId - 
     * @param body - 
*/
export const claimNetworkDevices = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/claim'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const claimNetworkDevices_RAW_URL = function () {
    return '/networks/{networkId}/devices/claim'
}
export const claimNetworkDevices_TYPE = function () {
    return 'post'
}
export const claimNetworkDevicesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/claim'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Remove a single device
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/remove'
```
* request: removeNetworkDevice
* url: removeNetworkDeviceURL
* method: removeNetworkDevice_TYPE
* raw_url: removeNetworkDevice_RAW_URL
     * @param networkId - 
     * @param serial - 
*/
export const removeNetworkDevice = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/{serial}/remove'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const removeNetworkDevice_RAW_URL = function () {
    return '/networks/{networkId}/devices/{serial}/remove'
}
export const removeNetworkDevice_TYPE = function () {
    return 'post'
}
export const removeNetworkDeviceURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/{serial}/remove'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List LLDP and CDP information for a device
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/devices/[serial]/lldp_cdp?timespan=7200'
```
* request: getNetworkDeviceLldp_cdp
* url: getNetworkDeviceLldp_cdpURL
* method: getNetworkDeviceLldp_cdp_TYPE
* raw_url: getNetworkDeviceLldp_cdp_RAW_URL
     * @param networkId - 
     * @param serial - 
     * @param body - 
*/
export const getNetworkDeviceLldp_cdp = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/{serial}/lldp_cdp'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkDeviceLldp_cdp_RAW_URL = function () {
    return '/networks/{networkId}/devices/{serial}/lldp_cdp'
}
export const getNetworkDeviceLldp_cdp_TYPE = function () {
    return 'get'
}
export const getNetworkDeviceLldp_cdpURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/{serial}/lldp_cdp'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Get the uplink loss percentage and latency in milliseconds for a wired network device.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/{networkId}/devices/{serial}/lossAndLatencyHistory?uplink=wan1&ip=1.2.3.4&timespan=7200'
```
* request: getNetworkDeviceLossAndLatencyHistory
* url: getNetworkDeviceLossAndLatencyHistoryURL
* method: getNetworkDeviceLossAndLatencyHistory_TYPE
* raw_url: getNetworkDeviceLossAndLatencyHistory_RAW_URL
     * @param networkId - 
     * @param serial - 
     * @param uplink - The WAN uplink used to obtain the requested stats. Valid uplinks are wan1, wan2. The default is wan1.
     * @param ip - The destination IP used to obtain the requested stats. This is required.
     * @param t0 - The beginning of the timespan for the data. The maximum lookback period is 12 months from today.
     * @param t1 - The end of the timespan for the data. t1 can be a maximum of about 1 month after t0.
     * @param timespan - The timespan for which the information will be fetched. If specifying timespan, do not specify parameters t0 and t1. The value must be in seconds and be less than or equal to 2592000. The default is 86400.
     * @param resolution - The time resolution in seconds for returned data. The valid resolutions are: 60, 600, 3600, 86400. The default is 60.
*/
export const getNetworkDeviceLossAndLatencyHistory = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/devices/{serial}/lossAndLatencyHistory'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters['uplink'] !== undefined) {
        queryParameters['uplink'] = parameters['uplink']
    }
    if (parameters['ip'] !== undefined) {
        queryParameters['ip'] = parameters['ip']
    }
    if (parameters['ip'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: ip'))
    }
    if (parameters['t0'] !== undefined) {
        queryParameters['t0'] = parameters['t0']
    }
    if (parameters['t1'] !== undefined) {
        queryParameters['t1'] = parameters['t1']
    }
    if (parameters['timespan'] !== undefined) {
        queryParameters['timespan'] = parameters['timespan']
    }
    if (parameters['resolution'] !== undefined) {
        queryParameters['resolution'] = parameters['resolution']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkDeviceLossAndLatencyHistory_RAW_URL = function () {
    return '/networks/{networkId}/devices/{serial}/lossAndLatencyHistory'
}
export const getNetworkDeviceLossAndLatencyHistory_TYPE = function () {
    return 'get'
}
export const getNetworkDeviceLossAndLatencyHistoryURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/devices/{serial}/lossAndLatencyHistory'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['uplink'] !== undefined) {
        queryParameters['uplink'] = parameters['uplink']
    }
    if (parameters['ip'] !== undefined) {
        queryParameters['ip'] = parameters['ip']
    }
    if (parameters['t0'] !== undefined) {
        queryParameters['t0'] = parameters['t0']
    }
    if (parameters['t1'] !== undefined) {
        queryParameters['t1'] = parameters['t1']
    }
    if (parameters['timespan'] !== undefined) {
        queryParameters['timespan'] = parameters['timespan']
    }
    if (parameters['resolution'] !== undefined) {
        queryParameters['resolution'] = parameters['resolution']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Returns video link for the specified camera. If a timestamp supplied, it links to that time.
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/networks/[networkId]/cameras/[serial]/videoLink'
```
* request: getNetworkCameraVideoLink
* url: getNetworkCameraVideoLinkURL
* method: getNetworkCameraVideoLink_TYPE
* raw_url: getNetworkCameraVideoLink_RAW_URL
     * @param networkId - 
     * @param serial - 
     * @param body - 
*/
export const getNetworkCameraVideoLink = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/networks/{networkId}/cameras/{serial}/videoLink'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    if (parameters['networkId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: networkId'))
    }
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters['serial'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: serial'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getNetworkCameraVideoLink_RAW_URL = function () {
    return '/networks/{networkId}/cameras/{serial}/videoLink'
}
export const getNetworkCameraVideoLink_TYPE = function () {
    return 'get'
}
export const getNetworkCameraVideoLinkURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/networks/{networkId}/cameras/{serial}/videoLink'
    path = path.replace('{networkId}', `${parameters['networkId']}`)
    path = path.replace('{serial}', `${parameters['serial']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* List the SAML roles for this organization
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles'
```
* request: getOrganizationSamlRoles
* url: getOrganizationSamlRolesURL
* method: getOrganizationSamlRoles_TYPE
* raw_url: getOrganizationSamlRoles_RAW_URL
     * @param organizationId - 
*/
export const getOrganizationSamlRoles = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/samlRoles'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationSamlRoles_RAW_URL = function () {
    return '/organizations/{organizationId}/samlRoles'
}
export const getOrganizationSamlRoles_TYPE = function () {
    return 'get'
}
export const getOrganizationSamlRolesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/samlRoles'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Create a SAML role
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X POST 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles'
```
* request: createOrganizationSamlRoles
* url: createOrganizationSamlRolesURL
* method: createOrganizationSamlRoles_TYPE
* raw_url: createOrganizationSamlRoles_RAW_URL
     * @param organizationId - 
     * @param body - 
*/
export const createOrganizationSamlRoles = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/samlRoles'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('post', domain + path, body, queryParameters, form, config)
}
export const createOrganizationSamlRoles_RAW_URL = function () {
    return '/organizations/{organizationId}/samlRoles'
}
export const createOrganizationSamlRoles_TYPE = function () {
    return 'post'
}
export const createOrganizationSamlRolesURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/samlRoles'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Return a SAML role
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X GET 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles/[id]'
```
* request: getOrganizationSamlRole
* url: getOrganizationSamlRoleURL
* method: getOrganizationSamlRole_TYPE
* raw_url: getOrganizationSamlRole_RAW_URL
     * @param organizationId - 
     * @param id - 
*/
export const getOrganizationSamlRole = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/samlRoles/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('get', domain + path, body, queryParameters, form, config)
}
export const getOrganizationSamlRole_RAW_URL = function () {
    return '/organizations/{organizationId}/samlRoles/{id}'
}
export const getOrganizationSamlRole_TYPE = function () {
    return 'get'
}
export const getOrganizationSamlRoleURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/samlRoles/{id}'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Update a SAML role
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X PUT 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles/[id]'
```
* request: updateOrganizationSamlRole
* url: updateOrganizationSamlRoleURL
* method: updateOrganizationSamlRole_TYPE
* raw_url: updateOrganizationSamlRole_RAW_URL
     * @param organizationId - 
     * @param id - 
     * @param body - 
*/
export const updateOrganizationSamlRole = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/samlRoles/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters['body'] !== undefined) {
        body = parameters['body']
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('put', domain + path, body, queryParameters, form, config)
}
export const updateOrganizationSamlRole_RAW_URL = function () {
    return '/organizations/{organizationId}/samlRoles/{id}'
}
export const updateOrganizationSamlRole_TYPE = function () {
    return 'put'
}
export const updateOrganizationSamlRoleURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/samlRoles/{id}'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
* Remove a SAML role
    
## SAMPLE REQUEST
    
```
curl -L -H 'X-Cisco-Meraki-API-Key: <key>' -H 'Content-Type: application/json' -X DELETE 'https://api.meraki.com/api/v0/organizations/[organizationId]/samlRoles/[id]'
```
* request: deleteOrganizationSamlRole
* url: deleteOrganizationSamlRoleURL
* method: deleteOrganizationSamlRole_TYPE
* raw_url: deleteOrganizationSamlRole_RAW_URL
     * @param organizationId - 
     * @param id - 
*/
export const deleteOrganizationSamlRole = function (parameters = {}) {
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    const config = parameters.$config
    let path = '/organizations/{organizationId}/samlRoles/{id}'
    let body
    let queryParameters = {}
    let form = {}
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    if (parameters['organizationId'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: organizationId'))
    }
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters['id'] === undefined) {
        return Promise.reject(new Error('Missing required  parameter: id'))
    }
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        });
    }
    return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteOrganizationSamlRole_RAW_URL = function () {
    return '/organizations/{organizationId}/samlRoles/{id}'
}
export const deleteOrganizationSamlRole_TYPE = function () {
    return 'delete'
}
export const deleteOrganizationSamlRoleURL = function (parameters = {}) {
    let queryParameters = {}
    const domain = parameters.$domain ? parameters.$domain : getDomain()
    let path = '/organizations/{organizationId}/samlRoles/{id}'
    path = path.replace('{organizationId}', `${parameters['organizationId']}`)
    path = path.replace('{id}', `${parameters['id']}`)
    if (parameters.$queryParameters) {
        Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
            queryParameters[parameterName] = parameters.$queryParameters[parameterName]
        })
    }
    let keys = Object.keys(queryParameters)
    return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}