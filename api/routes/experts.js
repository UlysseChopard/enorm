const router = require("express").Router();
const { fillProfile } = require("../controllers/experts");

router.post("/experts", fillProfile);

module.exports = router;
