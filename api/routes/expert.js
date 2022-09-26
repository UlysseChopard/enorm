const express = require("express");
const router = express.Router();

const expertCtrl = require("../controllers/expert");

router.get("/", expertCtrl.getAll);
router.get("/:id", expertCtrl.get);
router.post("/", expertCtrl.create);
router.put("/:id", expertCtrl.modify);
router.delete("/:id", expertCtrl.remove);

module.exports = router;
