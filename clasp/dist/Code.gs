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
function loadMenu() {
}
function doGet() {
}
function refreshReports() {
}
/**
 * Fetch an API request
 *
 * @param {path} URL API path .
 * @param {options} request options.
 * @return JSON data
 * @customfunction
 */
function fetch() {
}
function onOpen() {
}
function onInstall() {
}
function loadSidebar() {
}
/**
 * Converts CSV data into Sheet format
 *
 * @param {csvContent} csv data.
 * @param {title} title of results.
 * @return Google Sheet data
 * @customfunction
 */
function writeCsvData() {
}
/**
 * Hello !
 *
 * @param {name} URL API path .
 * @return response string
 * @customfunction
 */
function hello() {
}
function utilities() {
}
/**
 * Fetches Meraki API data and formats the JSON data into Google Sheet format
 * @param url url to pull json data from
 * @param apiKey API key for authorization
 * @param title The title text to display in the cell
 * @param refresh Triggers a refresh of the report when changed. Google does not permit the use of now() or random functions to be used here. Instead, a hidden _meraki_tools sheet is created and stores a timestamp at cell '_meraki_tools'!B1 that gets updated when the Refresh Reports function is run. You can optionaly set a Trigger to call the refreshReports function on a schedule.
 * @return Google Sheet data
 * @customfunction
 */
function merakiFetchReport(url, apiKey, title, refresh) {
}
function setUserApiKey() {
}
function merakiWebhookReceiver() {
}(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/clasp/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 697);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenObject", function() { return flattenObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseJsonToCsv", function() { return parseJsonToCsv; });
// Helper functions
function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i))
            continue;
        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x))
                    continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        }
        else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}
;
function parseJsonToCsv(json, keys) {
    var values = [];
    // Parse JSON Object
    if (!Array.isArray(json)) {
        // Get Values
        var v = [];
        keys.forEach(function (k) {
            v.push(json[k]);
        });
        values.push(keys.toString());
        values.push("\n" + v);
        //Logger.log('Parse Object values %s',values);
    }
    else {
        // Parse JSON Array of Objects
        for (var i = 0; i < json.length; i++) {
            var data = json[i];
            // Get Values
            var v = [];
            keys.forEach(function (k) {
                v.push(data[k]);
            });
            // Create a new line
            if (i > 0) {
                values.push("\n" + v);
            }
            else {
                values.push(keys.toString());
                values.push("\n" + v);
            }
            //     Logger.log('Parse Array of Object values '+i + " : " +v);
        }
    }
    return values;
}


/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Fetch an API request
 *
 * @param {path} URL API path .
 * @param {options} request options.
 * @return JSON data
 * @customfunction
 */
function fetch(path, options) {
    if (options === void 0) { options = {}; }
    options = __assign({ followRedirects: true }, options);
    options["muteHttpExceptions"] = true; // passes error on to client for processing / display
    try {
        var res = UrlFetchApp.fetch(path, options);
        var responseCode = res.getResponseCode();
        var responseBody = res.getContentText();
        return {
            body: responseBody,
            headers: res.getHeaders(),
            statusCode: responseCode
        };
    }
    catch (e) {
        Logger.log("meraki tools fetch error: " + e);
        return e;
    }
}


/***/ }),

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshReports", function() { return refreshReports; });
function refreshReports() {
    var TIMESTAMP = new Date().toTimeString();
    var SHEET_NAME = "_meraki_tools";
    var TIMESTAMP_SHEET_CELL_LABEL = "A1";
    var TIMESTAMP_SHEET_CELL = "B1";
    // *************************
    // Initialize Settings Sheet and Environment Variables
    // find or create settings sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss.getSheetByName(SHEET_NAME) == null) {
        ss.insertSheet(SHEET_NAME);
        // ss.getRange(API_KEY_SHEET_CELL_LABEL).setValue('API KEY:');
        // ss.getRange(ORG_ID_SHEET_CELL_LABEL).setValue('Org ID:');
        // ss.getRange(NET_ID_SHEET_CELL_LABEL).setValue('Net ID:');
        // ss.getRange(API_KEY_SHEET_CELL).setValue('YourAPIKey');
        // ss.getRange(ORG_ID_SHEET_CELL).setValue('YourOrgId');
        // ss.getRange(NET_ID_SHEET_CELL).setValue('YourNetId (optional)');
        ss.getRange(TIMESTAMP_SHEET_CELL_LABEL).setValue('Last run timestamp:');
        ss.getRange(TIMESTAMP_SHEET_CELL).setValue(TIMESTAMP);
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME).hideSheet();
    }
    var settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    settingsSheet.getRange(TIMESTAMP_SHEET_CELL).setValue(TIMESTAMP);
    // re-evaluates all functions
    SpreadsheetApp.flush();
    return;
}


