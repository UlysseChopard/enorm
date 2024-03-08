const express = require("express");
const chai = require("chai");
const chaiHTTP = require("chai-http");
const sinon = require("sinon").createSandbox();
const middlewares = require("middlewares");
const accountsMiddlewares = require("middlewares/accounts");

const expect = chai.expect;

chai.use(chaiHTTP);

const getApp = () => {
  delete require.cache[require.resolve("routes/accounts")];
  const accounts = require("routes/accounts");
  const app = express();
  app.use("/", accounts(express));
  return app;
};

const neutralMiddleware = (_req, _res, next) => {
  console.log("NEUTRAL");
  next();
};

afterEach(() => {
  sinon.restore();
});

describe("Test /accounts", () => {
  describe("Test GET /:id", () => {
    it("should return 404 when no account id", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/");
      expect(res).to.have.status(404);
    });

    it("should return 403 when not account owner", async () => {
      const app = getApp();
      const res = await chai.request(app).get("/fake-id");
      expect(res).to.have.status(403);
    });

    it("should call get when account owner", async () => {
      const stub = sinon
        .stub(accountsMiddlewares, "isAccountOwner")
        .callsFake((_req, res) => res.sendStatus(204));
      const app = getApp();
      const res = await chai.request(app).get("/fake-id");
      sinon.assert.calledOnce(stub);
      expect(res).to.have.status(204);
    });
  });
});
