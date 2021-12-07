const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const expertCtrl = require("../controllers/expert");

router.use(auth);

router.get("/", expertCtrl.getAll);
router.get("/:id", expertCtrl.get);
router.post("/", multer, expertCtrl.create);
router.put("/:id", multer, expertCtrl.modify);
router.delete("/:id", expertCtrl.del);
router.post("/:id/like", expertCtrl.recordLikes);

module.exports = router;