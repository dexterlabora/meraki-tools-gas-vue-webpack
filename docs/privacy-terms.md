## Privacy Policy

The add-on is subject to the standard [Google Privacy Policy](https://policies.google.com/privacy). 

No information is stored outside of the running instance of the application attached to the active Google Sheet. The application relies upon the [Cisco Meraki Dashboard API](https://developer.cisco.com/meraki/api) for retrieving and updating a Meraki Network. Access granted to the Meraki network is governed by the [API key](https://developer.cisco.com/meraki/api/#/rest/getting-started/enabling-the-dashboard-api) created by the administrator of the given network. 


### Who is requesting Google user data? 

The Meraki Tools add-on is provided as a free utility to Cisco Meraki administrators. No user information is collected with exception of gathering application usage statistics such as the number of downloads and active users. No information pertaining to the Google account, Meraki account or Sheets content is collected or analyzed in any way. 

### What data is being requested and why?

There will be a level of access required for the normal operation of the Add-on. This is reflected in the OAuth scopes requested below. 

#### OAuth Scope Explanations

The application will require a few permission scopes to perform its basic functionality. Scopes express the permissions requested to authorize the app and allow the project to access specific types of private user data from their Google Account. [Learn more](https://developers.google.com/identity/protocols/oauth2/scopes)

**.../auth/script.container.ui**

- Required to host the sidebar web app to present a menu of dynamic reports and tools for working the Cisco Meraki API

**.../auth/script.external_request**

- API calls are only made to the [Cisco Meraki API](https://developer.cisco.com/meraki/api-v1/) and [Meraki Github repository](https://github.com/meraki/openapi/releases) for interacting with a Meraki cloud network. 

**.../auth/spreadsheets**

- This app is a Google Sheets Add-on which will parse the resulting Meraki API requests and display the data into the active Sheet. The app will require access to write the contents to the document.


## Terms of Service

The add-on is free for public use with no guarantees or official support. The project is open source utlizing the Apache license. 

Issues can be submitted [here.](https://github.com/dexterlabora/meraki-tools-gas-vue-webpack/issues)

Project source code is available [here](https://github.com/dexterlabora/meraki-tools-gas-vue-webpack)
