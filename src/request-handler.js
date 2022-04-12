import axios from "axios";
import store from "./store";
import gasRequest from "./gas-request"

export function request(requestOptions, count, extraData, previousResponse) {
  console.log("request_handler requestOptions, count, extraData, location", requestOptions, count, extraData, previousResponse)
  const API_KEY = store.state.apiKey;
  const API_URL = store.state.apiUrl;

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
    requestOptions.baseURL = "https://api.meraki.com/api/v1" // hard coded for testing
    requestOptions.url = `${requestOptions.baseURL}/${requestOptions.url}`;
    // console.log("gas requestOptions.url ", requestOptions.url);
    requestOptions.payload = JSON.stringify(requestOptions.data);
    // console.log("gas: requestOptions", requestOptions);
    return gasRequest(requestOptions)
      .then(res => {
        console.log("gas res", res);
        
        return followPagination(requestOptions, count, extraData, res)
      })
      .catch(e => {
        console.log("request-handler error: ", e);
        return e.response.data
      });
  } else {
    // ** AXIOS **
    requestOptions.baseURL = "api"; // hard coded for local dev testing
    console.log("axios: requestOptions", requestOptions);
    return axios(requestOptions)
      .then(res => {
        console.log("axios res", res);
        return followPagination(requestOptions, count, extraData, res)
      })
      .catch(e => {
        console.log("request-handler error: ", e);
        return e.response.data
      });
  }
}

function followPagination(requestOptions, pages, extraData, res) {
  const linkHeader = res.headers["link"] || res.headers["Link"]
  if (linkHeader && requestOptions.url.includes("perPage")) {

    console.log('pagination links: linkHeader', linkHeader)


    extraData = extraData || [];
   
    extraData = [...extraData, ...res.data]
    console.log('merge extraData', extraData)

    requestOptions.urls = linkHeader.match(/\<(.*?)\>/g)
    console.log('requestOptions.urls match', requestOptions.urls)
    requestOptions.urls = requestOptions.urls.map(u => u.replace("<", "").replace(">", "")) // remove < > tags

    console.log('requestOptions.urls ', requestOptions.urls)
    requestOptions.url = requestOptions.urls[1]
    if (!requestOptions.url || pages < 1) {
      return extraData
    } else {
      pages--
      requestOptions.url = requestOptions.url.replace(/http(.*?)v1/, "") // remove Meraki API v1 base URL
      console.log('requestOptions.url ', requestOptions.url)
      if(extraData._url){
        extraData._url = requestOptions.url
      }
      return request(requestOptions, pages, extraData, res)
    }
  } else {

    return res.data
  }
}

// function gasRequest(options) {
//   return new Promise(function(resolve, reject) {
//     google.script.run
//       .withSuccessHandler(res => {
//         let data;
//         //console.log("runAction gasRequest .fetch res: ", res);
//         try {
//           //console.log("gasRequest res", res);
//           data = JSON.parse(res.body);
//         } catch (error) {
//           console.log("unable to parse body, returning default body");
//           reject(error);
//         }
//         resolve(data);
//       })
//       .withFailureHandler(error => {
//         console.log("GAS via OAS error: ", error);
//         reject(error);
//       })
//       .fetch(options.url, options);
//   });
// }