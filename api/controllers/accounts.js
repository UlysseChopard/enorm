const { crypt } = require("../utils");
const { Accounts } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const { rows: [user] } = await Accounts.getById(res.locals.userId);
    if (!user) return res.status(401).json({ message: "user not found" });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { rows: [user] } = await Accounts.update(res.locals.userId, req.body);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) return res.status(400).json({ message: "missing property" });
    const hash = await crypt.hash(password);
    delete req.password;
    const { rows: [user] } = await Accounts.create({ ...req.body, hash });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const { rows: [user] } = await Accounts.close(res.locals.userId);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
