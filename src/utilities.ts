import json2csv from "json2csv";

export function writeData(json, google) {
  const csv = json2csv.parse(json);
  google.script.run.writeCsvData(csv);
}
