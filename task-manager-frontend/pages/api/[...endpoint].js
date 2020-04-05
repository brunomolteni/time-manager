const { URL, URLSearchParams } = require("url");
import nookies from "nookies";
import fetch from "node-fetch";
import { config } from "../../util";

// Proxy all /api/* requests to API server

async function proxyHandler(req, res) {
  const { API_URL, API_PORT } = config;
  const cookies = nookies.get({ req, res });
  const options = {
    method: req.method,
    headers: {
      ...req.headers,
    },
  };

  if (cookies.token) options.headers.Authorization = `Bearer ${cookies.token}`;

  if (req.method !== "GET" && req.body) {
    options.body = JSON.stringify(req.body);
    options.headers["Content-Type"] = "application/json";
    options.headers["accept"] = "application/json";
  }

  const { endpoint } = req.query;
  delete req.query.endpoint;
  var url = new URL(`http://${API_URL}:${API_PORT}/${endpoint.join("/")}`);
  url.search = new URLSearchParams(req.query).toString();

  let status;
  let result = await fetch(url, options).then((res) => {
    status = res.status;
    return res.json();
  });

  return res.status(status).json(result);
}

export default proxyHandler;
