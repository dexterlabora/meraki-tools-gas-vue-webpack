export function loadSidebar() {
  var htmlTemplate = HtmlService.createTemplateFromFile("index");

  var html = htmlTemplate.evaluate().setTitle("Meraki Tools");
  //SpreadsheetApp.getUi().showSidebar(html); causes permissions issues

  var ui = function() {
    return SpreadsheetApp.getUi();
  };

  ui().showSidebar(html);
}
