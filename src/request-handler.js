import axios from "axios";
import store from "./store";
const API_KEY = store.state.apiKey;
const API_URL = store.state.apiUrl;
export function request(requestOptions, count, extraData, location) {
  console.log("requestOptions", requestOptions);
  //**
  // Run Report based on environment
  //**
  // Google Apps Script

  //requestOptions.method = requestOptions.method ? requestOptions.method : "get";
  requestOptions.headers = { "X-Cisco-Meraki-API-Key": API_KEY };
  requestOptions.contentType = "application/json";
  requestOptions.followRedirects = true;
  requestOptions.url = `${API_URL}/${requestOptions.url}`;

  if (process.env.VUE_APP_SERVICE === "gas") {
    return gasRequest(requestOptions);
    //const url = `${this.apiUrl}/${requestOptions.url}`;

    // const options = {
    //   method: "get",
    //   headers: { "X-Cisco-Meraki-API-Key": API_KEY },
    //   contentType: "application/json",
    //   followRedirects: true
    // };
    // const { promisify } = require("util");
    // return promisify(
    //   google.script.run
    //     .withSuccessHandler(res => {
    //       let data;
    //       console.log("runAction gasRequest .fetch res: ", res);
    //       try {
    //         data = JSON.parse(res.body);
    //       } catch (error) {
    //         console.log("unable to parse body, returning default body");
    //         data = res.body;
    //       }
    //       //return this.handleResponse(data, extraData, location);
    //       return data;
    //     })
    //     .withFailureHandler(error => {
    //       console.log("GAS via OAS error: ", error);
    //       return error;
    //       //return this.handleError(error, "onRunReport", action);
    //     })
    //     .fetch(requestOptions.url, requestOptions)
    // );

    // return google.script.run
    //   .withSuccessHandler(res => {
    //     let data;
    //     console.log("runAction gasRequest .fetch res: ", res);
    //     try {
    //       data = JSON.parse(res.body);
    //     } catch (error) {
    //       console.log("unable to parse body, returning default body");
    //       data = res.body;
    //     }
    //     //return this.handleResponse(data, extraData, location);
    //     return data;
    //   })
    //   .withFailureHandler(error => {
    //     console.log("GAS via OAS error: ", error);
    //     return error;
    //     //return this.handleError(error, "onRunReport", action);
    //   })
    //   .fetch(requestOptions.url, requestOptions);
  } else {
    // AXIOS
    // const options = {
    //   method: "get",
    //   //baseURL: "api/" + this.apiUrl,
    //   url: action,
    //   headers: {
    //     "X-Cisco-Meraki-API-Key": API_KEY
    //   }
    // };
    return (
      axios(requestOptions)
        //.then(res => this.handleResponse(res.data, extraData, location))
        //.then(res => res.data)
        .then(res => res.data)
        .catch(e => {
          console.log("request-handler error: ", e);
          //this.handleError(e, "onRunReport", action);
        })
    );
  }
}

function gasRequest(options) {
  return new Promise(function(resolve, reject) {
    google.script.run
      .withSuccessHandler(res => {
        let data;
        console.log("runAction gasRequest .fetch res: ", res);
        try {
          data = JSON.parse(res.body);
        } catch (error) {
          console.log("unable to parse body, returning default body");
          data = res.body;
        }
        //return this.handleResponse(data, extraData, location);
        //return data;
        resolve(data);
      })
      .withFailureHandler(error => {
        console.log("GAS via OAS error: ", error);
        //return error;
        reject(error);
        //return this.handleError(error, "onRunReport", action);
      })
      .fetch(options.url, options);
  });
}

// export function handleError(error, errorTitle, action) {
//   console.log("handleError error: ", error);
//   this.$store.commit("setLoading", false);
//   console.log(errorTitle);
//   if (error.errorCode === 400) {
//     console.log("Bad request, often due to missing a required parameter.");
//     this.$store.commit("setSnackbar", {
//       msg: "Bad request, often due to missing a required parameter.",
//       color: "danger"
//     });
//   } else if (error.errorCode === 401) {
//     console.log("No valid API key provided.");
//     this.$store.commit("setSnackbar", {
//       msg: "No valid API key provided.",
//       color: "danger"
//     });
//   } else if (error.errorCode >= 500 && error.errorCode < 600) {
//     console.log("Server error");
//     this.$store.commit("setSnackbar", {
//       msg: "Server error or invalid parameters",
//       color: "danger"
//     });
//   } else if (error.errorCode === 404) {
//     console.log(
//       "The requested resource doesn't exist or you do not have permission"
//     );
//     this.$store.commit("setSnackbar", {
//       msg: "The requested resource doesn't exist or you do not have permission",
//       color: "danger"
//     });
//   } else {
//     console.log("Welp, that's not good: ", action);
//     this.$store.commit("setSnackbar", {
//       msg: error.Error ? error.Error : error,
//       color: "danger"
//     });
//   }
//   return;
// }
