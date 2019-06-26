// Display Data on a Google Sheet
var sheet = function() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
};

export function writeCsvData(csvContent, location: string) {
  if (!csvContent) {
    return;
  }

  try {
    let csvData: any[] = [""];
    // fix the bug on Utilities.parseCsv() google script function which does not allow newlines in csv strings @simonjamain
    csvContent = csvContent.replace(
      /(["'])(?:(?=(\\?))\2[\s\S])*?\1/g,
      function(e) {
        return e.replace(/\r?\n|\r/g, " ");
      }
    );
    csvData = Utilities.parseCsv(csvContent);

    Logger.log("csvData.toString() ", csvData.toString());

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
  } catch (error) {
    Logger.log("writeCsvData error: " + error);
  }
}
function toNewRows(csvData) {
  //const sheet = SpreadsheetApp.getActiveSheet();
  sheet().insertRows(
    sheet()
      .getActiveCell()
      .getLastRow(),
    csvData.length
  );
  sheet()
    .getRange(
      sheet()
        .getActiveCell()
        .getLastRow(),
      sheet()
        .getActiveCell()
        .getColumn(),
      csvData.length,
      csvData[0].length
    )
    .setValues(csvData);
}

function toActiveCellOverwrite(csvData) {
  //const sheet = SpreadsheetApp.getActiveSheet();
  sheet()
    .getRange(
      sheet()
        .getActiveCell()
        .getLastRow(),
      sheet()
        .getActiveCell()
        .getColumn(),
      csvData.length,
      csvData[0].length
    )
    .setValues(csvData);
}
//to use still
var spreadsheet = function() {
  return SpreadsheetApp.getActiveSpreadsheet();
};
function toNewSheet(csvData) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const datetime = getDateTimeString();
  const title = csvData.toString().split(",")[0] + " : " + datetime;
  Logger.log("creating sheet with title ", title);
  sheet.insertSheet(title);
  const newSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(title);
  newSheet
    .getRange(
      sheet.getActiveCell().getLastRow(),
      sheet.getActiveCell().getColumn(),
      csvData.length,
      csvData[0].length
    )
    .setValues(csvData);
}

function toActiveCellNewRows() {
  const sheet = SpreadsheetApp.getActiveSheet();
  var lRow = sheet.getLastRow();
  var lCol = sheet.getLastColumn(),
    range = sheet.getRange(lRow, 1, 1, lCol);
  sheet.insertRowsAfter(lRow, 1);
  range.copyTo(sheet.getRange(lRow + 1, 1, 1, lCol), { contentsOnly: false });
}

function getDateTimeString() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
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
