export function writeCsvData(csvContent) {
  // Display Data

  var csvData;
  if (!csvContent) {
    csvData = "no data";
  } else {
    try {
      csvData = Utilities.parseCsv(csvContent);
    } catch (error) {
      Logger.log("writeCsvData error: " + error);
    }
  }

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
