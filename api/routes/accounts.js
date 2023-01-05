const {
  get,
  create,
  update,
  remove,
} = require("../controllers/accounts");

// recover can be seen as temporary session based on email access
// -> in sessions routes
module.exports = (router) => {
  router.get("/", get);
  router.post("/", create);
  router.put("/:id", update);
  router.delete("/:id", remove);
  return router;
};
