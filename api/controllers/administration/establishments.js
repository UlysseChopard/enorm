const { Establishments } = require("../../models");

exports.get = async (req, res, next) => {
  try {
    const { rows: establishments } = await Establishments.getByAdmin(
      res.locals.accountId
    );
    res.json({ establishments });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      rows: [establishment],
    } = await Establishments.create(res.locals.accountId, req.body);
    res.json({ establishment });
  } catch (err) {
    next(err);
  }
};

exports.replace = async (req, res, next) => {
  try {
    const {
      rows: [establishment],
    } = await Establishments.replaceAsAdmin(res.locals.accountId, req.params.id, {
      ...req.body,
    });
    res.json({ establishment });
  } catch (err) {
    next(err);
  }
};

exports.close = async (req, res, next) => {
  try {
    const {
      rows: [establishment],
    } = await Establishments.closeAsAdmin(res.locals.accountId, req.params.id);
    res.json({ establishment });
  } catch (err) {
    next(err);
  }
};
