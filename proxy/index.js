const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: { "^/api": "/" },
  }),
);
app.use(
  "/",
  createProxyMiddleware({ target: "http://localhost:3000", changeOrigin: true }),
);
app.listen(3001);
