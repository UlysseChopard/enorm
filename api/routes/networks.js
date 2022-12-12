const { get, add, remove } = require("../middlewares/networks");

module.exports = (router) => {
  router.get("/:from", get);
  router.put("/:from/:to", add);
  router.delete("/:from/:to", remove);
};
