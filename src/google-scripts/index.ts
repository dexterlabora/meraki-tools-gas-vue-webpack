import { doGet } from "./do_get";
import { fetch } from "./fetch";
import { loadSidebar } from "./sidebar";
import { refreshReports } from "./refreshReports";
import { writeCsvData } from "./writeCsvData";
import { loadMenu } from "./menu";
import { merakiFetchReport } from "./merakiFetchReport"
import * as merakiWebhookReceiver from "./merakiWebhookReceiver"
import * as utilities from "./utilities"
import { hello } from "./hello"
import { setUserApiKey } from "./setUserApiKey"

function onOpen() {
  //loadSidebar(); //permissions issue
  loadMenu();
}

function onInstall() {
  refreshReports(); // adds _meraki_tools settings sheet
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
global.refreshReports = refreshReports;

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
global.utilities = utilities;

/**
 * Fetches Meraki API data and formats the JSON data into Google Sheet format
 * @param url url to pull json data from
 * @param apiKey API key for authorization
 * @param title The title text to display in the cell
 * @param refresh Triggers a refresh of the report when changed. Google does not permit the use of now() or random functions to be used here. Instead, a hidden _meraki_tools sheet is created and stores a timestamp at cell '_meraki_tools'!B1 that gets updated when the Refresh Reports function is run. You can optionaly set a Trigger to call the refreshReports function on a schedule. 
 * @return Google Sheet data
 * @customfunction
 */
global.merakiFetchReport = (url: string,apiKey: string, title: string, refresh:string) => merakiFetchReport(url,apiKey,title,refresh);
global.setUserApiKey = setUserApiKey;


global.merakiWebhookReceiver = merakiWebhookReceiver