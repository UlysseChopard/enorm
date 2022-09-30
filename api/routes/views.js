const router = require("express").Router();
const { home, login, signup, dashboard } = require("../controllers/views");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", home);
router.get("/login", login);
router.get("/signup", signup);
router.get("/dashboard", isAuthenticated, dashboard);

module.exports = router;
