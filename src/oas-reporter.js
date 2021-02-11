// Collection of utilities to generate reporting functions for an OpenAPI v2 / Swagger spec.
import SwaggerParser from "swagger-parser";

export const swaggerParser = SwaggerParser;

export function generateSwaggerPathsVue(
  parsedSwagger,
  options,
  inputValuesMap
) {
  if (!parsedSwagger) {
    return;
  }

  var host = options.baseUrl ?
    options.baseUrl :
    `https://${parsedSwagger.host}${parsedSwagger.basePath}`;

  let paths = parsedSwagger.paths;
  let finalView = {
    host,
    //host: "http://localhost:8080/api",

    title: parsedSwagger.info.title,
    version: parsedSwagger.info.version,
    //description: parsedSwagger.info.description,
    opened: true,
    request: []
  };

  let pathKeys = Object.keys(paths);
  if (!pathKeys.length) {
    return;
  }
  pathKeys.forEach(path => {
    let requests = [];
    let methods = Object.keys(parsedSwagger.paths[path]);

    methods.forEach(m => {
      let request = {};
      request.tags = parsedSwagger.paths[path][m].tags;
      request.method = m;
      request.description = parsedSwagger.paths[path][m].description;
      request.url = path;
      //request.headers = headers;

      //Get the query & body params
      request.params = [];
      if (parsedSwagger.paths[path][m].parameters) {
        const qParams = parsedSwagger.paths[path][m].parameters.filter(
          p => p.in === "query" || p.in == "body"
        );
        request.params = [
          ...request.params,
          ...qParams.map(p => {
            p.key = p.name;
            p.source = p.in;
            return p;
          })
        ];
      }

      //request.body = "item.body";

      // request.params = [];
      // if (request.url.includes("{organizationId}")) {
      //   request.params.push({
      //     key: "organizationId",
      //     description: 123,
      //     value: 666,
      //     inputValue: 999,
      //     source: "path"
      //   });
      // }

      requests.push(request);
    });
    finalView.request = [...finalView.request, ...requests];
  });

  return finalView;
}

export function generateReportTemplates(parsedSwagger) {
  if (!parsedSwagger) {
    return;
  }
  let swaggerReports = [];
  let filteredPaths = [];

  // Extract API paths
  if (!parsedSwagger.paths) {
    return;
  }
  let paths = Object.keys(parsedSwagger.paths);
  paths.forEach(path => {
    // Only use GET methods
    if (parsedSwagger.paths[path]["get"]) {
      filteredPaths.push({
        ...parsedSwagger.paths[path]["get"],
        ...{
          path: path
        }
      });
    }
  });

  // Define swagger report template
  filteredPaths.forEach(path => {
    let report = {};
    report.title = path.summary;
    report.path = path.path;
    report.shortTitle = _.startCase(path.operationId.replace("get", ""));
    report.operationId = path.operationId;
    report.description = path.description;
    report.group = path.tags[0];
    report.tags = path.tags;
    report.parameters = path.parameters;
    swaggerReports.push(report);
  });

  return swaggerReports;
}

export function getPathQueryWithValues(queryParams, paramVals) {
  console.log('getPathQueryWithValues queryParams paramVals', queryParams, paramVals)
  // Append Query with Values
  
  if (!queryParams || !paramVals) {
    //return query;
    return
  }
  let query = "";
  let count = 0;
  if (queryParams.length > 0) {
 
    queryParams.forEach((qp, i) => {
      if (!paramVals[qp.name]) {
        return;
      }else{
        count ++
      }
      if(count === 1){
        query = "?"
      }else{
        query = query + "&"
      }
      
      // adjust array param names to include `[]`     ?fooBar[]=miles&fooBar[]=meraki
      if (qp.type === "array") {
        paramVals[qp.name].forEach(qpa => {
          query = query + qp.name + "[]=" + qpa;
        });
      } else {
        query = query + qp.name + "=" + paramVals[qp.name];
      }
    });
    return query;
  } else {
    return query;
  }
}

export function getPathWithValues(path, values) {
  //console.log("getPathWithValues path, values", path, values);
  if (!values) {
    return path;
  }
  let newPath = path.replace(/\{\w+\}/gi, n => {
    let param = n.replace(/[{}]/g, "");
    return values[param];
  });
  return newPath;
}

export function getParamDescription(parsedSwagger, operationId, param) {
  let filteredPaths = [];

  // Extract API paths
  let paths = Object.keys(parsedSwagger.paths);
  paths.forEach(path => {
    // Only use GET methods
    if (parsedSwagger.paths[path]["get"]) {
      filteredPaths.push({
        ...parsedSwagger.paths[path]["get"],
        ...{
          path: path
        }
      });
    }
  });

  let operation = filteredPaths.filter(p => p.operationId === operationId)[0];

  if (!operation) {
    return "";
  } else {
    if (!operation.parameters) {
      return "";
    } else {
      return operation.parameters.filter(p => p.name === param)[0].description;
    }
  }
}

export function getSwaggerPathParams(params) {
  if (!params || params === undefined) {
    return;
  }
  return params.filter(p => p.in === "path");
}

export function getSwaggerQueryParams(params) {
  if (!params || params === undefined) {
    return;
  }
  return params.filter(p => p.in === "query");
}