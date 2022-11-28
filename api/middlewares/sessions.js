const session = require("express-session");
const Store = require("connect-pg-simple")(session);
const { db: { pool }, log } = require("../utils");

const store = new Store({
  pool,
  tableName: "sessions",
  errorLog: log.error
});

const opts = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialize: true,
  store
};

module.exports = (express, app) => {
  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
    opts.cookie.secure = true;
  }
  app.use(session(opts));
};
