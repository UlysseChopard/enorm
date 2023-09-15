const { Organisations } = require("models");

exports.replace = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.update(req.params.organisation, {
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
    } = await Organisations.getById(req.params.organisation);
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
    } = await Organisations.closeByAdmin(
      res.locals.userId,
      req.params.organisation
    );
    res.json({ organisation });
  } catch (err) {
    next(err);
  }
};
