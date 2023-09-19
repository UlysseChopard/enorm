const { allow, disallow } = require("controllers/organisations/members/roles");
const { hasRole } = require("middlewares/roles");

module.exports = ({ Router }) => {
  const router = Router();
  router.delete("/:member/roles/:role", hasRole("admin"), disallow);
  router.put("/:member/roles/:role", hasRole("admin"), allow);
  return router;
};
