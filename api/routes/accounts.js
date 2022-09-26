const router = require("express").Router();

const {
  getAll,
  getById,
  create,
  modify,
  remove,
  authenticate,
} = require("../controllers/accounts");

// router.get("/", getAll);
// router.get("/:id", getById);
router.post("/", create);
router.post("/login", authenticate);
// router.put("/:id", modify);
// router.delete("/:id", remove);

module.exports = router;
