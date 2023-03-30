const { crypt } = require("../utils");
const { Accounts, Companies } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.getById(res.locals.userId);
    if (!account) return res.status(401).json({ message: "Account not found" });
    res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      rows: [prev],
    } = await Accounts.getById(res.locals.userId);
    const hash = req.body.password
      ? crypt.encrypt(req.body.password)
      : prev.hash;
    const {
      rows: [account],
    } = await Accounts.update(res.locals.userId, {
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
    const { email, password, company } = req.body;
    if (!password || !email || !company) {
      return res.status(400).json({ message: "Missing property" });
    }
    const hash = crypt.encrypt(password);
    const {
      rows: [account],
    } = await Accounts.create({ ...req.body, hash });
    await Companies.create({ name: company, creator: account.id });
    res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.close(res.locals.userId);
    res.json({ account });
  } catch (err) {
    next(err);
  }
};
