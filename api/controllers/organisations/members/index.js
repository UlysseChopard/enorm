const { createReadStream } = require("fs");
const { pipeline } = require("stream/promises");
const { unlink } = require("fs/promises");
const csvParser = require("csv-parser");
const { regex } = require("utils");
const {
  Organisations,
  OrganisationsMembers,
  Tokens,
  Accounts,
} = require("models");

exports.add = async (req, res, next) => {
  try {
    const noHeader = req.query?.["no-header"];
    const emailColumn = noHeader
      ? 0
      : req.query?.["email-column"]?.toLowerCase();
    const received = [];
    const {
      rows: [organisation],
    } = await Organisations.getById(req.params.organisation);
    const ac = new AbortController();
    const stream = createReadStream(req.file.path, {
      encoding: "utf-8",
      emitClose: true,
    }).on("close", async () => {
      await unlink(req.file.path);
    });
    const csv = csvParser({
      headers: !noHeader,
      mapHeaders: ({ header }) =>
        header.toLowerCase() === emailColumn ? emailColumn : null,
      separator: req.query?.separator ?? ",",
      skipLines: 0,
      strict: false,
    })
      .on("headers", (headers) => {
        if (!headers.includes(emailColumn)) {
          ac.abort(`Missing ${emailColumn} header`);
        }
      })
      .on("data", (row) => {
        const email = row[emailColumn];
        if (!regex.isEmail(email)) {
          ac.abort(`${email} is not a valid email`);
          return;
        }
        received.push(email.toLowerCase());
      });
    try {
      await pipeline(stream, csv, { signal: ac.signal });
    } catch (err) {
      if (ac.signal.aborted) {
        if (ac.signal.reason === `Missing ${emailColumn} header`) {
          return res.status(422).json({ message: "Missing email header" });
        }
        return res.status(400).json({ message: ac.signal.reason });
      }
      throw err;
    }
    if (!received.length) return res.json({ received });
    const { rows: accounts } = await Accounts.createMany(received);
    console.log(organisation, accounts);
    const { rows: members } = await OrganisationsMembers.createMany(
      organisation.id,
      accounts.map(({ id }) => id)
    );
    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() +
        parseInt(process.env.TOKEN_NEW_MEMBER_EXPIRATION_DELAY, 10)
    );
    const tokens = await Promise.all(
      members.map(async ({ id }) => ({
        organisationMember: id,
        id: await Tokens.getOne(),
        expiresAt,
      }))
    );
    await Tokens.createMany(tokens);
    // for (const invited of inserted) {
    //   await mail.send({
    //     recipient: invited.email,
    //     subject: `You have been invitated to join ${organisation.name} on Enorm`,
    //     text: `Please click here to join ${organisation.name} on Enorm: ${process.env.BASE_URL}. Your token is ${invited.token}`,
    //   });
    // }
    res.status(201).json({ members });
  } catch (err) {
    next(err);
  }
};

exports.addOne = async (req, res, next) => {
  try {
    await Accounts.create({ email: req.body.email });
    const {
      rows: [account],
    } = await Accounts.getByEmail(req.body.email);
    const {
      rows: [organisationMember],
    } = await OrganisationsMembers.create({
      organisation: req.params.organisation,
      account: account.id,
    });
    const id = await Tokens.getOne();
    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() +
        parseInt(process.env.TOKEN_NEW_MEMBER_EXPIRATION_DELAY)
    );
    await Tokens.create({
      id,
      organisationMember: organisationMember.id,
      expiresAt,
    });
    organisationMember.token = id;
    res.json({ member: organisationMember });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getById(req.params.organisation);
    if (!organisation) {
      return res.status(404).json({ message: "Missing organisation" });
    }

    const { rows } = await OrganisationsMembers.getByOrganisation(
      organisation.id,
      req.query
    );
    const members = Object.values(
      rows.reduce((acc, user) => {
        if (!acc[user.id]) {
          acc[user.id] = user;
          acc[user.id].establishments = user.establishment
            ? [user.establishment]
            : [];
          delete acc[user.id].establishment;
          return acc;
        }
        acc[user.id].establishments.push(user.establishment);
        return acc;
      }, {})
    );
    res.json({ members });
  } catch (err) {
    next(err);
  }
};

exports.unlink = async (req, res, next) => {
  try {
    const {
      rows: [organisation],
    } = await Organisations.getById(req.params.organisation);
    if (!organisation) {
      return res.status(404).json({ message: "Missing organisation" });
    }
    const {
      rows: [member],
    } = await OrganisationsMembers.deleteById(req.params.member);
    res.json({ member });
  } catch (err) {
    next(err);
  }
};
