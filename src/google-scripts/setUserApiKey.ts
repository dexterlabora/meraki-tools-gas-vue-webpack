export function setUserApiKey(apiKey) {
    try {
    // Set a property in each of the three property stores.
    const scriptProperties = PropertiesService.getScriptProperties();
    const userProperties = PropertiesService.getUserProperties();
    const documentProperties = PropertiesService.getDocumentProperties();
  
    Logger.log("Script props %s", JSON.stringify(scriptProperties.getProperties()))
    Logger.log("User props %s", JSON.stringify(userProperties.getProperties()))
    Logger.log("Document props %s", JSON.stringify(documentProperties.getProperties()))
    // scriptProperties.setProperty('SERVER_URL', 'http://www.example.com/');
    userProperties.setProperty('MERAKI_API_KEY', apiKey);
    Logger.log("User apiKey %s", JSON.stringify(userProperties.getProperties()))
    // documentProperties.setProperty('SOURCE_DATA_ID',
    //     '1j3GgabZvXUF177W0Zs_2v--H6SPCQb4pmZ6HsTZYT5k');
  } catch (err) {
    // TODO (developer) - Handle exception
    Logger.log('Failed with error %s', err.message);
  }
  }
  