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
      const role = req.query.role;
      try {
        const {
          rows: [user],
        } = await Users.getById(email, role);
        if (!user)
          return cb(null, false, {
            message: ERROR_MSG,
          });
        const isValidPassword = await verify(password, user.password);
        if (!isValidPassword) return cb(null, false, { message: ERROR_MSG });
        cb(null, { role, ...user });
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.deserializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.serializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, {
      role: user.role,
      email: user.email,
      organisation: user.organisation,
    });
  });
});

module.exports = passport;
