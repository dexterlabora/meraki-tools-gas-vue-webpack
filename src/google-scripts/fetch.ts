
/**
 * Fetch an API request
 *
 * @param {path} URL API path .
 * @param {options} request options.
 * @return JSON data
 * @customfunction
 */
export function fetch(path, options={}) {
  options = {...{followRedirects:true}, ...options}
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
    Logger.log("meraki tools fetch error: " + e);
    return e;
  }
}
