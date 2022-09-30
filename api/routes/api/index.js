const router = require("express").Router();
const profile = require("./profile");

router.use("/profile", profile);

module.exports = router;
