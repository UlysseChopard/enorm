const {
  get,
  set,
  remove,
} = require("../controllers/accounts");

module.exports = (router) => {
  router.get("/", get);
  router.put("/", set);
  router.delete("/", remove);
};
