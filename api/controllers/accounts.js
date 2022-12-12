const { Users } = require("../models");

exports.get = async (req, res, next) => {
  try {
    const user = await Users.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.replace = async (req, res, next) => {
  try {
    const user = await Users.replace(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Users.remove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
