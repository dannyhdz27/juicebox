const express = require("express");
const apiRouter = express.Router();

const usersRouter = require("./users");
const usersRouter2 = require("./posts");
apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", usersRouter2);
module.exports = apiRouter;
