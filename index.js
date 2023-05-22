const PORT = 3000;
const express = require("express");
const server = express();
const path = require("path");
const { client } = require("./db");
client.connect();
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});
server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());
server.use(express.static(path.join(__dirname, "./client", "dist")));
server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");
  next();
});

const apiRouter = require("./api");
server.use("/api", apiRouter);
