const router = require("express").Router();
const {
  deleteAccount,
  signup,
  logout,
  login,
  sendUser,
  activateAccount,
  sendEmailValidation,
} = require("../controllers/auth");
const { isAuthenticated } = require("../middlewares/auth");
const passport = require("../middlewares/passport");

router.post("/signup", sendEmailValidation, signup);
router.post("/login", passport.authenticate("local"), login);
router.get("/:uuid/activate", activateAccount);
router.post("/logout", isAuthenticated, logout);
router.get("/user", isAuthenticated, sendUser);
router.delete("/", isAuthenticated, deleteAccount);

module.exports = router;
