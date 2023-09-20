const { OrganisationsMembers, Administration } = require("models");

const dbNames = {
  admin: "is_admin",
  expert: "is_expert",
  manager: "is_manager",
};

exports.hasRole =
  (...roles) =>
  (req, res, next) => {
    try {
      const {
        rows: [userRoles],
      } = OrganisationsMembers.getRoles(
        req.params.organisation,
        res.locals.accountId
      );
      for (const role of roles) {
        if (userRoles[dbNames[role]]) return next();
      }
      return res.status(403).json({ message: `Roles in ${roles} required` });
    } catch (err) {
      next(err);
    }
  };

exports.isSuperuser = (req, res, next) => {
  try {
    const {
      rows: [superuser],
    } = Administration.getByAccount(res.locals.accountId);
    if (!superuser)
      return res.status(403).json({ message: "Role superuser required" });
    next();
  } catch (err) {
    next(err);
  }
};
