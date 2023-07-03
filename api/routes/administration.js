const multer = require("multer");
const upload = multer({ dest: "uploads/users/" });

const {
  linkUsers,
  unlinkUser,
  giveRole,
  withdrawRole,
} = require("../controllers/administration");

module.exports = (router) => {
  router.post("/users", upload.single("users"), linkUsers);
  router.delete("/users/:userId", unlinkUser);
  router.put("/users/:userId/roles/:role", giveRole);
  router.delete("/users/:userId/roles/:role", withdrawRole);
  return router;
};