/***/ }),

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadMenu", function() { return loadMenu; });
function loadMenu() {
    // Main Menu
    var ui = SpreadsheetApp.getUi();
    var mainMenu = ui.createMenu("Meraki-Tools");
    mainMenu.addItem("Main Menu", "loadSidebar");
    mainMenu.addItem("Refresh Reports", "refreshReports");
    mainMenu.addToUi();
}


/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doGet", function() { return doGet; });
function doGet(e) {
    /**
     * If you want to serve up other content than the single-page app, you can either
     * use `google.script.run` on the client-side to serve JSON or extend this to
     * serve any other content you might want.
     */
    var q = e.parameter["q"];
    return HtmlService.createTemplateFromFile("index").evaluate();
}


/***/ }),

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSidebar", function() { return loadSidebar; });
function loadSidebar() {
    var htmlTemplate = HtmlService.createTemplateFromFile("index");
    var html = htmlTemplate.evaluate().setTitle("Meraki Tools");
    //SpreadsheetApp.getUi().showSidebar(html); causes permissions issues
    var ui = function () {
        return SpreadsheetApp.getUi();
    };
    ui().showSidebar(html);
}


/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeCsvData", function() { return writeCsvData; });
// Display Data on a Google Sheet
var sheet = function () {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
};
/**
 * Converts CSV data into Sheet format
 *
 * @param {csvContent} csv data.
 * @param {title} title of results.
 * @return Google Sheet data
 * @customfunction
 */
function writeCsvData(csvContent, title, location) {
    try { // fix the bug on Utilities.parseCsv() google script function which does not allow newlines in csv strings @simonjamain
        var csvData = [""];
        if (!csvContent) {
            Logger.log("writeCsvData no csvContent");
            Logger.log("title %s", title);
            sheet().getActiveCell().setValue(title).setBackground("#67b346");
            return;
        }
        else {
            Logger.log("csvContent", csvContent.toString());
            csvContent = csvContent.replace(/(["'])(?:(?=(\\?))\2[\s\S])*?\1/g, function (e) {
                return e.replace(/\r?\n|\r/g, " ");
            });
            csvContent = title + "\n" + csvContent;
            csvData = Utilities.parseCsv(csvContent);
            Logger.log("parsed csvData.toString() ", csvData.toString());
        }
        switch (location) {
            case "overwrite":
                toActiveCellOverwrite(csvData);
                break;
            case "newSheet":
                toNewSheet(csvData);
                break;
            case "newRows":
                toNewRows(csvData);
                break;
            default: toActiveCellOverwrite(csvData);
        }
        // Insert new rows
        // TO DO
    }
    catch (error) {
        Logger.log("writeCsvData error: " + error);
    }
}
function toNewRows(csvData) {
    sheet().insertRows(sheet().getActiveCell().getLastRow(), csvData.length);
    sheet().getRange(sheet().getActiveCell().getLastRow(), sheet().getActiveCell().getColumn(), csvData.length, csvData[0].length).setValues(csvData);
}
function toActiveCellOverwrite(csvData) {
    sheet().getRange(sheet().getActiveCell().getLastRow(), sheet().getActiveCell().getColumn(), csvData.length, csvData[0].length).setValues(csvData);
}
// to use still
var spreadsheet = function () {
    return SpreadsheetApp.getActiveSpreadsheet();
};
function toNewSheet(csvData) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var datetime = getDateTimeString();
    var title = csvData.toString().split(",")[0] + " : " + datetime;
    Logger.log("creating sheet with title ", title);
    sheet.insertSheet(title);
    var newSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(title);
    newSheet.getRange(sheet.getActiveCell().getLastRow(), sheet.getActiveCell().getColumn(), csvData.length, csvData[0].length).setValues(csvData);
}
function toActiveCellNewRows() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var lRow = sheet.getLastRow();
    var lCol = sheet.getLastColumn(), range = sheet.getRange(lRow, 1, 1, lCol);
    sheet.insertRowsAfter(lRow, 1);
    range.copyTo(sheet.getRange(lRow + 1, 1, 1, lCol), { contentsOnly: false });
}
function getDateTimeString() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
}


