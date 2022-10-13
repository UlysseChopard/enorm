const router = require("express").Router();
const {
  logout,
  login,
  sendUser,
  activateExpert,
  signupManager,
  sendEmailConfirmation,
} = require("../controllers/auth");
const { isAuthenticated } = require("../middlewares/auth");
const passport = require("../middlewares/passport");

router.post("/login", passport.authenticate("local"), login);
router.get("/confirm/:uuid", passport.authenticate("hash"), login);
router.post("/signup/managers", signupManager, sendEmailConfirmation);
router.patch("/signup/experts/:uuid", activateExpert);
router.get("/logout", isAuthenticated, logout);
router.get("/user", isAuthenticated, sendUser);

module.exports = router;
