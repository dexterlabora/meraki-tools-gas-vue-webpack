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
  return UrlFetchApp.fetch(path, options).getContentText();
}
