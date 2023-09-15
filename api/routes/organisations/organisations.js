const {
  get,
  replace,
  close,
} = require("controllers/organisations/organisations");
const { hasRole } = require("middlewares/roles");

module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", hasRole("admin"), get);
  router.put("/", hasRole("admin"), replace);
  router.delete("/", hasRole("admin"), close);
  return router;
};
