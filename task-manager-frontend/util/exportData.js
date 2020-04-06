// Generates HTML from the data and saves it as an html file

import ReactDOMServer from "react-dom/server";
import { saveAs } from "file-saver";

export default (data) => {
  const element = (
    <html>
      <head>
        <style>
          {`body{
            font: 16px 1.5 sans-serif;
          }`}
        </style>
      </head>
      <body>
        <h1>Hi</h1>
      </body>
    </html>
  );
  const html = ReactDOMServer.renderToStaticMarkup(element);
  var blob = new Blob([html], { type: "text/html;charset=utf-8" });
  saveAs(blob, "log.html");
};
