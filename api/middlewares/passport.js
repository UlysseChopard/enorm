const passport = require("passport");
const { verify } = require("../utils/auth");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db");
const Users = require("../models/users");

const ERROR_MSG = "Incorrect email or password";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, cb) => {
      try {
        const {
          rows: [user],
        } = await Users.getById(email, req.query.role);
        if (!user)
          return cb(null, false, {
            message: ERROR_MSG,
          });
        const validPassword = await verify(password, user.password);
        if (!validPassword) return cb(null, false, { message: ERROR_MSG });
        cb(null, user);
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, {
      role: user.role,
      email: user.email,
    });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;
