const { OrganisationsMembers, Accounts } = require("models");
const { upsert, remove } = require("controllers/sessions/tokens");

const isAdmin = async (req, res, next) => {
  try {
    const {
      rows: [admin],
    } = await OrganisationsMembers.isAdmin(req.body.organisationMember);
    if (admin) {
      return next();
    }
    const {
      rows: [account],
    } = await Accounts.get(res.locals.accountId);
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
