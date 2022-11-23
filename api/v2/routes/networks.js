const { get, add, remove, accept, deny } = require("../middlewares/networks");

module.exports = (router) => {
  router.get("/", get);
  router.put("/", add);
  router.delete("/", remove);
  router.put("/:id", accept);
  router.delete("/:id", deny);
};
