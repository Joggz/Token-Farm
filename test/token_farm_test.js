const TokenFarm = artifacts.require("TokenFarm");
const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");

contract("Token Farm", ([owner, investor]) => {
  // console.log(accounts);
  beforeEach(() => {});

  describe("Mock Dai Deployment", async () => {
    it("should have a name", async () => {
      let daiToken = await DaiToken.new();
      const name = await daiToken.name();
      const balance = await daiToken.balanceOf(owner);

      assert.equal(name, "Mock DAI Token");
      assert.equal(web3.utils.fromWei(balance), 1000000);
    });
  });
});
