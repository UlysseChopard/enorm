const { createReadStream } = require("fs");

// const { Users, Roles } = require("../models");

exports.linkUsers = async (req, res, next) => {
  try {
    console.log(req.file);
    createReadStream(req.file.path, { encoding: "utf-8" })
      .on("data", console.log)
      .on("error", console.error);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.unlinkUser = (req, res, next) => {};

exports.giveRole = (req, res, next) => {};

exports.withdrawRole = (req, res, next) => {};
