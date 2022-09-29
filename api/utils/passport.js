const passport = require("passport");
const { verify } = require("./auth");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, cb) => {
    try {
      const {
        rows: [user],
      } = await db.query(
        "SELECT email, password, role FROM users WHERE email = $1",
        [email]
      );
      if (!user)
        return cb(null, false, {
          message: "Incorrect username or password",
        });
      const validPassword = await verify(password, user.password);
      if (!validPassword)
        return cb(null, false, { message: "Incorrect username or password" });
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, {
      username: user.username,
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
