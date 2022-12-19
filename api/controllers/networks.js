const { Networks } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const networks = await Networks.get(req.params.from);
    res.json(networks);
  } catch (err) {
    next(err);
  }
};

exports.add = async (req, res, next) => {
  try {
    const network = await Networks.add(req.params.from, req.params.to);
    res.status(201).json({ network });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const network = await Networks.remove(req.params.from, req.params.to);
    res.json({ network });
  } catch (err) {
    next(err);
  }
};
