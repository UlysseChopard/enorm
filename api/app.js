const express = require("express");

const setupViews = require("./utils/views");
const mountMiddlewares = require("./middlewares");
const mountRoutes = require("./routes");

const app = express();

setupViews(app);
mountMiddlewares(app, express);
mountRoutes(app);

module.exports = app;
