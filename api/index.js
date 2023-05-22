const express = require("express");
const apiRouter = express.Router();
const path = require("path");
require("dotenv").config();
//console.log(process.env.JWT_SECRET);
apiRouter.use(express.static(path.join(__dirname, "./client", "dist")));
const jwt = require("jsonwebtoken");
const { getUserById, updatePost, getPostById } = require("../db");
const { JWT_SECRET } = process.env;

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.get("/background/:color", (req, res, next) => {
  res.send(`
    <body style="background: ${req.params.color};">
      <h1>Hello World</h1>
    </body>
  `);
});

const usersRouter = require("./users");
const postsRouter = require("./posts");
const tagsRouter = require("./tags");
apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/tags", tagsRouter);

//error handler
apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
