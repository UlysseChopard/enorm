const chai = require("chai");
const sinon = require("sinon").createSandbox();
const { Accounts, Organisations, OrganisationsMembers } = require("models");

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

    it("should return account along all roles for all organizations for a superuser", async () => {
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

    it("should return account along roles for organisations", async () => {
      const fakeUser = { id: "id", email: "email" };
      const fakeOrgs = [
        {
          organisation: "one",
          name: "One",
          is_admin: false,
          is_manager: true,
          is_expert: false,
        },
        {
          organisation: "two",
          name: "Two",
          is_admin: true,
          is_manager: false,
          is_expert: true,
        },
        {
          organisation: "three",
          name: "Three",
          is_admin: false,
          is_manager: false,
          is_expert: false,
        },
      ];
      const accountsModelStub = sinon
        .stub(Accounts, "get")
        .resolves({ rows: [fakeUser] });
      const organisationsMembersModelStub = sinon
        .stub(OrganisationsMembers, "getByAccount")
        .resolves({ rows: fakeOrgs });
      const res = {
        locals: {
          accountId: "accountId",
        },
        json: sinon.spy(),
      };
      const { get } = require("controllers/accounts");
      await get({}, res);
      expect(accountsModelStub).to.have.been.calledOnceWith(
        res.locals.accountId,
      );
      expect(organisationsMembersModelStub).to.have.been.calledOnceWith(
        fakeUser.id,
      );
      expect(res.json).to.have.been.calledOnce;
      expect(res.json.firstCall.args[0]).to.deep.equal({
        account: {
          ...fakeUser,
          organisations: [
            {
              id: "one",
              name: "One",
              roles: {
                isAdmin: false,
                isManager: true,
                isExpert: false,
              },
            },
            {
              id: "two",
              name: "Two",
              roles: {
                isAdmin: true,
                isManager: false,
                isExpert: true,
              },
            },
            {
              id: "three",
              name: "Three",
              roles: {
                isAdmin: false,
                isManager: false,
                isExpert: false,
              },
            },
          ],
        },
      });
    });
  });
});
