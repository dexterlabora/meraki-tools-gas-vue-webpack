import * as utilities from "./utilities"
/*
Copy this function over the existing Code.gs file in a Google Sheet
Save the Sheet/Script
Publish App 
- Execute as You
- Avaiable to Anyone (including anonymous)
Authorize App when prompted
The URL will act as the Webhook URL for Meraki to send alerts
*/

// Flattens a nested object for easier use with a spreadsheet // MOVED TO utilities.ts
// function flattenObject(ob) {
//     var toReturn = {};	
//      for (var i in ob) {
//          if (!ob.hasOwnProperty(i)) continue;		
//          if ((typeof ob[i]) == 'object') {
//              var flatObject = flattenObject(ob[i]);
//              for (var x in flatObject) {
//                  if (!flatObject.hasOwnProperty(x)) continue;				
//                  toReturn[i + '.' + x] = flatObject[x];
//              }
//          } else {
//              toReturn[i] = ob[i];
//          }
//      }
//      return toReturn;
//  };
 
 // formats a key/value to UTC time based on selected keys
 function changeTimeFormat(key,value){
   var keysToFormat = ['sentAt', 'occurredAt','alertData.timestamp'];
   if(keysToFormat.indexOf(key) > -1){
         var date = new Date(value*1000).toUTCString();
         return date 
   }else{
     return value;
   }
 }
 
 // Google sheets are created with 26 columns, but some alerts contain more than 26 keys 
 // As each key is inserted into its own column, having more keys than columns causes an out of bounds error 
 // This functions add the appropirate amount of extra columns if required
 function addExtraColumns(alertSheet, keylength) { 
   var sheet_column_count = alertSheet.getMaxColumns() 
   var extra_columns_required = keylength - sheet_column_count 
   if (extra_columns_required > 0) { 
     alertSheet.insertColumns(1, extra_columns_required) 
   } 
 } 
 
 function setHeaders(sheet, values){
    var headerRow = sheet.getRange(1, 1, 1, values.length)
     headerRow.setValues([values]);  
     headerRow.setFontWeight("bold").setHorizontalAlignment("center");
 }
 
 function display(data){
   
   // Flatten JSON object and extract keys and values into seperate arrays
   var flat = utilities.flattenObject(data);
   var keys = Object.keys(flat);
   var values = [];
   var headers = [];
   var alertSheet;
   
   // Find or create sheet for alert type and set headers
   var alertType = data['alertType'];
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   if (ss.getSheetByName(alertType) == null){
     ss.insertSheet(alertType); 
     // Create Headers and Format
     alertSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(alertType);
     addExtraColumns(alertSheet, keys.length)
     alertSheet.setColumnWidths(1, keys.length, 200)
     headers = keys;
   }else {
     alertSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(alertType);
     // retrieve existing headers
     headers = alertSheet.getRange(1, 1, 1, alertSheet.getLastColumn() || 1).getValues()[0]; 
     //headers = [headers];
     Logger.log('existing headers: ' + headers);
     Logger.log('keys: '+ keys);
     // add any additional headers
     var newHeaders = [];
     newHeaders = keys.filter(function(k){ return headers.indexOf(k)>-1?false:k;});
     Logger.log('adding new headers: ' + newHeaders);
     newHeaders.forEach(function(h){
       headers.push(h);
     });  
   }
   Logger.log('headers: ' + headers);
   setHeaders(alertSheet, headers);
   
   // push values based on headers
   headers.forEach(function(h){
     Logger.log('h: '+h);
     Logger.log('flat[h]: '+flat[h]);
     //var formattedValue = changeTimeFormat(h,flat[h]);
     //Logger.log('formattedValue: '+formattedValue);
     //values.push(formattedValue);
     values.push(flat[h]);
   });
   
   // Insert Data into Sheet
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(alertType);
   var lastRow = Math.max(sheet.getLastRow(),1);
   sheet.insertRowAfter(lastRow); 
   sheet.getRange(lastRow + 1, 1, 1, headers.length).setValues([values]).setFontWeight("normal").setHorizontalAlignment("center");
  
 }
 
 // Webhook GET request. Simply verifies that server is reachable.
 export function doGet(e) {
   return HtmlService.createHtmlOutput("Meraki Webhook Google Sheets");
 }
 
 // Webhook Receiver - triggered with post to pusblished App URL.
 export function doPost(e) {
   var params = JSON.stringify(e.postData.contents);
   params = JSON.parse(params);
   var postData = JSON.parse(params);
   
   display(postData);
   
   // HTTP Response
   return HtmlService.createHtmlOutput("post request received");
 }
 
 var testData = {
     "alertData": {
       "timestamp": 1536127239.706,
       "roi": { "top": 0, "left": 0, "width": 60, "height": 33 }
     },
     "alertId": "643451796765275003",
     "alertType": "Motion detected",
     "occurredAt": 1536127340.8236248,
     "sentAt": 1536127344.593023,
     "organizationId": "306XXXXX",
     "organizationName": "Miles Laboratory",
     "organizationUrl": "https://n143.meraki.com/o/3ZZIub/manage/organization/overview",
     "networkId": "L_643451796760XXXXX",
     "networkName": "Miles- Home",
     "networkUrl": "https://n143.meraki.com/Miles-Ho/n/RSv2xapc/manage/nodes/list",
     "deviceSerial": "Q2GV-ZZZZ-XXXX",
     "deviceMac": "34:56:fe:a3:24:06",
     "deviceName": "MV12w-desk-06",
     "deviceUrl": "https://n143.meraki.com/Miles-Ho/n/RSv2xapc/manage/nodes/new_list/57548243936262",
     "testParam2":"bar"
   };
 
 function test(){ 
   display(testData);
 }