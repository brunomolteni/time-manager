// Generates HTML from the data and saves it as an html file

import ReactDOMServer from "react-dom/server";
import { saveAs } from "file-saver";

export default (log) => {
  const logByDate = {};

  log.forEach(({ date, duration, task }) => {
    if (logByDate[date]) {
      logByDate[date].duration += duration;
      logByDate[date].tasks.push(task);
    } else
      logByDate[date] = {
        date: new Date(date).toLocaleDateString(),
        duration,
        tasks: [task],
      };
  });

  const element = (
    <html>
      <body>
        <header>
          <h1>Work Log</h1>
        </header>
        <hr />
        {Object.keys(logByDate)
          .map((date) => logByDate[date])
          .map(({ date, duration, tasks }) => (
            <div>
              <p>Date: {date} </p>
              <p>Total time: {duration} </p>
              <ul>
                {tasks.map((task) => (
                  <li>{task}</li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
        <footer>
          <small>
            Work log created by <b>Work-o-tron 3000™</b>
          </small>
        </footer>
      </body>
    </html>
  );
  const html = ReactDOMServer.renderToStaticMarkup(element);
  var blob = new Blob([html], { type: "text/html;charset=utf-8" });
  saveAs(blob, "log.html");
};
