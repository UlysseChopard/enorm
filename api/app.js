const express = require("express");
const { log } = require("utils");
const { preMiddlewares, postMiddlewares } = require("middlewares");
const routes = require("routes");
const PORT = process.env.PORT ?? 3000;

const app = express();

preMiddlewares(express, app);
routes(express, app);
postMiddlewares(express, app);

app.listen(PORT, (err) => {
  if (err) return log.error(err);
  log.info(`Listening on port ${PORT}`);
});
