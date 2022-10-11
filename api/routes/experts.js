const router = require("express").Router();
const {
  fillProfile,
  declareExpert,
  getAll,
} = require("../controllers/experts");

router.post("/", declareExpert);
router.get("/", getAll);
router.patch("/", fillProfile);

module.exports = router;
