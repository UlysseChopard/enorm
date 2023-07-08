const { createReadStream } = require("fs");
const { unlink } = require("fs/promises");
const csvParser = require("csv-parser");
const { Societies, Users } = require("../models");

exports.linkUsers = async (req, res, next) => {
  try {
    let error = false;
    const separator = req.query?.separator ?? ",";
    const emailColumn = req.query?.["email-column"] ?? "email";
    const {
      rows: [society],
    } = await Societies.getByAdmin(res.locals.userId);
    createReadStream(req.file.path, {
      encoding: "utf-8",
      emitClose: true,
    })
      .pipe(
        csvParser({
          mapHeaders: ({ header }) => header.toLowerCase(),
          separator,
          skipLines: 0,
          strict: false,
        })
      )
      .on("headers", (headers) => {
        if (!headers.includes(emailColumn)) {
          error = true;
          res.status(422).json({ message: "Missing email header" });
        }
      })
      .on("error", console.error)
      .on("data", async (row) => {
        await Users.create(society.id, row[emailColumn]);
      })
      .on("close", async () => {
        await unlink(req.file.path);
        if (!error) {
          res.sendStatus(204);
        }
      });
  } catch (err) {
    next(err);
  }
};

exports.updateSociety = async (req, res, next) => {
  try {
    const {
      rows: [society],
    } = await Societies.update(res.locals.userId, {
      name: req.body?.name,
      id: req.params.id,
    });
    res.status(201).json({ society });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [society],
    } = await Societies.getByAdmin(res.locals.userId);
    const { rows: users } = await Users.getBySociety(society.id);
    res.json({ society, users });
  } catch (err) {
    next(err);
  }
};

exports.unlinkUser = (req, res, next) => {};

exports.giveRole = (req, res, next) => {};

exports.withdrawRole = (req, res, next) => {};
