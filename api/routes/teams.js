const { add, remove, get, join } = require("../controllers/teams");

module.exports = (router) => {
  router.get("/", get);
  router.post("/", add);
  router.delete("/:id", remove);
  router.put("/:id", join);
  return router;
};
