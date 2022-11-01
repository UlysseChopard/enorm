const router = require("express").Router();
const {
  deleteAccount,
  signup,
  logout,
  login,
  sendUser,
  activateAccount,
  sendActivation,
  sendAuthStatus,
  updatePassword,
  update,
  sendResetPasswordLink,
  resetPassword,
} = require("../controllers/accounts");
const { isAuthenticated } = require("../middlewares/auth");
const passport = require("../middlewares/passport");

router.get("/", sendAuthStatus);
router.get("/infos", isAuthenticated, sendUser);
router.get("/activate", sendActivation);
router.get("/:uuid/activate", activateAccount);

router.post("/signup", signup);
router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);
router.post("/password/reset", sendResetPasswordLink);

router.patch("/", update);

router.put("/password", updatePassword);
router.put("/password/reset", resetPassword);

router.delete("/", isAuthenticated, deleteAccount);

module.exports = router;
