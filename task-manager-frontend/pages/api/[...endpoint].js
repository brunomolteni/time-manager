const { createProxyMiddleware } = require("http-proxy-middleware");
import nookies from "nookies";

// Proxy all /api/* requests to API server

const proxy = token =>
  createProxyMiddleware({
    target: "http://localhost:1337",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

async function proxyHandler(req, res) {
  let cookies = nookies.get({ req, res });

  await runMiddleware(req, res, proxy(cookies.token));
}

export default proxyHandler;
