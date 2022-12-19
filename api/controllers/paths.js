const { Paths } = require("../models");

exports.getAll = async (req, res, next) => {
  try {
    const paths = await Paths.getAll();
    res.json(paths);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const path = await Paths.getById(req.params.id);
    res.json({ path });
  } catch (err) {
    next(err);
  }
};
