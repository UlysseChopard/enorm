const chai = require("chai");
const sinon = require("sinon").createSandbox();
const { Accounts, Organisations } = require("models");

const expect = chai.expect;

describe("Controllers: accounts", () => {
  afterEach(() => {
    delete require.cache[require.resolve("controllers/accounts")];
    sinon.restore();
  });

  describe("get", () => {
    it("should return 404 on missing account in db", async () => {
      const fakeAccount = { email: "email" };
      const accountsModelStub = sinon
        .stub(Accounts, "get")
        .resolves({ rows: [] });
      const { get } = require("controllers/accounts");
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
        locals: { accountId: "fakeAccountId" },
      };
      await get({}, res);
      expect(accountsModelStub).to.have.been.calledOnceWith(
        res.locals.accountId,
      );
      expect(res.status).to.have.been.calledOnceWith(404);
      expect(res.json).to.have.been.calledOnce;
    });

    it("should return account along all roles for all orgaisations for a superuser", async () => {
      const fakeSuperuser = { email: "email", superuser: true };
      const fakeOrgs = [
        { id: "one", name: "One" },
        { id: "two", name: "Two" },
      ];
      const accountsModelStub = sinon
        .stub(Accounts, "get")
        .resolves({ rows: [fakeSuperuser] });
      const organisationsModelStub = sinon
        .stub(Organisations, "getAll")
        .resolves({
          rows: fakeOrgs,
        });
      const res = {
        locals: {
          accountId: "fakeSuperuser",
        },
        json: sinon.spy(),
      };
      const { get } = require("controllers/accounts");
      await get({}, res);
      expect(accountsModelStub).to.have.been.calledOnceWith(
        res.locals.accountId,
      );
      expect(organisationsModelStub).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledOnceWith({
        account: {
          ...fakeSuperuser,
          organisations: [
            {
              id: "one",
              name: "One",
              roles: { isAdmin: true, isExpert: true, isManager: true },
              toJoin: false,
            },
            {
              id: "two",
              name: "Two",
              roles: { isAdmin: true, isExpert: true, isManager: true },
              toJoin: false,
            },
          ],
        },
      });
    });
  });
});
