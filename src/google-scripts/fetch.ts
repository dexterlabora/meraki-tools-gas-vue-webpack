/*
export function urlFetchApp(path, options) {
  Logger.log("fetch");
  let urlFetch = UrlFetchApp.fetch(path, options);
  let data = urlFetch.getContentText();
  Logger.log("fetch data" + data);
  return data;
}
*/
export function fetch(path, options) {
  options["muteHttpExceptions"] = true; // passes error on to client for processing / display

  try {
    let res = UrlFetchApp.fetch(path, options);
    let responseCode = res.getResponseCode();
    let responseBody = res.getContentText();

    return {
      body: responseBody,
      headers: res.getHeaders(),
      statusCode: responseCode
    };
  } catch (e) {
    return e;
  }
}
