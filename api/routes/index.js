const expert = require("./expert");
// const manager = require("./manager");

module.exports = (app) => {
  app.use("/experts", expert);
  //   app.use("/manager", manager);
};
