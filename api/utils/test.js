const express = require("express");

exports.getApp =
  (path) =>
  (stubs = {}) => {
    delete require.cache[require.resolve(path)];
    Object.entries(stubs).forEach(([depPath, exports]) => {
      require.cache[require.resolve(depPath)] = { exports };
    });
    const router = require(path);
    const app = express();
    if (path.split("/").length === 1) {
      return router(express, app);
    }
    app.use("/", router(express));
    return app;
  };

exports.neutralMiddleware = () => (_req, _res, next) => next();

exports.neutralResponse = (desiredStatus) => (_res, res) =>
  res.sendStatus(desiredStatus);
