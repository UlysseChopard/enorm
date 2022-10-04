const router = require("express").Router();
const { signup, logout } = require("../controllers/auth");
const passport = require("../middlewares/passport");

router.post("/login", passport.authenticate("local"));
router.post("/signup", signup);
router.get("/logout", logout);

module.exports = router;
