const router = require("express").Router();
const { login, signup, logout, getMe } = require("../controllers/login");
const passport = require("../utils/passport");

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  login
);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/me", getMe);

module.exports = router;
