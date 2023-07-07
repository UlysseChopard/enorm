const multer = require("multer");
const upload = multer({ dest: "uploads/users/" });

const {
  get,
  giveRole,
  linkUsers,
  unlinkUser,
  updateSociety,
  withdrawRole,
} = require("../controllers/administration");

module.exports = (router) => {
  router.get("/", get);
  router.post("/users", upload.single("users"), linkUsers);
  router.delete("/users/:userId", unlinkUser);
  router.put("/users/:userId/roles/:role", giveRole);
  router.delete("/users/:userId/roles/:role", withdrawRole);
  router.put("/society/:id", updateSociety);
  return router;
};
