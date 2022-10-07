const router = require("express").Router();
const { fillProfile, declareExpert, getAll } = require("../controllers/experts");

router.patch("/experts", fillProfile);
router.post("/experts", declareExpert);
router.get("/experts", getAll);

module.exports = router;
