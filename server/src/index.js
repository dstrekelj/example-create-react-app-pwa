const express = require("express");
const cors = require("cors");
const db = require("./db");

const config = {
  port: 8080,
};

const app = express();
app.use(express.json());
app.use(cors());

app.get("/notes", (req, res) => {
  res.json({ data: db.getAll() });
});

app.get("/notes/:id", (req, res) => {
  res.json({ data: db.getOne(req.params.id) });
});

app.post("/notes", (req, res) => {
  const note = db.add(req.body);
  res.status(201).json({ data: note });
});

app.put("/notes/:id", (req, res) => {
  const note = db.put(req.params.id, req.body);
  res.json({ data: note });
});

app.delete("/notes/:id", (req, res) => {
  db.remove(req.params.id);
  res.status(204).send();
});

app.listen(config.port, function () {
  console.log("Listening on port", config.port);
});
