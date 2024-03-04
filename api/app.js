const express = require("express");
const { log } = require("utils");
const { preMiddlewares, postMiddlewares } = require("middlewares");
const routes = require("routes");

const app = express();

preMiddlewares(express, app);
routes(express, app);
postMiddlewares(express, app);

const run = (port = 3000) =>
  app.listen(port, (err) => {
    if (err) return log.error(err);
    log.info(`Listening on port ${port}`);
  });
if (require.main === "app") {
  run(process.env.PORT);
} else {
  module.exports = run;
}
