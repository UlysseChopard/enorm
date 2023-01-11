const { Registrations } = require("../models");

exports.get = async (_req, res, next) => {
  try {
    const { rows: registrations } = await Registrations.getByUserId(res.locals.uuid);
    res.json({ registrations });
  } catch (e) {
    next(e);
  }
};
