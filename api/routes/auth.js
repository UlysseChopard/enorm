const router = require("express").Router();
const {
  signup,
  logout,
  login,
  sendUser,
  activateAccount,
} = require("../controllers/auth");
const { isAuthenticated, sendEmailValidation } = require("../middlewares/auth");
const passport = require("../middlewares/passport");

router.post("/signup", sendEmailValidation, signup);
router.post("/login", passport.authenticate("local"), login);
router.get("/activate/:uuid", activateAccount);
router.post("/logout", isAuthenticated, logout);
router.get("/user", isAuthenticated, sendUser);

module.exports = router;
