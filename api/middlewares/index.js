const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { log } = require("../utils");

module.exports = (express, app) => {
  app.use(compression());
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(log);
};
