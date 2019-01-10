// Handles Meraki API requests. Has additional logic to follow the HTTP redirects properly and handle OrgID being converted to INTs

var request = require("request");
var JSONbig = require("json-bigint")({ storeAsString: true });

// Recursive function to follow Meraki API redirects
var requestMeraki = function(options, callback) {
  request(options, function(error, res, data) {
    //console.log('RESPONSE  [ ' + res.statusCode + ' ]');
    if (error) {
      return callback(error);
    } else {
      if (
        [301, 302, 307, 308].indexOf(res.statusCode) !== -1 &&
        res.headers.location
      ) {
        console.log("REDIRECT: (recursive function)");
        options.url = res.headers.location;
        return requestMeraki(options, function(err, res, data) {
          return callback(err, res, data);
        });
      } else {
        // parse the large integers properly if data exists
        try {
          var parsedData = JSONbig.parse(data);
          return callback(error, res, parsedData);
        } catch (e) {
          console.log("error: no data returned ", error);
        }
        //console.log("FINISHED")
        return callback(error, res, data);
      }
    }
  });
};

module.exports = requestMeraki;
