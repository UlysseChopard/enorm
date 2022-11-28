const compression = require("compression");
const helmet = require("helmet");
const sessions = require("./sessions");
const { log } = require("../utils");

module.exports = (express, app) => {
  app.use(compression());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(log);
  sessions(express, app);
};
