const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: { "^/api": "/" },
  }),
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
} else {
  app.use(
    "/",
    createProxyMiddleware({ target: "http://localhost:3000", changeOrigin: true }),
  );
}

app.listen(3001);