/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doGet", function() { return doGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doPost", function() { return doPost; });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(182);

/*
Copy this function over the existing Code.gs file in a Google Sheet
Save the Sheet/Script
Publish App
- Execute as You
- Avaiable to Anyone (including anonymous)
Authorize App when prompted
The URL will act as the Webhook URL for Meraki to send alerts
*/
// Flattens a nested object for easier use with a spreadsheet // MOVED TO utilities.ts
// function flattenObject(ob) {
//     var toReturn = {};	
//      for (var i in ob) {
//          if (!ob.hasOwnProperty(i)) continue;		
//          if ((typeof ob[i]) == 'object') {
//              var flatObject = flattenObject(ob[i]);
//              for (var x in flatObject) {
//                  if (!flatObject.hasOwnProperty(x)) continue;				
//                  toReturn[i + '.' + x] = flatObject[x];
//              }
//          } else {
//              toReturn[i] = ob[i];
//          }
//      }
//      return toReturn;
//  };
// formats a key/value to UTC time based on selected keys
function changeTimeFormat(key, value) {
    var keysToFormat = ['sentAt', 'occurredAt', 'alertData.timestamp'];
    if (keysToFormat.indexOf(key) > -1) {
        var date = new Date(value * 1000).toUTCString();
        return date;
    }
    else {
        return value;
    }
}
// Google sheets are created with 26 columns, but some alerts contain more than 26 keys 
// As each key is inserted into its own column, having more keys than columns causes an out of bounds error 
// This functions add the appropirate amount of extra columns if required
function addExtraColumns(alertSheet, keylength) {
    var sheet_column_count = alertSheet.getMaxColumns();
    var extra_columns_required = keylength - sheet_column_count;
    if (extra_columns_required > 0) {
        alertSheet.insertColumns(1, extra_columns_required);
    }
}
function setHeaders(sheet, values) {
    var headerRow = sheet.getRange(1, 1, 1, values.length);
    headerRow.setValues([values]);
    headerRow.setFontWeight("bold").setHorizontalAlignment("center");
}
function display(data) {
    // Flatten JSON object and extract keys and values into seperate arrays
    var flat = _utilities__WEBPACK_IMPORTED_MODULE_0__["flattenObject"](data);
    var keys = Object.keys(flat);
    var values = [];
    var headers = [];
    var alertSheet;
    // Find or create sheet for alert type and set headers
    var alertType = data['alertType'];
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss.getSheetByName(alertType) == null) {
        ss.insertSheet(alertType);
        // Create Headers and Format
        alertSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(alertType);
        addExtraColumns(alertSheet, keys.length);
        alertSheet.setColumnWidths(1, keys.length, 200);
        headers = keys;
    }
    else {
        alertSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(alertType);
        // retrieve existing headers
        headers = alertSheet.getRange(1, 1, 1, alertSheet.getLastColumn() || 1).getValues()[0];
        //headers = [headers];
        Logger.log('existing headers: ' + headers);
        Logger.log('keys: ' + keys);
        // add any additional headers
        var newHeaders = [];
        newHeaders = keys.filter(function (k) { return headers.indexOf(k) > -1 ? false : k; });
        Logger.log('adding new headers: ' + newHeaders);
        newHeaders.forEach(function (h) {
            headers.push(h);
        });
    }
    Logger.log('headers: ' + headers);
    setHeaders(alertSheet, headers);
    // push values based on headers
    headers.forEach(function (h) {
        Logger.log('h: ' + h);
        Logger.log('flat[h]: ' + flat[h]);
        //var formattedValue = changeTimeFormat(h,flat[h]);
        //Logger.log('formattedValue: '+formattedValue);
        //values.push(formattedValue);
        values.push(flat[h]);
    });
    // Insert Data into Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(alertType);
    var lastRow = Math.max(sheet.getLastRow(), 1);
    sheet.insertRowAfter(lastRow);
    sheet.getRange(lastRow + 1, 1, 1, headers.length).setValues([values]).setFontWeight("normal").setHorizontalAlignment("center");
}
// Webhook GET request. Simply verifies that server is reachable.
function doGet(e) {
    return HtmlService.createHtmlOutput("Meraki Webhook Google Sheets");
}
// Webhook Receiver - triggered with post to pusblished App URL.
function doPost(e) {
    var params = JSON.stringify(e.postData.contents);
    params = JSON.parse(params);
    var postData = JSON.parse(params);
    display(postData);
    // HTTP Response
    return HtmlService.createHtmlOutput("post request received");
}
var testData = {
    "alertData": {
        "timestamp": 1536127239.706,
        "roi": { "top": 0, "left": 0, "width": 60, "height": 33 }
    },
    "alertId": "643451796765275003",
    "alertType": "Motion detected",
    "occurredAt": 1536127340.8236248,
    "sentAt": 1536127344.593023,
    "organizationId": "306XXXXX",
    "organizationName": "Miles Laboratory",
    "organizationUrl": "https://n143.meraki.com/o/3ZZIub/manage/organization/overview",
    "networkId": "L_643451796760XXXXX",
    "networkName": "Miles- Home",
    "networkUrl": "https://n143.meraki.com/Miles-Ho/n/RSv2xapc/manage/nodes/list",
    "deviceSerial": "Q2GV-ZZZZ-XXXX",
    "deviceMac": "34:56:fe:a3:24:06",
    "deviceName": "MV12w-desk-06",
    "deviceUrl": "https://n143.meraki.com/Miles-Ho/n/RSv2xapc/manage/nodes/new_list/57548243936262",
    "testParam2": "bar"
};
function test() {
    display(testData);
}


