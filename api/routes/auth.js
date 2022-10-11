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
router.post("/signup/managers", signupManager);
router.patch("/signup/experts/:uuid", activateExpert);
router.get("/logout", logout);
router.get("/user", isAuthenticated, sendUser);

module.exports = router;
