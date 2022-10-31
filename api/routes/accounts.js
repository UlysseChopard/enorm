const router = require("express").Router();
const {
  deleteAccount,
  signup,
  logout,
  login,
  sendUser,
  activateAccount,
} = require("../controllers/accounts");
const { isAuthenticated } = require("../middlewares/auth");
const passport = require("../middlewares/passport");

router.get("/:uuid/activate", activateAccount);
router.get("/", isAuthenticated, sendUser);

router.post("/signup", signup);
router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);

router.delete("/", isAuthenticated, deleteAccount);

module.exports = router;
