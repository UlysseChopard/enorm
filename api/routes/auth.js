const router = require("express").Router();
const { signup, logout, login, sendUser } = require("../controllers/auth");
const passport = require("../middlewares/passport");

router.post("/login", passport.authenticate("local"), login);
router.post("/signup", signup);
router.get("/logout", logout);
router.get("/user", sendUser);

module.exports = router;
