const express = require("express");
const usersRouter3 = express.Router();
const { getAllTags } = require("../db");

usersRouter3.use((req, res, next) => {
  console.log("a request is being made to /tags");
  next();
});

usersRouter3.get("/", async (req, res) => {
  const tags = await getAllTags();
  res.send({ tags });
});

module.exports = usersRouter3;
