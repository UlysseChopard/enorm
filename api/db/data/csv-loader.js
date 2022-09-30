const fs = require("fs");
const path = require("path");

const { parse } = require("csv-parse");
const format = require("pg-format");

const db = require("../index");
const countryCodes = require("./country_codes.json");

const formatRow = (record) => {
  let {
    name,
    members,
    attached_to,
    address_1,
    address_2,
    postcode,
    city,
    country_code,
    phone_no,
    fax_no,
    misc,
    status,
  } = record;
  country_code = countryCodes[country_code.toLowerCase()];
  if (members === "VRAI") members = 1;
  else members = 0;
  attached_to = attached_to.split(" = ")[0];
  phone_no = phone_no.replace(/\s/g, "");
  if (country_code === "FR" && phone_no?.charAt(0) === "0") {
    phone_no = `+33${phone_no.slice(1)}`;
  }

  return [
    name,
    members,
    attached_to,
    status,
    address_1,
    address_2,
    postcode,
    city,
    country_code,
    phone_no,
    fax_no,
    misc,
  ];
};

const parser = parse({
  delimiter: ";",
  trim: true,
  encoding: "latin1",
  columns: true,
});

parser.on("readable", async () => {
  let record;
  while ((record = parser.read()) !== null) {
    const formatedRecord = formatRow(record);
    const query = format(
      "INSERT INTO organisations (name, members, attached_to, status, address_1, address_2, postcode, city, country_code, phone_no, fax_no, misc) VALUES (%L)",
      formatedRecord
    );
    try {
      await db.query(query);
    } catch (err) {
      console.error(err.message);
    }
  }
});

parser.on("error", console.error);

parser.on("end", parser.end);

fs.createReadStream(path.join(__dirname, "organismes.csv")).pipe(parser);
