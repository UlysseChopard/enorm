const { Accounts } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const user = await Accounts.getById(req.params.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.set = async (req, res, next) => {
  try {
    const user = await Accounts.set(req.params.id, req.body);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const user = await Accounts.remove(req.params.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
