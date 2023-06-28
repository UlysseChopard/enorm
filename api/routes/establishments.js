const { get, create, close, update } = require("../controllers/establishments");

module.exports = (router) => {
  router.post("/", create);
  router.get("/", get);
  router.put("/:id", update);
  router.delete("/:id", close);
  return router;
};
