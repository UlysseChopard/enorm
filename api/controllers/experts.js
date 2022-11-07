const log = require("../utils/logs");
const Experts = require("../models/experts");
const Users = require("../models/users");
const { sendInvitation } = require("../utils/emails");
const busboy = require("busboy");
const { parse } = require("csv-parse");

exports.declareExpert = async (req, res, next) => {
  try {
    const { email } = req.body;
    const {
      rows: [user],
    } = await Users.getByEmail(email);
    await Experts.save({ manager: req.user.id, email, user: user?.id });
    if (!user) {
      await sendInvitation({ to: email, link: process.env.WEB_URL });
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.uploadExperts = async (req, res, next) => {
  try {
    const bb = busboy({ headers: req.headers });
    bb.on("file", (name, file, info) => {
      // const { filename, encoding, mimeType } = info;
      log.info("Experts upload", { name, info });
      file
        .pipe(parse())
        .on("data", console.log)
        .on("end", () => {});
    });
    bb.on("close", () => {
      log.info("Done parsing");
      res.writeHead(200, { Connection: "close" });
      res.end();
    });
    req.pipe(bb);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { rows: experts } = await Experts.get(req.user.id);
    res.json({ experts });
  } catch (err) {
    next(err);
  }
};

exports.deleteExpert = async (req, res, next) => {
  try {
    const { email } = req.body;
    await Experts.deleteByEmailAndManager({ email, manager: req.user.id });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
