const cors = require("cors");
const helmet = require("helmet");

const log = require("../utils/logs.js");
const logger = require("./logger");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./passport");
const { getPool } = require("../db");

module.exports = (app, express) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(logger);

  app.use(
    session({
      store: new pgSession({
        createTableIfMissing: true,
        pool: getPool(),
        errorLog: log.warn,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    })
  );

  app.use(passport.initialize());

  app.use(passport.authenticate("session"));
};
