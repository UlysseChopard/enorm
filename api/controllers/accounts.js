const { crypt } = require("utils");
const { Accounts } = require("models");

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.get(res.locals.accountId);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      rows: [prev],
    } = await Accounts.get(res.locals.accountId);
    const hash = req.body.password
      ? crypt.encrypt(req.body.password)
      : prev.hash;
    const {
      rows: [account],
    } = await Accounts.update(res.locals.accountId, {
      ...prev,
      ...req.body,
      hash,
    });
    res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.body.token) {
      return res.status(422).json({ message: "missing token" });
    }
    if (!req.body.password) {
      return res.status(422).json({ message: "missing password" });
    }
    const hash = crypt.encrypt(req.body.password);
    const {
      rows: [account],
    } = await Accounts.create({ ...req.body, hash });
    res.status(201).json({ account });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.remove(res.locals.accountId);
    res.json({ account });
  } catch (err) {
    next(err);
  }
};
