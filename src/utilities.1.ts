import * as json2csv from "json2csv";
import * as _ from "lodash";
//import * as json2csv from "json-2-csv";

const isArray = function(a) {
  return !!a && a.constructor === Array;
};

const isObject = function(a) {
  return !!a && a.constructor === Object;
};

export function writeData(json, google) {
  let data = json;
  let fields: any[] = [];

  if (isArray(json)) {
    console.log("writeData json isArray", json);
    data = json.forEach(j => {
      j = flattenObject2(j);

      // set keys
      Object.keys(j).forEach(k => {
        if (fields.indexOf(k) == -1) fields.push(k);
      });
      return j;
    });
  }

  if (isObject(json)) {
    console.log("writeData json object", json);
    data = flattenObject2(json);
    //data = _.flattenDepth(json, 2);
    Object.keys(json).forEach(k => {
      if (fields.indexOf(k) == -1) fields.push(k);
    });
  }
  console.log("writeData fields", fields);
  console.log("writeData data ", data);
  try {
    const options = {
      defaultValue: "undefined",
      //flatten: true,
      includeEmptyRows: true,
      fields
    };
    const csv = json2csv.parse(data, options);
    //const csv = data;
    console.log("writeData csv ", csv);
    if (google) {
      google.script.run.writeCsvData(csv);
    }
  } catch (err) {
    console.error(err);
  }
}

/*
export function writeData(json, google) {
  const csv = json2csv.parse(json);
  google.script.run.writeCsvData(csv);
}
*/

function flattenObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (isObject(ob[i])) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

function flattenObject2(obj) {
  let flattenKeys = {};
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == "object") {
      // flattenKeys[i] = obj[i];
      let flatObject = flattenObject(obj[i]);
      for (let j in flatObject) {
        if (!flatObject.hasOwnProperty(j)) continue;
        flattenKeys[i + "." + j] = flatObject[j];
      }
    } else {
      flattenKeys[i] = obj[i];
    }
  }
  return flattenKeys;
}
/*
export function writeData(json, google) {
  let data = json;
  if (Array.isArray(json)) {
    data = json.map(j => (j = flattenObject(j)));
  } else if (typeof json == "object") {
    data = flattenObject(json);
  } else {
    data = json; // string or error message
  }

  const options = {
    emptyFieldValue: "undefined",
    expandArrayObjects: true
  };
  const csv = json2csv
    .json2csv(data, options)
    .then(c => google.script.run.writeCsvData(c));
}
*/
