const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const mountRoutes = require("./routes");
const log = require("./utils/logs");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.locals.basedir = app.get("views");
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    log.info({ req, res });
    next();
  });
}

mountRoutes(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err });
});

module.exports = app;
