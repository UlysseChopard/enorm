const { OrganisationsMembers, Accounts } = require("models");
const { upsert, remove } = require("controllers/sessions/tokens");

const isAdmin = async (req, res, next) => {
  try {
    const { rows: admins } = await OrganisationsMembers.getAdminsForMember(
      req.body.member
    );
    for (const admin of admins) {
      if (admin.account === res.locals.accountId) return next();
    }
    const {
      rows: [account],
    } = await Accounts.get(req.locals.accountId);
    if (account.superuser) return next();
    res.status(403).json({ message: "Admin role required" });
  } catch (err) {
    next(err);
  }
};

module.exports = ({ Router }) => {
  const router = Router();
  router.delete("/:id", isAdmin, remove);
  router.put("/", isAdmin, upsert);
  return router;
};
