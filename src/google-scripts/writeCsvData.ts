export function writeCsvData(csvContent) {
  /*
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheet = ss.getActiveSheet();
*/
  // Display Data

  var csvData = Utilities.parseCsv(csvContent);

  var sheet = SpreadsheetApp.getActiveSheet();
  sheet
    .getRange(
      sheet.getActiveCell().getLastRow(),
      sheet.getActiveCell().getColumn(),
      csvData.length,
      csvData[0].length
    )
    .setValues(csvData);
}
