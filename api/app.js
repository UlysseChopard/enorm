const express = require("express");
const { log } = require("./utils");
const middlewares = require("./middlewares");
const routes = require("./routes");
const PORT = process.env.PORT ?? 3000;

const app = express();

middlewares(express, app);
routes(express, app);

app.listen(PORT, (err) => {
  if (err) return log.error(err);
  log.info(`Listening on port ${PORT}`);
});

