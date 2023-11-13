const { crypt } = require("utils");
const { Accounts, OrganisationsMembers, Organisations } = require("models");

exports.findByEmail = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.findByEmail(req.query.email);
    return res.json({ account });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [account],
    } = await Accounts.get(res.locals.accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (account.superuser) {
      const { rows: organisations } = await Organisations.getAll();
      account.organisations = organisations.map(({ id, name }) => ({
        id,
        name,
        roles: { isAdmin: true, isExpert: true, isManager: true },
        toJoin: false,
      }));
      return res.json({ account });
    }
    const { rows: organisations } = await OrganisationsMembers.getByAccount(
      account.id
    );
    account.organisations = organisations.map(
      ({ id, name, is_manager, is_admin, is_expert }) => {
        return {
          id,
          name,
          roles: {
            isAdmin: is_admin,
            isManager: is_manager,
            isExpert: is_expert,
          },
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
