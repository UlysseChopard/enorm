const chai = require("chai");
const sinon = require("sinon").createSandbox();
const { Accounts } = require("models");

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
  });
});
