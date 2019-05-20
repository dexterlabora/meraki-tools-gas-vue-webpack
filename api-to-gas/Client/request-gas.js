// CUSTOM REQUEST HANDLER FOR GOOGLE APPS - BY CORY

const HttpResponse = require("../Response/HttpResponse");

const JSONbig = require("json-bigint")({ storeAsString: true });

/*
const convertHttpResponse = function convertHttpResponse(resp) {
  const response = new HttpResponse();
  if (resp) {
    response.body = resp;
    response.headers = resp.headers; //this is not right
    response.statusCode = 200; // hard coded status code. could be better ...
  }
  return response;
};
*/

const convertHttpResponse = function convertHttpResponse(resp) {
  console.log("convertHttpResponse, resp", resp);
  const response = new HttpResponse();

  // ADDED BY CORY -- To fix incorrect organizationId type (should be a string, but being sent as number, which then is parsed incorrectly by JS)
  if (resp) {
    //response.body = resp.body;
    //if (resp.body) {
    try {
      response.body = JSON.stringify(JSONbig.parse(resp.body)); // WORKS!
    } catch (error) {
      console.log("unable to parse body, returning default body");
      response.body = resp.body;
    }
    //}

    response.headers = resp.headers;
    response.statusCode = resp.statusCode;
    //response.data = response.body; // added to match previous request library
  }
  console.log("convertHttpResponse, response (after JSONBig)", response);
  return response;
};

const gasRequest = function gasRequest(req, callback) {
  console.log("gasRequest  options", req);
  let params = {
    payload: req.body,
    method: req.method,
    headers: req.headers,
    contentType: req.contentType,
    followRedirects: true
  };
  google.script.run
    .withSuccessHandler(res => {
      console.log("gasRequest  .fetch res: ", res);

      return callback(null, convertHttpResponse(res));
      /*
      try {
        //const parsed = regexbig(response);
        //const parsed = JSONbig.parse(JSON.stringify(response));
        //const parsed = JSONbig.parse(response);
        //console.log("gasRequest  .fetch parsed: ", parsed);
        return callback(null, convertHttpResponse(parsed));
      } catch (e) {
        return callback(null, convertHttpResponse(response));
      }
      */
    })
    .withFailureHandler(error => {
      console.log("GAS error: ", error);
      return callback(error);
    })
    .fetch(req.url, params);
};

module.exports = gasRequest;
