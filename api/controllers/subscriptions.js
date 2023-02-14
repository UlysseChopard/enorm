const { Accounts } = require("../models");

exports.search = async (req, res, next) => {
  try {
    
    const { rows } = await Accounts.getByText(req.query.text);
    
    res.json({ accounts: rows });
  } catch (err) {
    next(err);
  }
};
