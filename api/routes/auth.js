const router = require("express").Router();
const { signup, logout } = require("../controllers/auth");
const passport = require("../middlewares/passport");

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => res.redirect(`/dashboard?role=${req.query.role}`)
);
router.post("/signup", signup);
router.post("/logout", logout);

module.exports = router;
