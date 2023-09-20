const {
  createOrganisation,
  addSuperuser,
  removeSuperuser,
} = require("controllers/administration");

const { isSuperuser } = require("middlewares/roles");
module.exports = ({ Router }) => {
  const router = Router();
  router.post("/superusers", isSuperuser, addSuperuser);
  router.delete("/superusers/:id", isSuperuser, removeSuperuser);
  router.post("/organisations", isSuperuser, createOrganisation);
  return router;
};
