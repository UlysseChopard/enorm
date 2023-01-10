const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const logger = require("./logger");
const errorHandler = require("./error-handler");
const authenticate = require("./auth");

exports.preMiddlewares = (express, app) => {
  app.use(compression());
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logger);
  app.use(authenticate);
};

exports.postMiddlewares = (_express, app) => {
  app.use(errorHandler);
};
