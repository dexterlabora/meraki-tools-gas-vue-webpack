# gas-ts-vue-webpack

Template for a project that combines some of my favourite tools: Google Apps Script, Clasp, TypeScript, Vue, and Webpack.

- **Google Apps Script** bootstraps a web app with GSuite integration, authentication, and a convenient RPC framework (i.e., `google.script.run.{your-top-level-function-here}`)
- **Clasp** lets you push your entire locally managed project to Google Apps Script - no more copy and paste! (See <https://codelabs.developers.google.com/codelabs/clasp/#1> for installation instructions.)
- **TypeScript** gives compile-time type-checking
- **Vue** provides a framework for rapid development of an interactive front-end for the app
- **Webpack** bundles the backend and frontend code into two bundles of ES5 JavaScript

## Installation

I'm assuming you have Yarn, Webpack, and Clasp installed and can run them from the command line with `yarn`, `webpack`, and `clasp` respectively.

1. Clone this repo
2. Load dependencies with `yarn install`
3. Make the JS bundles with `yarn build`
4. Update `clasp/.clasp.json`, setting `"scriptId"` to your project's ID (so if your project's URL was https://script.google.com/d/foo123bar321) then `"scriptId"` should be `"foo123bar321"`)
5. Build and deploy with `yarn clush`

### Webpack note

The bundled frontend code goes to `clasp/dist/index.js.html` which is then loaded into the HTML template in `clasp/index.html`. Unfortunately, Google Apps Script does not let you serve raw JavaScript code - it must be treated as raw HTML. Accordingly, HTML-semantic characters like `<` and `>` are escaped which naturally breaks the code.

The best and only fix I have found is to wrap the generated bundle in a `<script>` tag, turning it into valid HTML that does not need to be escaped. This is accomplished with the Webpack Shell Plugin and `scripts/wrap-in-script.sh`.

## Why do this?

### How is this better than building an app with Node and communicating with Google through its APIs?

For a sufficiently large app, it probably isn't. But Google Apps Script handles authentication and infrastructure right out of the box, and integration with GSuite tools such as Sheets and GMail is implicit - no need for handshakes, tokens, or sessions.

### How is this better than writing vanilla JS and pushing that to Google Apps Script with Clasp?

For a sufficiently _small_ app, it probably isn't! But Google Apps Script runs a variant of JS that only supports ES5, and it sucks to write ES5 by hand when there are such better options available.

It's helpful to know that TypeScript's command-line compiler, `tsc`, can compile TypeScript (or even plain ES6) to ES5 with less hassle than is required to configure Webpack. However, that method will not allow you to bundle dependencies, making it more difficult than it needs to be to bring in libraries from NPM.

## Modification/extension ideas

- In my own projects, I've found it very helpful to forego Google Apps Script's version management and maintain two separate live projects, one for staging and one for production. This can be managed by extending `clasp/.clasp.json` with a `"prodScriptId"` and `"stagingScriptId"` and making a deploy-to-production script that swaps them for deployment and swaps them back afterward. An environment-dependent config file would help greatly here as well.
- Needless to say, this template can be adjusted to use any language that has an ES5 transpiler tool, not just TypeScript.
- It might be desirable to separate the bundle configuration for the frontend from the bundle configuration for the backend - let's say you want the backend code to be friendly-formatted ES5 and the frontend to be uglified, minified ES6.
