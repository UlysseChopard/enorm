const passport = require("passport");
const { verify } = require("../utils/auth");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../models/users");
const log = require("../utils/logs");

const ERROR_MSG = "Incorrect email or password";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, cb) => {
    try {
      const {
        rows: [user],
      } = await Users.getByEmail(email);
      if (!user)
        return cb(null, false, {
          message: ERROR_MSG,
        });
      const isValidPassword = await verify(password, user.password);
      if (!isValidPassword) return cb(null, false, { message: ERROR_MSG });
      log.info("login", { user });
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  })
);

passport.deserializeUser(async (id, cb) => {
  try {
    const {
      rows: [user],
    } = await Users.getById(id);
    log.info("deserialize", user);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

passport.serializeUser((user, cb) => {
  log.info("serialize", user);
  process.nextTick(() => cb(null, user.id));
});

module.exports = passport;
