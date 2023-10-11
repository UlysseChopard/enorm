const crypto = require("crypto");
const { SECRET_KEY, SECRET_IV, ENCRYPTION_METHOD } = process.env;

if (!SECRET_KEY || !SECRET_IV || !ENCRYPTION_METHOD) {
  throw new Error("secretKey, secretIV, and encryptionMethod are required");
}

const key = crypto
  .createHash("sha256")
  .update(SECRET_KEY)
  .digest("hex")
  .substring(0, 32);

const encryptionIV = crypto
  .createHash("sha256")
  .update(SECRET_IV)
  .digest("hex")
  .substring(0, 16);

exports.encrypt = (data) => {
  const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, encryptionIV);
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex")
  ).toString("base64");
};

exports.decrypt = (encryptedData) => {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_METHOD,
    key,
    encryptionIV
  );
  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  );
};

exports.getIntToken = (len) => {
  const baseToken = crypto.randomInt(0, 10 ** len).toString();
  return baseToken.padStart(len, "0");
};
