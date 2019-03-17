// CUSTOM REQUEST HANDLER FOR GOOGLE APPS - BY CORY

const HttpResponse = require("../Response/HttpResponse");

var JSONbig = require("json-bigint");

// regex all
function regexall(input) {
  return JSON.parse(input.replace(/([0-9]{1,}\.{0,1}[0-9]{0,})/g, '"$1"'));
}

// regex big
function regexbig(input) {
  return JSON.parse(input.replace(/:([0-9]{15,}),/g, ':"$1",'));
}

const convertHttpResponse = function convertHttpResponse(resp) {
  const response = new HttpResponse();
  if (resp) {
    response.body = resp;
    response.headers = resp.headers;
    response.statusCode = 200; // hard coded status code. could be better ...
  }
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
    .withSuccessHandler(response => {
      console.log("gasRequest  .fetch res: ", response);
      try {
        const parsed = regexbig(response);
        return callback(null, convertHttpResponse(parsed));
      } catch (e) {
        return callback(null, convertHttpResponse(response));
      }
    })
    .withFailureHandler(error => {
      console.log("GAS error: ", error);
      return callback(error);
    })
    .fetch(req.url, params);
};

module.exports = gasRequest;
