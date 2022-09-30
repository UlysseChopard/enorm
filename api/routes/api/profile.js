const router = require("express").Router();
const { fill } = require("../../controllers/api/profile");

router.post("/", fill);

module.exports = router;
