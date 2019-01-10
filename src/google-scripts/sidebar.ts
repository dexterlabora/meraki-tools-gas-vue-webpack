export function loadSidebar() {
  var htmlTemplate = HtmlService.createTemplateFromFile("index");
  var html = htmlTemplate.evaluate().setTitle("Meraki Tools");
  SpreadsheetApp.getUi().showSidebar(html);
}
