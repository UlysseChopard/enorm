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
  update,
} = require("../controllers/accounts");
const { isAuthenticated } = require("../middlewares/auth");
const passport = require("../middlewares/passport");

router.get("/:uuid/activate", activateAccount);
router.get("/infos", isAuthenticated, sendUser);
router.get("/", sendAuthStatus);
router.get("/activate", sendActivation);

router.post("/signup", signup);
router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);

router.patch("/", update);

router.delete("/", isAuthenticated, deleteAccount);

module.exports = router;
