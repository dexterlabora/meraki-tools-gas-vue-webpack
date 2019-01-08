import { doGet } from "./do_get";
import { fetch } from "./fetch";
import { onOpen } from "./sidebar";
import { onInstall } from "./sidebar";
import { loadSidebar } from "./sidebar";
import { writeCsvData } from "./writeCsvData";

/**
 * The `global` object is a helper from gas-webpack-plugin. Webpack by default
 * does not provide any top-level function declarations, which are needed for
 * Google Apps Script to work properly; and Google Apps Script does not provide
 * an equivalent to `global` or `window` to hook onto.
 *
 * This object provides the glue to make functions available to Google Apps Script's
 * tooling. If you want to define a trigger function such as doGet()
 * (see https://developers.google.com/apps-script/guides/triggers/),
 * a function a user can run from the GAS editor, a function to call from
 * the client with `google.script.run`, OR a function to run in an
 * automated job... Do all of that by assigning these functions
 * to `global`.
 *
 * Note that no matter your deployment target, you must set webpack's mode to
 * "production" or this won't work.
 */
global.doGet = doGet;
global.fetch = fetch;
global.onOpen = onOpen;
global.onInstall = onInstall;
global.loadSidebar = loadSidebar;
global.writeCsvData = writeCsvData;
