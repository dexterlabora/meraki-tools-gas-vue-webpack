import * as utilities from "./utilities"
// Global Functions

/**
 * Fetches Meraki API data and formats the JSON data into Google Sheet format
 * @param url url to pull json data from
 * @param apiKey API key for authorization
 * @return Google Sheet data
 * @customfunction
 */
export async function merakiFetchReport(url: string,apiKey: string){
  const baseUrl = "https://api.meraki.com/api/v1" // consider sourcing this from a global namespace
  url = url.includes("https://") ? url : baseUrl+url
  const options = {
    "async": true,
     "crossDomain": true,
     "method" : "GET",
     "headers" : {'X-Cisco-Meraki-API-Key': apiKey}
  }
  // get api result
  let res: Object = {}
  res = await fetch(url,options)
  let result = []
  try{
    result = JSON.parse(res["body"])
  }catch(e){
    result = e
  }
  
  // build results array
  let data = []
  let keys = []
  let results = []
  // find keys
  if(Array.isArray(result)){
    results = [...[],...result]
    }else{results.push(result)}  
  results.forEach(function(obj){ 
    let flat : any = {};
    flat = utilities.flattenObject(obj) || {};
    data.push(flat);
    // set keys
    Object.keys(flat).forEach(function(value){
      if (keys.indexOf(value)==-1) keys.push(value);
    });
  });

  // convert to csv
  const csvData: string = await utilities.parseJsonToCsv(data,keys).toString()
  Logger.log(`csvData results: %s`, csvData)

  // convert to sheet multi-dimensional array
  const arr = await Utilities.parseCsv(csvData);
  
  Logger.log(` csvToArray arr : %s`, arr)
  return arr
}


