import { doGet } from "./do_get";
import { fetch } from "./fetch";
import { loadSidebar } from "./sidebar";
import { writeCsvData } from "./writeCsvData";
import { loadMenu } from "./menu";
import { hello } from "./hello"

function onOpen() {
  //loadSidebar(); //permissions issue
  loadMenu();
}

function onInstall() {
  onOpen();
}

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
global.loadMenu = loadMenu;
global.doGet = doGet;
/**
 * Fetch an API request
 *
 * @param {path} URL API path .
 * @param {options} request options.
 * @return JSON data
 * @customfunction
 */
global.fetch = fetch;
global.onOpen = onOpen;
global.onInstall = onInstall;
global.loadSidebar = loadSidebar;
/**
 * Converts CSV data into Sheet format
 *
 * @param {csvContent} csv data.
 * @param {title} title of results.
 * @return Google Sheet data
 * @customfunction
 */
global.writeCsvData = writeCsvData;

/**
 * Hello !
 *
 * @param {name} URL API path .
 * @return response string
 * @customfunction
 */
global.hello = hello;
