const { OrganisationsMembers } = require("models");
const { upsert, remove } = require("controllers/sessions/tokens");
const { isSuperuser } = require("middlewares/roles");

const isAdmin = async (req, res, next) => {
  try {
    const { rows: admins } = await OrganisationsMembers.getAdminsForMember(
      req.params.member
    );
    for (const admin of admins) {
      if (admin.account === res.locals.accountId) return next();
    }
    res.status(403).json({ message: "admin role needed" });
  } catch (err) {
    next(err);
  }
};

module.exports = ({ Router }) => {
  const router = Router();
  router.delete("/:id", isSuperuser, remove);
  router.put("/", isSuperuser, upsert);
  router.put("/members/:member", isAdmin, upsert);
  return router;
};
