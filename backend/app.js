const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mountRoutes = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

mountRoutes(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err });
});

module.exports = app;
