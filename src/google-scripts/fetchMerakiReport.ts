const meraki_api_key = "6bec40cf957de430a6f1f2baa056b99a4fac9ea0" // DEMO KEY
function merakiFetchReport(){ fetchMerakiReport("https://api.meraki.com/api/v1/organizations", meraki_api_key) }

// Global Functions

/**
 * Fetches Meraki API data and formats the JSON data into Google Sheet format
 * @param url url to pull json data from
 * @param apiKey API key for authorization
 * @return Google Sheet data
 * @customfunction
 */
export async function merakiFetchReport(url,apiKey){
  const options = {
    "async": true,
     "crossDomain": true,
     "method" : "GET",
     "headers" : {'X-Cisco-Meraki-API-Key': apiKey}
  }
  // get api result
  const res = await fetch(url,options)
  let result = []
  try{
    result = JSON.parse(res.body)
  }catch(e){
    result = res.body
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
    var flat = flattenObject(obj);
    data.push(flat);
    // set keys
    Object.keys(flat).forEach(function(value){
      if (keys.indexOf(value)==-1) keys.push(value);
    });
  });

  // convert to csv
  const csvData = await parseJsonToCsv(data,keys)
  Logger.log(`csvData results: %s`, csvData)

  // convert to sheet multi-dimensional array
  const arr = await Utilities.parseCsv(csvData);
  
  Logger.log(` csvToArray arr : %s`, arr)
  return arr
}


