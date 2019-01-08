# Meraki Tools for Google Sheets

- Meraki API
- VueJS w/ Vuetify
- Webpack & GAS conversion

## Features

- Reports
  - Clients
  - Devices
  - Networks
  - Organizations
  - ... more
- Tools
  - Create Client
  - Configure SSIDs
  - Configure VLANs
  - Claim Order

## Installation

### Pre-reqs

Installed and can run them from the command line with `yarn`, `webpack`, and `clasp` respectively.

- [Yarn](https://yarnpkg.com/en/)

  [install guide](https://yarnpkg.com/en/docs/install#mac-stable)

- [Webpack](https://www.npmjs.com/package/webpack)

  `yarn add webpack --dev`

- [Clasp]

  `npm install @google/clasp -g`

### Install

1. Clone this repo
2. Load dependencies with `yarn install`
3. Make the JS bundles with `yarn build`
4. Update `clasp/.clasp.json`, setting `"scriptId"` to your project's ID (so if your project's URL was https://script.google.com/d/foo123bar321) then `"scriptId"` should be `"foo123bar321"`)
5. Build and deploy with `yarn clush`
6. Serve dev server with `yarn serve`

- An API proxy server is required for local api development.

## To Do

- Add local node proxy server.
- more reports
- more tools
- developer guide

## Built from starter project:

### gas-ts-vue-webpack

[repo](https://github.com/MattiasMartens/gas-ts-vue-webpack.git)

Template for a project that combines some of my favourite tools: Google Apps Script, Clasp, TypeScript, Vue, and Webpack.

- **Google Apps Script** bootstraps a web app with GSuite integration, authentication, and a convenient RPC framework (i.e., `google.script.run.{your-top-level-function-here}`)
- **Clasp** lets you push your entire locally managed project to Google Apps Script - no more copy and paste! (See <https://codelabs.developers.google.com/codelabs/clasp/#1> for installation instructions.)
- **TypeScript** gives compile-time type-checking
- **Vue** provides a framework for rapid development of an interactive front-end for the app
- **Webpack** bundles the backend and frontend code into two bundles of ES5 JavaScript

### Webpack note

The bundled frontend code goes to `clasp/dist/index.js.html` which is then loaded into the HTML template in `clasp/index.html`. Unfortunately, Google Apps Script does not let you serve raw JavaScript code - it must be treated as raw HTML. Accordingly, HTML-semantic characters like `<` and `>` are escaped which naturally breaks the code.

The best and only fix I have found is to wrap the generated bundle in a `<script>` tag, turning it into valid HTML that does not need to be escaped. This is accomplished with the Webpack Shell Plugin and `scripts/wrap-in-script.sh`.
