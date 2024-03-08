const chai = require("chai");
const sinon = require("sinon").createSandbox();
const middlewares = require("middlewares");
const accountsMiddlewares = require("middlewares/accounts");
const accountsControllers = require("controllers/accounts");
const { test } = require("utils");

const expect = chai.expect;

const getApp = test.getApp("routes/accounts");

describe("Routes: accounts", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("GET /:id", () => {
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

    it("should return 200 when authenticated as account owner", async () => {
      const isAccountOwnerStub = sinon
        .stub(accountsMiddlewares, "isAccountOwner")
        .callsFake(test.neutralMiddleware());
      const getStub = sinon
        .stub(accountsControllers, "get")
        .callsFake(test.neutralResponse(200));
      const app = getApp({
        "controllers/accounts": { ...accountsControllers, get: getStub },
      });
      const res = await chai.request(app).get("/fake-id");
      expect(isAccountOwnerStub).to.have.been.calledOnce;
      expect(getStub).to.have.been.calledOnce;
      expect(res).to.have.status(200);
    });
  });

  describe("POST /", () => {
    it("should return 403 when not superuser", async () => {
      const isSuperuserStub = sinon
        .stub(middlewares, "isSuperuser")
        .callsFake(test.neutralResponse(403));
      const app = getApp();
      const res = await chai.request(app).post("/");
      expect(isSuperuserStub).to.have.been.calledOnce;
      expect(res).to.have.status(403);
    });

    it("should return 201 when authenticated as superuser", async () => {
      const isSuperuserStub = sinon
        .stub(middlewares, "isSuperuser")
        .callsFake(test.neutralMiddleware());
      const createStub = sinon
        .stub(accountsControllers, "create")
        .callsFake(test.neutralResponse(201));
      const app = getApp({
        "controllers/accounts": { ...accountsControllers, create: createStub },
      });
      const res = await chai.request(app).post("/");
      expect(isSuperuserStub).to.have.been.calledOnce;
      expect(createStub).to.have.been.calledOnce;
      expect(res).to.have.status(201);
    });
  });

  describe("PATCH /:id", () => {
    it("should return 403 when not account owner", async () => {
      const app = getApp();
      const res = await chai.request(app).patch("/fake-id");
      expect(res).to.have.status(403);
    });

    it("should return 200 when authenticated as account owner", async () => {
      const isAccountOwnerStub = sinon
        .stub(accountsMiddlewares, "isAccountOwner")
        .callsFake(test.neutralMiddleware());
      const updateStub = sinon
        .stub(accountsControllers, "update")
        .callsFake(test.neutralResponse(200));
      const app = getApp({
        "controllers/accounts": { ...accountsControllers, update: updateStub },
      });
      const res = await chai.request(app).patch("/fake-id");
      expect(res).to.have.status(200);
    });
  });

  describe("DELETE /:id", () => {
    it("should return 403 when not superuser", async () => {
      const isSuperuserStub = sinon
        .stub(middlewares, "isSuperuser")
        .callsFake(test.neutralResponse(403));
      const app = getApp();
      const res = await chai.request(app).delete("/fake-id");
      expect(isSuperuserStub).to.have.been.calledOnce;
      expect(res).to.have.status(403);
    });

    it("should return 200 when authenticated as superuser", async () => {
      const isSuperuserStub = sinon
        .stub(middlewares, "isSuperuser")
        .callsFake(test.neutralMiddleware());
      const removeStub = sinon
        .stub(accountsControllers, "remove")
        .callsFake(test.neutralResponse(200));
      const app = getApp({
        "controllers/accounts": { ...accountsControllers, remove: removeStub },
      });
      const res = await chai.request(app).delete("/fake-id");
      expect(isSuperuserStub).to.have.been.calledOnce;
      expect(removeStub).to.have.been.calledOnce;
      expect(res).to.have.status(200);
    });
  });
});
