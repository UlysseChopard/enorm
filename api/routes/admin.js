const {
  createOrganisation,
  setSuperuser,
  unsetSuperuser,
  get,
} = require("controllers/admin");

const { isSuperuser } = require("middlewares/roles");
module.exports = ({ Router }) => {
  const router = Router();
  router.get("/", isSuperuser, get);
  router.put("/superusers/:id", isSuperuser, setSuperuser);
  router.delete("/superusers/:id", isSuperuser, unsetSuperuser);
  router.post("/organisations", isSuperuser, createOrganisation);
  return router;
};
