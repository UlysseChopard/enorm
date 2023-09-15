const { Users } = require("models");

exports.hasRole =
  (...roles) =>
  (req, res, next) => {
    try {
      const {
        rows: [userRoles],
      } = Users.getByAccountAndOrganisation(
        req.params.organisation,
        res.locals.accountId
      );
      if (!roles.includes(userRoles)) {
        return res.status(403).json({ message: `Roles in ${roles} required` });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