/***/ }),

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hello", function() { return hello; });
/**
 * Hello !
 *
 * @param {name} URL API path .
 * @return response string
 * @customfunction
 */
function hello(name) {
    return "Hello ".concat(name, "!");
}


/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUserApiKey", function() { return setUserApiKey; });
function setUserApiKey(apiKey) {
    try {
        // Set a property in each of the three property stores.
        var scriptProperties = PropertiesService.getScriptProperties();
        var userProperties = PropertiesService.getUserProperties();
        var documentProperties = PropertiesService.getDocumentProperties();
        Logger.log("Script props %s", JSON.stringify(scriptProperties.getProperties()));
        Logger.log("User props %s", JSON.stringify(userProperties.getProperties()));
        Logger.log("Document props %s", JSON.stringify(documentProperties.getProperties()));
        // scriptProperties.setProperty('SERVER_URL', 'http://www.example.com/');
        userProperties.setProperty('MERAKI_API_KEY', apiKey);
        Logger.log("User apiKey %s", JSON.stringify(userProperties.getProperties()));
        // documentProperties.setProperty('SOURCE_DATA_ID',
        //     '1j3GgabZvXUF177W0Zs_2v--H6SPCQb4pmZ6HsTZYT5k');
    }
    catch (err) {
        // TODO (developer) - Handle exception
        Logger.log('Failed with error %s', err.message);
    }
}


/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "merakiFetchReport", function() { return /* binding */ merakiFetchReport; });

// EXTERNAL MODULE: ./src/google-scripts/utilities.ts
var utilities = __webpack_require__(182);

