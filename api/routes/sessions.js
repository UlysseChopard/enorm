const { open, close } = require("../middlewares/sessions");

module.exports = (router) => {
  router.put("/", open);
  router.delete("/:id", close);
};
