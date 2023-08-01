const multer = require("multer");
const upload = multer({ dest: "uploads/users/" });
const {
  add,
  unlink,
  get,
  allow,
  disallow,
} = require("../../controllers/administration/users");

module.exports = (router) => {
  router.get("/", get);
  router.patch("/", upload.single("file"), add);
  router.delete("/:userId", unlink);
  router.delete("/:userId/roles/:role", disallow);
  router.put("/:userId/roles/:role", allow);
  return router;
};