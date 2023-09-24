const { OrganisationsMembers } = require("models");

exports.check = (req, res, next) => {
  try {
    const {
      rows: [member],
    } = OrganisationsMembers.checkToken(req.params.id);
    if (!member) return res.status(404).json({ message: "token not found" });
    return res.json({ token: req.params.id });
  } catch (err) {
    next(err);
  }
};
