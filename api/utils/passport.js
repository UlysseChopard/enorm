const passport = require("passport");
const { verify } = require("./auth");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db");

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const {
        rows: [user],
      } = await db.query("SELECT * FROM users WHERE name = $1", [username]);
      if (!user)
        return cb(null, false, {
          message: "Incorrect username or password",
        });
    } catch (err) {
      cb(err);
    }
    const validPassword = await verify(password, user.password);
    if (!validPassword)
      return cb(null, false, { message: "Incorrect username or password" });
    cb(null, user);
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      username: user.username,
      email: user.email,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;
