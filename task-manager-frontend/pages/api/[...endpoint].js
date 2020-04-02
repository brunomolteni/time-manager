import nookies from "nookies";
import fetch from "node-fetch";

// Proxy all /api/* requests to API server

async function proxyHandler(req, res) {
  const api = process.env.API_URL || "localhost";
  const port = process.env.API_PORT || "1337";
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
    `http://${api}:${port}/${endpoint.join("/")}`,
    options
  ).then(res => {
    status = res.status;
    return res.json();
  });

  return res.status(status).json(result);
}

export default proxyHandler;
