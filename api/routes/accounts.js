const {
  get,
  create,
  update,
  close,
} = require("../controllers/accounts");

// recover can be seen as temporary session based on email access
// -> in sessions routes
module.exports = (router) => {
  router.post("/", create);
  router.get("/", get);
  router.put("/", update);
  router.delete("/", close);
  return router;
};
