const TokenFarm = artifacts.require("TokenFarm");
const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");

const tokens = (supply) => {
  return web3.utils.toWei(supply);
};

contract("Token Farm", ([owner, investor]) => {
  // console.log(accounts);
  let daiToken, dappToken, tokenFarm;

  before(async () => {
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

    await dappToken.transfer(tokenFarm.address, tokens("1000000"));

    await daiToken.transfer(investor, tokens("100"), { from: owner });
  });

  describe("Mock Dai Deployment", async () => {
    it("should have a name", async () => {
      const name = await daiToken.name();
      const balance = await daiToken.balanceOf(owner);

      assert.equal(name, "Mock DAI Token");
      // assert.equal(web3.utils.fromWei(balance), "1000000");
    });

    describe("Mock DApp Deployment", async () => {
      it("should have correct contract name ", async () => {
        let name = await dappToken.name();
        let symbol = await dappToken.symbol();
        assert.equal(name, "Mock DAP Token");
        assert.equal(symbol, "mDAPP");
      });
    });

    describe("Farm Tokens", async () => {
      it("should reward investor for staking mDai Token", async () => {
        let result;
        // check investor balance before Staking
        result = await daiToken.balanceOf(investor);
        assert.equal(
          result,
          tokens("100"),
          "investor mDai Balance should be correct before Staking"
        );

        // stake daiToken
        await daiToken.approve(tokenFarm.address, tokens("100"), {
          from: investor,
        });
        await tokenFarm.stakeToken(tokens("100"), { from: investor });

        await tokenFarm.issueToken({ from: owner });
        result = await dappToken.balanceOf(investor);

        assert.equal(result, tokens("100"), "Token sent to investor");
        await tokenFarm.issueToken({ from: investor }).should.be.rejected;
      });
    });
  });
});
