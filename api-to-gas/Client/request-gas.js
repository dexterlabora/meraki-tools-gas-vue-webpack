// CUSTOM REQUEST HANDLER FOR GOOGLE APPS - BY CORY

const gasRequest = function gasRequest(req, callback) {
  //console.log("gasRequest  options", req);
  let params = {
    payload: req.body,
    method: req.method,
    headers: req.headers,
    contentType: req.contentType,
    followRedirects: true
  };
  google.script.run
    .withSuccessHandler(res => {
      //console.log("gasRequest  .fetch res: ", res);
      return callback(null, res);
    })
    .withFailureHandler(error => {
      console.log("GAS error: ", error);
      return callback(error);
    })
    .fetch(req.url, params);
};

module.exports = gasRequest;
