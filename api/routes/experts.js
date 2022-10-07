const router = require("express").Router();
const { fillProfile, declareExpert } = require("../controllers/experts");

router.patch("/experts", fillProfile);
router.post("/experts", declareExpert);

module.exports = router;