// CONCATENATED MODULE: ./src/google-scripts/reportHelpers.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Extracts report of paths and relavent information of a Swagger / OAS v2 JSON object.
function parseSwaggerPaths(swagger) {
    var paths = swagger["paths"];
    //console.log("organization Open API paths", paths);
    var report = [];
    try {
        // get paths
        Object.keys(paths).forEach(function (path, index) {
            // get details for each path resource
            Object.keys(paths[path]).forEach(function (p, i) {
                var tag = paths[path][p]["tags"][0];
                var summary = paths[path][p]["summary"];
                var description = paths[path][p]["description"];
                var operationId = paths[path][p]["operationId"];
                var params = paths[path][p]["parameters"] || [];
                var method = Object.keys(paths[path])[i];
                var responses = __assign({}, paths[path][p]["responses"]);
                var example_200 = "";
                try {
                    example_200 = JSON.stringify(responses["200"]["examples"]["application/json"]).replaceAll(",", ";");
                }
                catch (e) {
                }
                var example_201 = "";
                try {
                    example_201 = JSON.stringify(responses["201"]["examples"]["application/json"]).replaceAll(",", ";");
                }
                catch (e) {
                }
                // pathParams
                var pathParams = [];
                var filteredPathParams = params.filter(function (p) { return p.in.includes("path"); });
                filteredPathParams.forEach(function (p) { return pathParams.push(p.name); });
                //pathParams = JSON.stringify(pathParams);
                pathParams = pathParams.join("; ").toString();
                // queryParams
                var queryParams = [];
                var filteredQueryParams = params.filter(function (p) { return p.in.includes("query"); });
                filteredQueryParams.forEach(function (p) { return queryParams.push(p.name); });
                //queryParams = JSON.stringify(queryParams);
                queryParams = queryParams.join("; ");
                // bodyModel
                var bodyModel = [];
                var filteredBodyModel = params.filter(function (p) { return p.in.includes("body"); });
                filteredBodyModel.forEach(function (p) { return bodyModel.push(p.name); });
                //bodyModel = JSON.stringify(bodyModel);
                bodyModel = bodyModel.join(", ");
                //summary
                summary = summary.replaceAll(",", ";"); // replaces , with ; to avoid csv chaos
                // create report
                report.push({
                    //tag,
                    path: path,
                    operationId: operationId,
                    summary: summary,
                    "product tags.0": paths[path][p]["tags"][0],
                    "category tags.1": paths[path][p]["tags"][1],
                    "service tags.2": paths[path][p]["tags"][1],
                    method: method,
                    pathParams: pathParams,
                    queryParams: queryParams,
                    example_200: example_200,
                    example_201: example_201,
                    //j bodyModel
                    //description //this data has chararcter conflicts with the sheet
                });
            });
            // sort order based on group tag name.
            report = report.sort(function (a, b) {
                if (a.tag < b.tag)
                    return -1;
                if (a.tag > b.tag)
                    return 1;
                return 0;
            });
        });
        return report;
    }
    catch (error) {
        return error;
        //throw (error, "parseSwaggerPaths");
    }
}
function parseNetworkEvents(events) {
    return events.events;
}

// EXTERNAL MODULE: ./src/google-scripts/fetch.ts
var fetch = __webpack_require__(457);

// CONCATENATED MODULE: ./src/google-scripts/merakiFetchReport.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



// Global Functions
/**
 * Fetches Meraki API data and formats the JSON data into Google Sheet format
 * @param url url to pull json data from
 * @param apiKey API key for authorization
 * @param title The title text to display in the cell
 * @param refresh Triggers a refresh of report when changed. Cannot use now() functions, so a helper "Refresh Reports" button will update a hidden _meraki_tools settings sheet to set a time, triggering the function to re-evaluate. You can optionaly set a Trigger to call the refreshReports function on a schedule.
 * @return Google Sheet data
 * @customfunction
 */
function merakiFetchReport(url, apiKey, title, refresh) {
    return __awaiter(this, void 0, void 0, function () {
        var userProperties, date, baseUrl, options, res, result, data, keys, results, csvData, arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refresh = refresh; // this does nothing, but triggers a change event for google sheets to re-evaluate the function
                    userProperties = PropertiesService.getUserProperties();
                    apiKey = apiKey || userProperties.getProperty("MERAKI_API_KEY");
                    date = new Date();
                    title = title || "Meraki API";
                    title = "".concat(title, " , ").concat(url, ", Updated: ").concat(date.toISOString(), " \n");
                    baseUrl = "https://api.meraki.com/api/v1" // consider sourcing this from a global namespace
                    ;
                    url = url.includes("https://") ? url : baseUrl + url;
                    options = {
                        "async": true,
                        "crossDomain": true,
                        "method": "GET",
                        "headers": { 'X-Cisco-Meraki-API-Key': apiKey }
                    };
                    res = {};
                    return [4 /*yield*/, Object(fetch["fetch"])(url, options)];
                case 1:
                    res = _a.sent();
                    result = {};
                    try {
                        result = JSON.parse(res["body"]);
                        // report helpers
                        if (url.includes("openapiSpec")) {
                            result = parseSwaggerPaths(result);
                        }
                        else if (url.includes("/events")) {
                            result = parseNetworkEvents(result);
                        }
                    }
                    catch (e) {
                        result = e;
                    }
                    data = [];
                    keys = [];
                    results = [];
                    // find keys
                    if (Array.isArray(result)) {
                        results = __spreadArray(__spreadArray([], [], false), result, true);
                    }
                    else {
                        results.push(result);
                    }
                    results.forEach(function (obj) {
                        var flat = {};
                        flat = utilities["flattenObject"](obj) || {};
                        data.push(flat);
                        // set keys
                        Object.keys(flat).forEach(function (value) {
                            if (keys.indexOf(value) == -1)
                                keys.push(value);
                        });
                    });
                    return [4 /*yield*/, utilities["parseJsonToCsv"](data, keys).toString()];
                case 2:
                    csvData = _a.sent();
                    Logger.log("csvData results: %s", csvData);
                    // add title
                    csvData = title + csvData;
                    return [4 /*yield*/, Utilities.parseCsv(csvData)];
                case 3:
                    arr = _a.sent();
                    Logger.log(" csvToArray arr : %s", arr);
                    SpreadsheetApp.flush();
                    return [2 /*return*/, arr];
            }
        });
    });
}


