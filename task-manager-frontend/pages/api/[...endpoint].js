const { createProxyMiddleware } = require("http-proxy-middleware");
import nookies from "nookies";
import fetch from "node-fetch";

// Proxy all /api/* requests to API server

async function proxyHandler(req, res) {
  const cookies = nookies.get({ req, res });
  const options = {
    method: req.method,
    headers: {
      ...req.headers,
      Authorization: `Bearer ${cookies.token}`
    }
  };

  if (req.method !== "GET" && req.body) {
    options.body = JSON.stringify(req.body);
    options.headers["Content-Type"] = "application/json";
    options.headers["accept"] = "application/json";
  }

  const { endpoint } = req.query;
  let status;
  let result = await fetch(
    `http://localhost:1337/${endpoint.join("/")}`,
    options
  ).then(res => {
    status = res.status;
    return res.json();
  });

  return res.status(status).json(result);
}

export default proxyHandler;
