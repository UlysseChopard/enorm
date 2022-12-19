const { Wgs } = require("../models");

exports.getAll = async (_req, res, next) => {
  try {
    const wgs  = await Wgs.getAll();
    res.json(wgs);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const wg = await Wgs.create(req.wg);
    res.status(201).json({ wg });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const wg = await Wgs.update(req.params.id, req.body.wg);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const wg = Wgs.remove(req.params.id);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const wg = await Wgs.get(req.params.id);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};

exports.addMembers = async (req, res, next) => {
  try {
    const wg = Wgs.addMembers(req.params.id, req.body.ids);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};

exports.removeMembers = async (req, res, next) => {
  try {
    const wg = Wgs.removeMembers(req.params.id, req.body.ids);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};

exports.addAdmins = async (req, res, next) => {
  try {
    const wg = Wgs.addAdmins(req.params.id, req.body.ids);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};


exports.removeAdmins = async (req, res, next) => {
  try {
    const wg = Wgs.removeAdmins(req.params.id, req.body.ids);
    res.json({ wg });
  } catch (err) {
    next(err);
  }
};
