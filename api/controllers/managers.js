const log = require("../utils/logs");
const Experts = require("../models/experts");
const Users = require("../models/users");
const { sendInvitation } = require("../utils/emails");
const busboy = require("busboy");
const { parse } = require("csv-parse");

const save = async (email, manager) => {
  if (!email) return;
  const {
    rows: [user],
  } = await Users.getByEmail(email);
  if (!user) {
    await sendInvitation({ to: email, link: process.env.WEB_URL });
  }
  await Experts.save({ manager, email, user: user?.id, readOnly: false });
};

exports.declare = async (req, res, next) => {
  try {
    await Promise.all(req.body.emails.map((email) => save(email, req.user.id)));
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.upload = async (req, res, next) => {
  try {
    const bb = busboy({ headers: req.headers });
    bb.on("file", (name, file, info) => {
      log.info("Experts upload", { name, info });
      file
        .pipe(parse())
        .on("data", ([email]) => save(email, req.user.id))
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

exports.del = async (req, res, next) => {
  try {
    const { email } = req.body;
    await Experts.deleteByEmailAndManager({ email, manager: req.user.id });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
