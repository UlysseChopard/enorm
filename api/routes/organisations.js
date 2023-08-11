const { join, leave } = require("../controllers/organisations");

module.exports = (router) => {
  router.put("/:id", join);
  router.delete("/:id", leave);
  return router;
};
