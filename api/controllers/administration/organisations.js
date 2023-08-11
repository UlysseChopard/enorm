const { Organisations } = require("../../models");

exports.replace = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.update(req.params.id, {
      name: req.body?.name,
      admin: res.locals.accountId,
    });
    res.status(201).json({ organisation });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getByAdmin(res.locals.accountId);
    if (!organisation) {
      return res.json({ message: "missing organisation" });
    }
    res.json({ organisation });
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.closeByAdmin(res.locals.userId, req.params.id);
    res.json({ organisation });
  } catch (err) {
    next(err);
  }
};
