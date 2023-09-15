const { OrganisationsMembers } = require("models");

exports.join = async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await OrganisationsMembers.linkAccountAsUser(res.locals.accountId, req.params.id);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.leave = async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await OrganisationsMembers.unlinkAccountAsUser(res.locals.accountId, req.params.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
