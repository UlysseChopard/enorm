const router = require("express").Router();

router.get("/", (_req, res) => res.render("index"));
router.get("/login", (req, res) =>
  res.render("login", { role: req.query.role || "expert" })
);
router.get("/signup", (req, res) =>
  res.render("signup", { role: req.query.role })
);
router.get("/manager", (_req, res) => res.render("login", { role: "manager" }));
router.get("/expert", (_req, res) => res.render("login", { role: "expert" }));

module.exports = router;
