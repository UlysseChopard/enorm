const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const mountMiddlewares = require("./middlewares");
const mountRoutes = require("./routes");
// const doc = require("./swagger.json");
const doc = YAML.load("./spec.yml");

const app = express();

app.use("/doc", swaggerUI.serve, swaggerUI.setup(doc));
mountMiddlewares(app, express);
mountRoutes(app);

module.exports = app;
