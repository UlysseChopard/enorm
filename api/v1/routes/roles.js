const router = require("express").Router();

const { declare, getAll, del } = require("../controllers/roles");

router.post("/", declare);

router.get("/", getAll);

router.delete("/", del);

module.exports = router;
