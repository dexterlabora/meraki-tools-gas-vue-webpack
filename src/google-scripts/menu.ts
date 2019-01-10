export function loadMenu() {
  // Main Menu
  var ui = SpreadsheetApp.getUi();
  var mainMenu = ui.createMenu("Meraki-Tools");

  mainMenu.addItem("Main Menu", "loadSidebar");

  mainMenu.addToUi();
}
