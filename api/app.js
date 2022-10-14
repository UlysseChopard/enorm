const express = require("express");

const mountMiddlewares = require("./middlewares");
const mountRoutes = require("./routes");

const app = express();

mountMiddlewares(app, express);
mountRoutes(app);

module.exports = app;
