const router = require("express").Router();

const {
  declareExpert,
  getAll,
  uploadExperts,
  deleteExpert,
} = require("../controllers/experts");

router.post("/upload", uploadExperts);
router.post("/", declareExpert);

router.get("/", getAll);

router.delete("/", deleteExpert);

module.exports = router;
