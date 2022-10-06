const router = require("express").Router();
const { getUser, create } = require("../controllers/users");

router.get("/users", getUser);
router.post("/users", create);

module.exports = router;
