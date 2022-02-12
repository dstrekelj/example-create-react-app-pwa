const express = require("express");

const config = {
  port: 8080,
};

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(config.port, function () {
  console.log("Listening on port", config.port);
});
