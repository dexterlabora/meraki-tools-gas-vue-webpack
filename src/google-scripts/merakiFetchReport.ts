import * as utilities from "./utilities"
import {parseSwaggerPaths, parseNetworkEvents} from "./reportHelpers";
import {fetch} from "./fetch"
// Global Functions

/**
 * Fetches Meraki API data and formats the JSON data into Google Sheet format
 * @param url url to pull json data from
 * @param apiKey API key for authorization
 * @param title The title text to display in the cell
 * @param refresh Triggers a refresh of report when changed. Cannot use now() functions, so a helper "Refresh Reports" button will update a hidden _meraki_tools settings sheet to set a time, triggering the function to re-evaluate. You can optionaly set a Trigger to call the refreshReports function on a schedule. 
 * @return Google Sheet data
 * @customfunction
 */
export async function merakiFetchReport(url: string, apiKey: string, title: string, refresh: string) {
    refresh = refresh; // this does nothing, but triggers a change event for google sheets to re-evaluate the function
    const userProperties = PropertiesService.getUserProperties();
    apiKey = apiKey || userProperties.getProperty("MERAKI_API_KEY")
    // set default tile
    const date = new Date()

    title = title || `Meraki API`;
    title = `${title} , ${url}, Updated: ${
        date.toISOString()
    } \n`

    const baseUrl = "https://api.meraki.com/api/v1" // consider sourcing this from a global namespace
    url = url.includes("https://") ? url : baseUrl + url
    const options = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
            'X-Cisco-Meraki-API-Key': apiKey
        }
    }
    // get api result
    let res: Object = {}
    res = await fetch(url, options)
    let result = {}
    try {
        result = JSON.parse(res["body"])

        // report helpers
        if (url.includes("openapiSpec")) {
            result = parseSwaggerPaths(result)
        } else if (url.includes("/events")) {
            result = parseNetworkEvents(result)
        }
    } catch (e) {
        result = e
    }


    // build results array
    let data = []
    let keys = []
    let results = []
    // find keys
    if (Array.isArray(result)) {
        results = [
            ...[],
            ... result
        ]
    } else {
        results.push(result)
    } results.forEach(function (obj) {
        let flat: any = {};
        flat = utilities.flattenObject(obj) || {};
        data.push(flat);
        // set keys
        Object.keys(flat).forEach(function (value) {
            if (keys.indexOf(value) == -1) 
                keys.push(value);
            
        });
    });

    // convert to csv
    let csvData: string = await utilities.parseJsonToCsv(data, keys).toString()
    Logger.log(`csvData results: %s`, csvData)

    // add title
    csvData = title + csvData;
    // convert to sheet multi-dimensional array
    // const arr = await Utilities.parseCsv(csvData)
    const arr = await Utilities.parseCsv(csvData).map(function (row) {
        return row.map(function (col: any) {
          if (!col){return}else{
            return isNaN(col) ? col : Number(col)
          }
            
        })
    }); // new concept to avoid losing number format

    Logger.log(` csvToArray arr : %s`, arr)
    SpreadsheetApp.flush();


    return arr

}
