const {
  get,
  invite,
  establish,
  close,
} = require("../controllers/subscriptions");

module.exports = (router) => {
  router.get("/", get);
  router.put("/", invite);
  router.post("/:subscription", establish);
  router.delete("/:subscription", close);
  return router;
};
