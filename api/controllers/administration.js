const { createReadStream } = require("fs");
const { unlink } = require("fs/promises");
const csvParser = require("csv-parser");

// const { Users, Roles } = require("../models");

exports.linkUsers = async (req, res, next) => {
  try {
    let error = false;
    createReadStream(req.file.path, {
      encoding: "utf-8",
      emitClose: true,
    })
      .pipe(
        csvParser({
          strict: false,
          separator: req.query?.separator ?? "|",
          mapHeaders: ({ header }) => header.toLowerCase(),
          skipLines: 0,
        })
      )
      .on("headers", (headers) => {
        if (!headers.includes("email_txt")) {
          error = true;
          res.status(422).json({ message: "Missing email header" });
        }
      })
      .on("error", console.error)
      .on("data", (data) => {
        console.log(data.email_txt);
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

exports.unlinkUser = (req, res, next) => {};

exports.giveRole = (req, res, next) => {};

exports.withdrawRole = (req, res, next) => {};
