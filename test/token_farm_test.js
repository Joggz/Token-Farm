const { default: Web3 } = require("web3");

const TokenFarm = artifacts.require("TokenFarm");
const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");

const tokens = (supply) => {
  return Web3.utils.toWei(supply);
};

contract("Token Farm", ([owner, investor]) => {
  // console.log(accounts);
  let daiToken, dappToken, tokenFarm;

  before(() => {
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken, daiToken);

    await dappToken.transfer(tokenFarm.address, tokens(1000000));

    await daiToken.transfer(investor, tokens(100), { from: owner });
  });

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
