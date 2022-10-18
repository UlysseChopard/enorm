const cors = require("cors");
const helmet = require("helmet");

const log = require("../utils/logs.js");
const logger = require("./logger");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./passport");
const { getPool } = require("../db");

const sessionConfig = {
  store: new pgSession({
    createTableIfMissing: true,
    pool: getPool(),
    errorLog: log.warn,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days: 30 * 24 * 60 * 60 * 1000
    sameSite: "lax",
    secure: false,
  },
};

const CORS_OPTS = { origin: true, credentials: true };

module.exports = (app, express) => {
  app.use(helmet());
  app.use(cors(CORS_OPTS));
  app.option(cors(CORS_OPTS));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.use(logger);

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1); // trust first proxy
    sessionConfig.cookie.secure = true; // serve secure cookies
  }

  app.use(session(sessionConfig));

  app.use(passport.session());
};
