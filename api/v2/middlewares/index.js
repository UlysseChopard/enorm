const helmet = require("helmet");
const logger = require("./logger");

module.exports = (express, app) => {
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logger);

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1); // trust first proxy
  }
};
