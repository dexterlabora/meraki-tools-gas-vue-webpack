export default function gasRequest(options) {
    return new Promise(function(resolve, reject) {
      google.script.run
        .withSuccessHandler(res => {
         // let data;
          //console.log("runAction gasRequest .fetch res: ", res);
          try {
            console.log("gasRequest res", res);
            res.data = JSON.parse(res.body); //emulate axios
            //data = JSON.parse(res);
          } catch (error) {
            console.log("unable to parse body, returning default body");
            reject(error);
          }
          resolve(res);
        })
        .withFailureHandler(error => {
          console.log("GAS via OAS error: ", error);
          reject(error);
        })
        .fetch(options.url, options);
    });
  }