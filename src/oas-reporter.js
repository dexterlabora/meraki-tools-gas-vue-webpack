// Collection of utilities to generate reporting functions for an OpenAPI v2 / Swagger spec.
import SwaggerParser from "swagger-parser";

export const swaggerParser = SwaggerParser;

export function generateReportTemplates(parsedSwagger) {
  if (!parsedSwagger) {
    return;
  }
  let swaggerReports = [];
  let filteredPaths = [];

  // Extract API paths
  let paths = Object.keys(parsedSwagger.paths);
  paths.forEach(path => {
    // Only use GET methods
    if (parsedSwagger.paths[path]["get"]) {
      filteredPaths.push({
        ...parsedSwagger.paths[path]["get"],
        ...{ path: path }
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
  // Append Query with Values
  let query = "";
  if (!queryParams || !paramVals) {
    return query;
  }
  if (queryParams.length > 0) {
    queryParams.forEach((qp, i) => {
      if (!paramVals[qp.name]) {
        return;
      }
      if (i > 0 && query !== "") {
        query = query + "&" + qp.name + "=" + paramVals[qp.name];
      } else {
        query = "?" + qp.name + "=" + paramVals[qp.name];
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
        ...{ path: path }
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
