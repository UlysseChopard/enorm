const express = require("express");
const { log } = require("utils");
const { preMiddlewares, postMiddlewares } = require("middlewares/app");
const routes = require("routes");
const port = process.env.PORT ?? 3000;

const app = express();

preMiddlewares(express, app);
routes(express, app);
postMiddlewares(express, app);

app.listen(port, (err) => {
  if (err) return log.error(err);
  log.info(`Listening on port ${port}`);
});

module.exports = app;
