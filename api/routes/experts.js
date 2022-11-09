const router = require("express").Router();

const { declare, getAll, upload, del } = require("../controllers/experts");

router.post("/upload", upload);
router.post("/", declare);

router.get("/", getAll);

router.delete("/", del);

module.exports = router;
