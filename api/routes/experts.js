const router = require("express").Router();
const { create } = require("../controllers/experts");

router.post("/experts", create);
