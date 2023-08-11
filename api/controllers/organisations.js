const { Users } = require("../models");

exports.join = async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await Users.linkAccountAsUser(res.locals.accountId, req.params.id);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.leave = async (req, res, next) => {
  try {
    const {
      rows: [user],
    } = await Users.unlinkAccountAsUser(res.locals.accountId, req.params.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
