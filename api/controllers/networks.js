const Networks = require("../models/networks");

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
    res.status(201).json(network);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Networks.remove(req.params.from, req.params.to);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
