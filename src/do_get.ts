type GetRequest = {
  parameter: { [key: string]: string };
  parameters: { [key: string]: string[] };
  queryString: string;
};

export function doGet(e: GetRequest) {
  let q = e.parameter["q"];
  if (q === "dist") {
    return HtmlService.createHtmlOutputFromFile("dist/client-bundle.js");
  } else {
    return HtmlService.createTemplateFromFile("index").evaluate();
  }
}
