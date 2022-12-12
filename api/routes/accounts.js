const {
  get,
  replace,
  remove,
} = require("../controllers/accounts");

module.exports = (router) => {
  router.get("/", get);
  router.put("/", replace);
  router.delete("/", remove);
};
