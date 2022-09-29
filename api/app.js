const express = require("express");

const setup = require("./utils/express-setup");
const mountMiddlewares = require("./middlewares");
const mountRoutes = require("./routes");

const app = express();

setup(app);
mountMiddlewares(app, express);
mountRoutes(app);

module.exports = app;
