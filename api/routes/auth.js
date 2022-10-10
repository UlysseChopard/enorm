const router = require("express").Router();
const {
  logout,
  login,
  sendUser,
  activateExpert,
  signupManager,
} = require("../controllers/auth");
const { isAuthenticated } = require("../middlewares/auth");
const passport = require("../middlewares/passport");

router.post("/login", passport.authenticate("local"), login);
router.post("/signup", activateExpert, signupManager);
router.get("/logout", logout);
router.get("/user", isAuthenticated, sendUser);

module.exports = router;
