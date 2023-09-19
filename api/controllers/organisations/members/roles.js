const { Organisations, OrganisationsMembers } = require("models");

exports.allow = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.accountId);
    if (!organisation) {
      return res.status(400).json({ message: "Missing organisation" });
    }
    const {
      rows: [updated],
    } = await OrganisationsMembers.manageRoleByIdAndOrganisation(
      organisation.id,
      req.params.member,
      { role: req.params.role, value: true }
    );
    res.json({ updated });
  } catch (err) {
    next(err);
  }
};

exports.disallow = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.accountId);
    if (!organisation) {
      return res.status(400).json({ message: "Missing organisation" });
    }
    const {
      rows: [updated],
    } = await OrganisationsMembers.manageRoleByIdAndOrganisation(
      organisation.id,
      req.params.member,
      { role: req.params.role, value: false }
    );
    res.json({ updated });
  } catch (err) {
    next(err);
  }
};
