import axios from "axios";
import store from "./store";
const API_KEY = store.state.apiKey;
const API_URL = store.state.apiUrl;

export function request(requestOptions, count, extraData, location) {
  // console.log("requestOptions", requestOptions);
  //**
  // Run Report based on environment
  //**
  // Google Apps Script

  //requestOptions.method = requestOptions.method ? requestOptions.method : "get";
  requestOptions.headers = {
    "X-Cisco-Meraki-API-Key": requestOptions.apiKey || API_KEY
  };
  requestOptions.contentType = "application/json";
  requestOptions.followRedirects = true;

  if (process.env.VUE_APP_SERVICE === "gas") {
    // ** Google Apps Script (GAS) **
    requestOptions.baseURL = "https://api-mp.meraki.com/api/v1" // hard coded for testing
    requestOptions.url = `${requestOptions.baseURL}/${requestOptions.url}`;
    // console.log("gas requestOptions.url ", requestOptions.url);
    requestOptions.payload = JSON.stringify(requestOptions.data);
    console.log("gas: requestOptions", requestOptions);
    return gasRequest(requestOptions);
  } else {
    // ** AXIOS **
    requestOptions.baseURL = "http://localhost:8080/api"; // hard coded for local dev testing
    //console.log("axios: requestOptions", requestOptions);
    return axios(requestOptions)
      .then(res => {
        //console.log("axios res", res);
        return res.data;
      })
      .catch(e => {
        console.log("request-handler error: ", e);
        return e.response.data
      });
  }
}

function gasRequest(options) {
  return new Promise(function(resolve, reject) {
    google.script.run
      .withSuccessHandler(res => {
        let data;
        //console.log("runAction gasRequest .fetch res: ", res);
        try {
          //console.log("gasRequest res", res);
          data = JSON.parse(res.body);
        } catch (error) {
          console.log("unable to parse body, returning default body");
          reject(error);
        }
        resolve(data);
      })
      .withFailureHandler(error => {
        console.log("GAS via OAS error: ", error);
        reject(error);
      })
      .fetch(options.url, options);
  });
}
