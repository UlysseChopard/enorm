const { change, reset, sendResetLink } = require("../controllers/passwords");

module.exports = (router) => {
  router.patch("/", change);
  router.put("/reset", sendResetLink);
  router.put("/:uuid", reset);
};
