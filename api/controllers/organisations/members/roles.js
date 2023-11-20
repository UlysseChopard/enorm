const { Organisations, OrganisationsMembers } = require("models");

exports.allow = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getById(req.params.organisation);
    if (!organisation) {
      return res.status(404).json({ message: "Missing organisation" });
    }
    const {
      rows: [organisationMember],
    } = await OrganisationsMembers.grantRole(
      req.params.member,
      `is_${req.params.role}`
    );
    res.json({ organisationMember });
  } catch (err) {
    next(err);
  }
};

exports.disallow = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getById(req.params.organisation);
    if (!organisation) {
      return res.status(404).json({ message: "Missing organisation" });
    }
    const {
      rows: [organisationMember],
    } = await OrganisationsMembers.revokeRole(
      req.params.member,
      `is_${req.params.role}`
    );
    res.json({ organisationMember });
  } catch (err) {
    next(err);
  }
};
