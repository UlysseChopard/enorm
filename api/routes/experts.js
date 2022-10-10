const router = require("express").Router();
const {
  fillProfile,
  declareExpert,
  getAll,
} = require("../controllers/experts");

router.patch("/", fillProfile);
router.post("/", declareExpert);
router.get("/", getAll);

module.exports = router;
