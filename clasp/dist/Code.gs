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
function fetch() {
}
function onOpen() {
}
function onInstall() {
}
function loadSidebar() {
}
function writeCsvData() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 673);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

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

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadMenu; });
function loadMenu() {
    // Main Menu
    var ui = SpreadsheetApp.getUi();
    var mainMenu = ui.createMenu("Meraki-Tools");
    mainMenu.addItem("Main Menu", "loadSidebar");
    mainMenu.addToUi();
}


/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return doGet; });
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

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetch; });
/*
export function urlFetchApp(path, options) {
  Logger.log("fetch");
  let urlFetch = UrlFetchApp.fetch(path, options);
  let data = urlFetch.getContentText();
  Logger.log("fetch data" + data);
  return data;
}
*/
function fetch(path, options) {
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
        return e;
    }
}


/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadSidebar; });
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

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return writeCsvData; });
// Display Data on a Google Sheet
var sheet = function () {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
};
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

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _do_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(669);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(670);
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(671);
/* harmony import */ var _writeCsvData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(672);
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(665);





function onOpen() {
    //loadSidebar(); //permissions issue
    Object(_menu__WEBPACK_IMPORTED_MODULE_4__[/* loadMenu */ "a"])();
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
global.loadMenu = _menu__WEBPACK_IMPORTED_MODULE_4__[/* loadMenu */ "a"];
global.doGet = _do_get__WEBPACK_IMPORTED_MODULE_0__[/* doGet */ "a"];
global.fetch = _fetch__WEBPACK_IMPORTED_MODULE_1__[/* fetch */ "a"];
global.onOpen = onOpen;
global.onInstall = onInstall;
global.loadSidebar = _sidebar__WEBPACK_IMPORTED_MODULE_2__[/* loadSidebar */ "a"];
global.writeCsvData = _writeCsvData__WEBPACK_IMPORTED_MODULE_3__[/* writeCsvData */ "a"];

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ })

/******/ })));