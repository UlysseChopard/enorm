const { login, upsert, remove } = require("controllers/sessions/tokens");
const { isSuperuser } = require("middlewares/roles");

module.exports = ({ Router }) => {
  const router = Router();
  router.post("/:id", login);
  router.delete("/:id", isSuperuser, remove);
  router.put("/", isSuperuser, upsert);
  return router;
};
