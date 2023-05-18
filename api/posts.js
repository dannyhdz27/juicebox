const express = require("express");
const usersRouter2 = express.Router();
const { getAllPosts } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
usersRouter2.use((req, res, next) => {
  console.log("request is being made to /posts");
  next();
});

usersRouter2.get("/", async (req, res) => {
  const posts = await getAllPosts();
  res.send({
    posts,
  });
});

module.exports = usersRouter2;
