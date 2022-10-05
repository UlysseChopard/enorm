const router = require("express").Router();
const { create, getAll } = require("../controllers/organisations");

router.post("/organisations", create);
router.get("/organisations", getAll);

module.exports = router;
