const expert = require("./expert");
const manager = require("./manager");

module.exports = (app) => {
  app.use("/expert", expert);
  app.use("/manager", manager);
};
