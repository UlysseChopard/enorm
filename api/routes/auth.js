const router = require("express").Router();
const { signup, logout } = require("../controllers/auth");
const { dashboard } = require("../controllers/views");
const passport = require("../middlewares/passport");

router.post("/login", passport.authenticate("local"), dashboard);
router.post("/signup", signup, dashboard);
router.get("/logout", logout);

module.exports = router;
