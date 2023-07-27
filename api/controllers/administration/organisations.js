const { Organisations } = require("../../models");

exports.replace = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.update(req.params.id, {
      name: req.body?.name,
      admin: res.locals.userId,
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
    } = await Organisations.getByAdmin(res.locals.userId);
    if (!organisation) {
      return res.json({ message: "missing organisation" });
    }
    res.json({ organisation });
  } catch (err) {
    next(err);
  }
};
