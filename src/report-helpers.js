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
        let summary = paths[path][p]["summary"];
        let description = paths[path][p]["description"];
        let operationId = paths[path][p]["operationId"];
        let params = paths[path][p]["parameters"] || [];
        let method = Object.keys(paths[path])[i];

        // pathParams
        let pathParams = [];
        let filteredPathParams = params.filter(p => p.in.includes("path"));
        filteredPathParams.forEach(p => pathParams.push(p.name));
        pathParams = JSON.stringify(pathParams);

        // queryParams
        let queryParams = [];
        let filteredQueryParams = params.filter(p =>
          p.in.includes("query")
        );
        filteredQueryParams.forEach(p => queryParams.push(p.name));
        queryParams = JSON.stringify(queryParams);

        // bodyModel
        let bodyModel = [];
        let filteredBodyModel = params.filter(p => p.in.includes("body"));
        filteredBodyModel.forEach(p => bodyModel.push(p.name));
        bodyModel = JSON.stringify(bodyModel);

        // create report
        report.push({
          summary,
          path,
          method,
          operationId,
          pathParams,
          queryParams,
          bodyModel
          //description //this data has chararcter conflicts with the sheet
        });
      });
    });
    return report;
  } catch (error) {
    throw (error, "parseSwaggerPaths");
  }
}