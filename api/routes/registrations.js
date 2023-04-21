const { ask, accept, deny, get } = require("../controllers/registrations");

module.exports = (router) => {
  router.get("/", get);
  router.post("/", ask);
  router.put("/:id", accept);
  router.delete("/:id", deny);
  return router;
};
