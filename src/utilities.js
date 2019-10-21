import * as flatten from "flat";
import * as json2csv from "json2csv";

export function saveFile(data, title) {
  data = data || [];
  data = JSON.stringify(data);
  const blob = new Blob([data], { type: "text/plain" });
  const e = document.createEvent("MouseEvents"),
    a = document.createElement("a");
  a.download = `meraki-report ${title}.json`;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}

const isArray = function(a) {
  return !!a && a.constructor === Array;
};

const isObject = function(a) {
  //return typeof a == "object";
  return !!a && a.constructor === Object;
};

function flattenObject(obj) {
  var toReturn = {};

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (typeof obj[i] == "object") {
      var flatObject = flattenObject(obj[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = obj[i];
    }
  }
  return toReturn;
}

function formatReport(json) {
  let data = [];
  let fields = [];

  // Flatten Data and Extract Header Fields

  // For Arrays
  //if (isArray(json)) {
  try {
    if (Array.isArray(json)) {
      //console.log("formatReport json isArray");
      json.forEach(function(obj) {
        //var flat = flattenObject(obj);
        var flat = flatten.flatten(obj);
        data.push(flat);

        // set keys
        Object.keys(flat).forEach(function(value) {
          if (fields.indexOf(value) == -1) fields.push(value);
        });
      });
    } else {
      //console.log("formatReport json isObject");
      //var flat = flattenObject(json);
      var flat = flatten.flatten(obj);
      data.push(flat);

      // set keys
      Object.keys(flat).forEach(function(value) {
        if (fields.indexOf(value) == -1) fields.push(value);
      });
    }

    // For Objects
    if (isObject(json)) {
      //console.log("formatReport json isObject");
      //var flat = flattenObject(json);
      var flat = flatten.flatten(json);
      data.push(flat);

      // set keys
      Object.keys(flat).forEach(function(value) {
        if (fields.indexOf(value) == -1) fields.push(value);
      });
    }
  } catch (error) {
    console.log("formatReport error ", error);
  }

  // Send Report
  const report = {
    data,
    fields
  };
  //console.log("formatReport report", report);
  return report;
}

/**
 * Writes report data to the Google Sheet
 * @param {*} json array of report data
 * @param {} options 
 * options = {
      defaultValue: "undefined",
      //flatten: true,
      eol: "\r\n", // TESTING
      noHeaders: noHeaders,
      includeEmptyRows: true,
      fields: headers ? headers : report.fields
    };
 */
export function writeData(json, title, options = {}, location) {
  //if (typeof google !== "undefined") {
  //console.log("writeData options, json", options, json);
  let jsonArray = [];
  if (!Array.isArray(json)) {
    // wrap in array to print to sheet
    jsonArray[0] = json;
  } else {
    jsonArray = json;
  }

  try {
    const report = formatReport(jsonArray);

    const defaultOptions = {
      defaultValue: "undefined",
      //flatten: true,
      eol: "\r\n", // TESTING
      //unwind: true,
      header: true,
      includeEmptyRows: true,
      fields: options.headers ? options.headers : report.fields
    };
    options = { ...defaultOptions, ...options };
    //console.log("writeData final options ", options);
    if (report.data) {
      let csv = json2csv.parse(report.data, options);
      //csv = title + "\n" + csv;

      // Send CSV to Google Sheet via GAS function
      if (typeof google !== "undefined") {
        google.script.run.writeCsvData(csv, title, location);
      }
    }
  } catch (err) {
    console.error(err);
  }
  //}
}
