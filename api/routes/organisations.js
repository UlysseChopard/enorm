const router = require("express").Router();
const { create, getAll } = require("../controllers/organisations");

router.post("/", create);
router.get("/", getAll);

module.exports = router;
