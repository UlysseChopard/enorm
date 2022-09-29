const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const pgSession = require("connect-pg-simple")(session);

const log = require("./utils/logs.js");
const passport = require("./utils/passport");
const { getPool } = require("./db");
const mountRoutes = require("./routes");

const app = express();

app.locals.basedir = app.get("views");
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: new pgSession({
      createTableIfMissing: true,
      pool: getPool(),
      errorLog: log.info,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.use(passport.authenticate("session"));

mountRoutes(app);

module.exports = app;
