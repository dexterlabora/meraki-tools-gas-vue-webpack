// Extracts report of paths and relavent information of a Swagger / OAS v2 JSON object.
export function parseSwaggerPaths(swagger) {
  let paths = swagger["paths"];
  //console.log("organization Open API paths", paths);
  let report = [];
  try {
    // get paths
    Object.keys(paths).forEach(function(path, index) {
      // get details for each path resource
      Object.keys(paths[path]).forEach((p, i) => {
        let tag = paths[path][p]["tags"][0];
        let summary = paths[path][p]["summary"];
        let description = paths[path][p]["description"];
        let operationId = paths[path][p]["operationId"];
        let params = paths[path][p]["parameters"] || [];
        let method = Object.keys(paths[path])[i];
        let responses = {...{}, ...paths[path][p]["responses"]}

        let example_200 = ""
        try{
          example_200 = JSON.stringify(responses["200"]["examples"]["application/json"]).replaceAll(",",";")
        }       
          catch(e){
        }

        let example_201 = ""
        try{
          example_201 = JSON.stringify(responses["201"]["examples"]["application/json"]).replaceAll(",",";")
        }       
          catch(e){
        }

        // pathParams
        let pathParams = [];
        let filteredPathParams = params.filter(p => p.in.includes("path"));
        filteredPathParams.forEach(p => pathParams.push(p.name));
        //pathParams = JSON.stringify(pathParams);
        pathParams = pathParams.join(", ");

        // queryParams
        let queryParams = [];
        let filteredQueryParams = params.filter(p => p.in.includes("query"));
        filteredQueryParams.forEach(p => queryParams.push(p.name));
        //queryParams = JSON.stringify(queryParams);
        queryParams = queryParams.join(", ");

        // bodyModel
        let bodyModel = [];
        let filteredBodyModel = params.filter(p => p.in.includes("body"));
        filteredBodyModel.forEach(p => bodyModel.push(p.name));
        //bodyModel = JSON.stringify(bodyModel);
        bodyModel = bodyModel.join(", ");

        //summary
        summary =  summary.replaceAll(",",";") // replaces , with ; to avoid csv chaos

        // create report
        report.push({
          //tag,
          path,
          operationId,
          summary,
          "product tags.0": paths[path][p]["tags"][0],    // product  
          "category tags.1": paths[path][p]["tags"][1],    // category
          "service tags.2": paths[path][p]["tags"][1],    // service
          method,       
          pathParams,
          queryParams,
         // example_200, // conflicting with sheet (when run via web app)
         // example_201,
         //j bodyModel
          //description //this data has chararcter conflicts with the sheet
        });
      });
      // sort order based on group tag name.
      report = report.sort((a, b) => {
        if (a.tag < b.tag) return -1;
        if (a.tag > b.tag) return 1;
        return 0;
      });
    });
    return report;
  } catch (error) {
    throw (error, "parseSwaggerPaths");
  }
}

export function parseNetworkEvents(res) {
  return res.events;
}
