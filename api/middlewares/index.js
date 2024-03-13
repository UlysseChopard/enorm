const { OrganisationsMembers, Accounts } = require("models");

exports.isAuthenticated = (req, res, next) =>
  res.locals.accountId
    ? next()
    : res.status(401).json({ message: "Require authentication" });

const dbNames = {
  admin: "is_admin",
  expert: "is_expert",
  manager: "is_manager",
};

exports.hasRole =
  (...roles) =>
  async (req, res, next) => {
    try {
      const {
        rows: [userRoles],
      } = await OrganisationsMembers.getRoles(
        req.params.organisation,
        res.locals.accountId,
      );
      if (userRoles) {
        for (const role of roles) {
          if (userRoles[dbNames[role]]) return next();
        }
      }
      const {
        rows: [account],
      } = await Accounts.get(res.locals.accountId);
      if (account.superuser) return next();
      return res.status(403).json({ message: `Roles in ${roles} required` });
    } catch (err) {
      next(err);
    }
  };

exports.isSuperuser = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.get(res.locals.accountId);
    if (!account) {
      return res.status(404).json({ message: "account not found" });
    }
    if (!account.superuser) {
      return res.status(403).json({ message: "Role superuser required" });
    }
    next();
  } catch (err) {
    next(err);
  }
};
