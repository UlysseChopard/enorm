const router = require("express").Router();
const {
  sendResetPasswordLink,
  updatePassword,
  resetPassword,
} = require("../controllers/passwords");

router.post("/", sendResetPasswordLink);

router.put("/", updatePassword);
router.put("/reset", resetPassword);

module.exports = router;
