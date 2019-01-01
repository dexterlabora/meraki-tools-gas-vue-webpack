type GetRequest = {
  parameter: { [key: string]: string };
  parameters: { [key: string]: string[] };
  queryString: string;
};

export function doGet(e: GetRequest) {
  let q = e.parameter["q"];

  return HtmlService.createTemplateFromFile("index").evaluate();
}
