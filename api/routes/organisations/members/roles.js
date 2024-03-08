const { allow, disallow } = require("controllers/organisations/members/roles");
const { hasRole } = require("middlewares");

module.exports = ({ Router }) => {
  const router = Router({ mergeParams: true });
  router.delete("/:member/roles/:role", hasRole("admin"), disallow);
  router.put("/:member/roles/:role", hasRole("admin"), allow);
  return router;
};
