const express = require("express");
const middlewares = require("./middlewares");
const routes = require("./routes");

const app = express();

middlewares(express, app);
routes(express, app);

module.exports = app;
