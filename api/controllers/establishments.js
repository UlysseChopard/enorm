const { Establishments } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const { rows: establishments } = await Establishments.getByAdmin(
      res.locals.userId
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
    } = await Establishments.create(res.locals.userId, req.body);
    res.json({ establishment });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      rows: [establishment],
    } = await Establishments.replaceAsAdmin(res.locals.userId, req.params.id, {
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
    } = await Establishments.closeAsAdmin(res.locals.userId, req.params.id);
    res.json({ establishment });
  } catch (err) {
    next(err);
  }
};
