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
 * Fetches data from the Meraki API and formats the JSON into Google Sheet format
 * @param {string} url URL to pull json data from (i.e https://api.meraki.com/api/v1/organizations or /organizations)
 * @param {string} apiKey API key for authorization
 * @return Google Sheet data
 * @customfunction
 */
function merakiFetchReport(url, apiKey) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 695);
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

/***/ 180:
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

/***/ 684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadMenu", function() { return loadMenu; });
function loadMenu() {
    // Main Menu
    var ui = SpreadsheetApp.getUi();
    var mainMenu = ui.createMenu("Meraki-Tools");
    mainMenu.addItem("Main Menu", "loadSidebar");
    mainMenu.addToUi();
}


/***/ }),

/***/ 688:
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

/***/ 689:
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

/***/ 690:
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

/***/ 691:
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
    if (!csvContent) {
        Logger.log("writeCsvData no csvContent");
        return;
    }
    Logger.log("csvContent", csvContent.toString());
    try {
        var csvData = [""];
        // fix the bug on Utilities.parseCsv() google script function which does not allow newlines in csv strings @simonjamain
        csvContent = csvContent.replace(/(["'])(?:(?=(\\?))\2[\s\S])*?\1/g, function (e) {
            return e.replace(/\r?\n|\r/g, " ");
        });
        csvContent = title + "\n" + csvContent;
        csvData = Utilities.parseCsv(csvContent);
        Logger.log("parsed csvData.toString() ", csvData.toString());
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
            default:
                toActiveCellOverwrite(csvData);
        }
        // Insert new rows
        // TO DO
    }
    catch (error) {
        Logger.log("writeCsvData error: " + error);
    }
}
function toNewRows(csvData) {
    //const sheet = SpreadsheetApp.getActiveSheet();
    sheet().insertRows(sheet()
        .getActiveCell()
        .getLastRow(), csvData.length);
    sheet()
        .getRange(sheet()
        .getActiveCell()
        .getLastRow(), sheet()
        .getActiveCell()
        .getColumn(), csvData.length, csvData[0].length)
        .setValues(csvData);
}
function toActiveCellOverwrite(csvData) {
    //const sheet = SpreadsheetApp.getActiveSheet();
    sheet()
        .getRange(sheet()
        .getActiveCell()
        .getLastRow(), sheet()
        .getActiveCell()
        .getColumn(), csvData.length, csvData[0].length)
        .setValues(csvData);
}
//to use still
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
    newSheet
        .getRange(sheet.getActiveCell().getLastRow(), sheet.getActiveCell().getColumn(), csvData.length, csvData[0].length)
        .setValues(csvData);
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
    var datetime = currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
    return datetime;
}


/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merakiFetchReport", function() { return merakiFetchReport; });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(180);
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
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

// Global Functions
/**
 * Fetches Meraki API data and formats the JSON data into Google Sheet format
 * @param url url to pull json data from
 * @param apiKey API key for authorization
 * @return Google Sheet data
 * @customfunction
 */
function merakiFetchReport(url, apiKey) {
    return __awaiter(this, void 0, void 0, function () {
        var baseUrl, options, res, result, data, keys, results, csvData, arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
                    return [4 /*yield*/, fetch(url, options)];
                case 1:
                    res = _a.sent();
                    result = [];
                    try {
                        result = JSON.parse(res["body"]);
                    }
                    catch (e) {
                        result = e;
                    }
                    data = [];
                    keys = [];
                    results = [];
                    // find keys
                    if (Array.isArray(result)) {
                        results = __spreadArrays([], result);
                    }
                    else {
                        results.push(result);
                    }
                    results.forEach(function (obj) {
                        var flat = {};
                        flat = _utilities__WEBPACK_IMPORTED_MODULE_0__["flattenObject"](obj) || {};
                        data.push(flat);
                        // set keys
                        Object.keys(flat).forEach(function (value) {
                            if (keys.indexOf(value) == -1)
                                keys.push(value);
                        });
                    });
                    return [4 /*yield*/, _utilities__WEBPACK_IMPORTED_MODULE_0__["parseJsonToCsv"](data, keys).toString()];
                case 2:
                    csvData = _a.sent();
                    Logger.log("csvData results: %s", csvData);
                    return [4 /*yield*/, Utilities.parseCsv(csvData)];
                case 3:
                    arr = _a.sent();
                    Logger.log(" csvToArray arr : %s", arr);
                    return [2 /*return*/, arr];
            }
        });
    });
}


/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doGet", function() { return doGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doPost", function() { return doPost; });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(180);

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
    return "Hello " + name + "!";
}


/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _do_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(688);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(690);
/* harmony import */ var _writeCsvData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(691);
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(684);
/* harmony import */ var _merakiFetchReport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(692);
/* harmony import */ var _merakiWebhookReceiver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(693);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(180);
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(694);









function onOpen() {
    //loadSidebar(); //permissions issue
    Object(_menu__WEBPACK_IMPORTED_MODULE_4__["loadMenu"])();
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
global.loadMenu = _menu__WEBPACK_IMPORTED_MODULE_4__["loadMenu"];
global.doGet = _do_get__WEBPACK_IMPORTED_MODULE_0__["doGet"];
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
global.writeCsvData = _writeCsvData__WEBPACK_IMPORTED_MODULE_3__["writeCsvData"];
/**
 * Hello !
 *
 * @param {name} URL API path .
 * @return response string
 * @customfunction
 */
global.hello = _hello__WEBPACK_IMPORTED_MODULE_8__["hello"];
global.utilities = _utilities__WEBPACK_IMPORTED_MODULE_7__;
/**
 * Fetches data from the Meraki API and formats the JSON into Google Sheet format
 * @param {string} url URL to pull json data from (i.e https://api.meraki.com/api/v1/organizations or /organizations)
 * @param {string} apiKey API key for authorization
 * @return Google Sheet data
 * @customfunction
 */
global.merakiFetchReport = function (url, apiKey) { return Object(_merakiFetchReport__WEBPACK_IMPORTED_MODULE_5__["merakiFetchReport"])(url, apiKey); };
global.merakiWebhookReceiver = _merakiWebhookReceiver__WEBPACK_IMPORTED_MODULE_6__;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ })

/******/ })));