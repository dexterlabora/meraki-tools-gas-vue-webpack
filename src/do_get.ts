type GetRequest = {
  parameter: { [key: string]: string };
  parameters: { [key: string]: string[] };
  queryString: string;
};

export function doGet(e: GetRequest) {
  /**
   * If you want to serve up other content than the single-page app, you can either
   * use `google.script.run` on the client-side to serve JSON or extend this to
   * serve any other content you might want.
   */
  let q = e.parameter["q"];

  return HtmlService.createTemplateFromFile("index").evaluate();
}
