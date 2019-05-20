// Display Data on a Google Sheet
export function writeCsvData(csvContent) {
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
    let sheet = SpreadsheetApp.getActiveSheet();
    Logger.log("csvData.toString() ", csvData.toString());
    sheet
      .getRange(
        sheet.getActiveCell().getLastRow(),
        sheet.getActiveCell().getColumn(),
        csvData.length,
        csvData[0].length
      )
      .setValues(csvData);
  } catch (error) {
    Logger.log("writeCsvData error: " + error);
  }
}
