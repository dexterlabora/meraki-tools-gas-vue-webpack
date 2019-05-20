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
  options["followRedirects"] = true;
  Logger.log("fetch path: " + path);
  Logger.log("fetch options" + options);
  let res = UrlFetchApp.fetch(path, options);
  return {
    body: res.getContentText(),
    headers: res.getHeaders(),
    statusCode: res.getResponseCode()
  };
  //Logger.log("fetch res" + JSON.stringify(response));
  //return response;
}
