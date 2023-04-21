const { ask, accept, deny } = require("../controllers/registrations");

module.exports = (router) => {
  router.post("/", ask);
  router.put("/:id", accept);
  router.delete("/:id", deny);
  return router;
};
