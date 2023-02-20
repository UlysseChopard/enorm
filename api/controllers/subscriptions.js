const { Accounts } = require("../models");

exports.search = async (req, res, next) => {
  try {
    const { rows } = await Accounts.searchText(req.query.q);
    res.json({ accounts: rows });
  } catch (err) {
    next(err);
  }
};
