const router = require("express").Router();
const { signup, logout } = require("../controllers/auth");
const passport = require("../utils/passport");

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);
router.post("/signup", signup);
router.post("/logout", logout);

module.exports = router;
