const router = require("express").Router();

router.get("/", (_req, res) => res.render("index"));
router.get("/login", (_req, res) => res.render("login"));
router.get("/signup", (_req, res) => res.render("signup"));

module.exports = router;
