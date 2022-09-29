const router = require("express").Router();
const { dashboard, home, login, signup } = require("../controllers/views");

router.get("/", home);
router.get("/login", login);
router.get("/signup", signup);
router.get("/dashboard", dashboard);

module.exports = router;
