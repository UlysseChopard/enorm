const { crypt } = require("utils");
const { Accounts, OrganisationsMembers } = require("models");

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.get(res.locals.accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    const { rows: organisations } = await OrganisationsMembers.getByEmail(
      account.email
    );
    account.organisations = organisations.map(
      ({ id, name, account, is_manager, is_admin, is_expert }) => {
        const roles = [];
        if (is_admin) roles.push("admin");
        if (is_manager) roles.push("manager");
        if (is_expert) roles.push("expert");
        return {
          id,
          name,
          roles,
          toJoin: !account,
        };
      }
    );
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
    if (!hash) {
      return res.status(422).json({ message: "missing password" });
    }
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
    const hash = req.body.password ? crypt.encrypt(req.body.password) : null;
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
