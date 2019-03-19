import * as papa from "papaparse";
import * as flatten from "flat";
import * as json2csv from "json2csv";

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
  if (Array.isArray(json)) {
    console.log("formatReport json isArray");
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
    console.log("formatReport json isObject");
    var flat = flattenObject(json);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (fields.indexOf(value) == -1) fields.push(value);
    });
  }

  /*
  // For Objects
  if (isObject(json)) {
    console.log("formatReport json isObject");
    var flat = flattenObject(json);
    data.push(flat);

    // set keys
    Object.keys(flat).forEach(function(value) {
      if (fields.indexOf(value) == -1) fields.push(value);
    });
  }
*/
  // Send Report
  const report = {
    data,
    fields
  };
  console.log("formatReport report", report);
  return report;
}

/* papa Working.. mostly, having issue with BigNumber
export function writeData(json, google) {
  console.log("writeData json", json);
  try {
    const report = formatReport(json);
    const config = {
      quotes: false, //or array of booleans
      quoteChar: '"',
      escapeChar: '"',
      delimiter: ",",
      header: true,
      newline: "\r\n",
      skipEmptyLines: false, //or 'greedy',
      columns: report.fields //or array of strings
    };

    const csv = papa.unparse(report.data, config);
    console.log("writeData csv ", csv);

    // Send CSV to Google Sheet via GAS function
    if (google) {
      google.script.run.writeCsvData(csv);
    }
  } catch (err) {
    console.error(err);
  }
}
*/

// json2csv issues with BigNumber too...
export function writeData(json, google) {
  console.log("writeData json", json);
  try {
    const report = formatReport(json);
    const options = {
      defaultValue: "undefined",
      //flatten: true,
      includeEmptyRows: true,
      fields: report.fields
    };
    const csv = json2csv.parse(report.data, options);
    console.log("writeData csv ", csv);

    // Send CSV to Google Sheet via GAS function
    if (google) {
      let data = csv || "no data";
      google.script.run.writeCsvData(csv);
    }
  } catch (err) {
    console.error(err);
  }
}