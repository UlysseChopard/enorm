const passport = require("passport");
const { verify } = require("../utils/auth");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db");
const Users = require("../models/users");

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
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  })
);

passport.deserializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.serializeUser(
  ({ roles, email, firstName, lastName, organisation }, cb) => {
    process.nextTick(function () {
      return cb(null, {
        roles,
        email,
        organisation,
        firstName,
        lastName,
      });
    });
  }
);

module.exports = passport;
