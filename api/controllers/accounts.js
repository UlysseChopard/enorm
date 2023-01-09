const { crypt } = require("../utils");
const { Accounts } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const { rows: [user] } = await Accounts.getById(req.params.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { rows: [user] } = await Accounts.update(req.params.id, req.body);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "missing property" });
    const hash = await crypt.hash(password);
    const { rows: [user] } = await Accounts.create({ firstname, lastname, email, hash });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const { rows: [user] } = await Accounts.close(req.params.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