/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _do_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(690);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(457);
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(691);
/* harmony import */ var _refreshReports__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(685);
/* harmony import */ var _writeCsvData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(692);
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(686);
/* harmony import */ var _merakiFetchReport__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(696);
/* harmony import */ var _merakiWebhookReceiver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(693);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(182);
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(694);
/* harmony import */ var _setUserApiKey__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(695);











function onOpen() {
    //loadSidebar(); //permissions issue
    Object(_menu__WEBPACK_IMPORTED_MODULE_5__["loadMenu"])();
}
function onInstall() {
    Object(_refreshReports__WEBPACK_IMPORTED_MODULE_3__["refreshReports"])(); // adds _meraki_tools settings sheet
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
global.loadMenu = _menu__WEBPACK_IMPORTED_MODULE_5__["loadMenu"];
global.doGet = _do_get__WEBPACK_IMPORTED_MODULE_0__["doGet"];
global.refreshReports = _refreshReports__WEBPACK_IMPORTED_MODULE_3__["refreshReports"];
/**
 * Fetch an API request
 *
 * @param {path} URL API path .
 * @param {options} request options.
 * @return JSON data
 * @customfunction
 */
global.fetch = _fetch__WEBPACK_IMPORTED_MODULE_1__["fetch"];
global.onOpen = onOpen;
global.onInstall = onInstall;
global.loadSidebar = _sidebar__WEBPACK_IMPORTED_MODULE_2__["loadSidebar"];
/**
 * Converts CSV data into Sheet format
 *
 * @param {csvContent} csv data.
 * @param {title} title of results.
 * @return Google Sheet data
 * @customfunction
 */
global.writeCsvData = _writeCsvData__WEBPACK_IMPORTED_MODULE_4__["writeCsvData"];
/**
 * Hello !
 *
 * @param {name} URL API path .
 * @return response string
 * @customfunction
 */
global.hello = _hello__WEBPACK_IMPORTED_MODULE_9__["hello"];
global.utilities = _utilities__WEBPACK_IMPORTED_MODULE_8__;
/**
 * Fetches Meraki API data and formats the JSON data into Google Sheet format
 * @param url url to pull json data from
 * @param apiKey API key for authorization
 * @param title The title text to display in the cell
 * @param refresh Triggers a refresh of the report when changed. Google does not permit the use of now() or random functions to be used here. Instead, a hidden _meraki_tools sheet is created and stores a timestamp at cell '_meraki_tools'!B1 that gets updated when the Refresh Reports function is run. You can optionaly set a Trigger to call the refreshReports function on a schedule.
 * @return Google Sheet data
 * @customfunction
 */
global.merakiFetchReport = function (url, apiKey, title, refresh) { return Object(_merakiFetchReport__WEBPACK_IMPORTED_MODULE_6__["merakiFetchReport"])(url, apiKey, title, refresh); };
global.setUserApiKey = _setUserApiKey__WEBPACK_IMPORTED_MODULE_10__["setUserApiKey"];
global.merakiWebhookReceiver = _merakiWebhookReceiver__WEBPACK_IMPORTED_MODULE_7__;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ })

/******/ })));