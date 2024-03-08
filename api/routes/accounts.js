const { get, create, update, remove } = require("controllers/accounts");
const { isAccountOwner } = require("middlewares/accounts");
const { isSuperuser } = require("middlewares");

module.exports = ({ Router }) => {
  const router = Router();
  router.post("/", isSuperuser, create);
  router.get("/:id", isAccountOwner, get);
  router.patch("/:id", isAccountOwner, update);
  router.delete("/:id", isSuperuser, remove);
  return router;
};
