const router = require("express").Router();
const {
  signup,
  logout,
  login,
  sendUser,
  sendEmailValidation,
} = require("../controllers/auth");
const { isAuthenticated } = require("../middlewares/auth");
const passport = require("../middlewares/passport");

router.post("/signup", signup, sendEmailValidation);
router.post("/login", passport.authenticate("local"), login);
router.get("/confirm/:uuid", passport.authenticate("hash"), login);
router.post("/logout", isAuthenticated, logout);
router.get("/user", isAuthenticated, sendUser);

module.exports = router;
