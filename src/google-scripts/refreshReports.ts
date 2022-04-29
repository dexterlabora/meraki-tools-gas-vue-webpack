

export function refreshReports(){

    var TIMESTAMP = new Date().toTimeString();
    var SHEET_NAME = "_meraki_tools"
    var TIMESTAMP_SHEET_CELL_LABEL = "A1";
    var TIMESTAMP_SHEET_CELL = "B1";
    

// *************************
// Initialize Settings Sheet and Environment Variables
    // find or create settings sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss.getSheetByName(SHEET_NAME) == null){
      ss.insertSheet(SHEET_NAME); 
      // ss.getRange(API_KEY_SHEET_CELL_LABEL).setValue('API KEY:');
      // ss.getRange(ORG_ID_SHEET_CELL_LABEL).setValue('Org ID:');
      // ss.getRange(NET_ID_SHEET_CELL_LABEL).setValue('Net ID:');
      // ss.getRange(API_KEY_SHEET_CELL).setValue('YourAPIKey');
      // ss.getRange(ORG_ID_SHEET_CELL).setValue('YourOrgId');
      // ss.getRange(NET_ID_SHEET_CELL).setValue('YourNetId (optional)');
      ss.getRange(TIMESTAMP_SHEET_CELL_LABEL).setValue('Last run timestamp:');
      ss.getRange(TIMESTAMP_SHEET_CELL).setValue(TIMESTAMP);
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME).hideSheet()
    }
    var settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    settingsSheet.getRange(TIMESTAMP_SHEET_CELL).setValue(TIMESTAMP)


    
  // re-evaluates all functions
  SpreadsheetApp.flush();
  return
}