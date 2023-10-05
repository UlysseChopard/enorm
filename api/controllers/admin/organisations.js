const { Organisations } = require("models");

exports.get = async (req, res, next) => {
  try {
    const { rows: organisations } = await Organisations.get();
    res.json({ organisations });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    if (!req.body.account) {
      return res.status(422).json({ message: "missing account in body" });
    }
    const {
      rows: [organisation],
    } = await Organisations.create(req.body.account);
    if (!organisation) {
      return res
        .status(500)
        .json({ message: "an error occurred while creating organisation" });
    }
    res.status(201).json({ organisation });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.remove(req.params.id);
    res.json({ organisation });
  } catch (err) {
    next(err);
  }
};
