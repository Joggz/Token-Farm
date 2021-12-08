import React from "react";

const Main = ({
  daiTokenBalance,
  dappTokenBalance,
  stakingBalance,
  stakeTokens,
  unStakeTokens,
}) => {
  return (
    <div className="cotent mt-3">
      <div>Main content</div>

      <table className="table table-borderless text-muted text-center">
        <thead>
          <tr>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{window.web3.utils.fromWei(stakingBalance, "Ether")} mDAI</td>
            <td>{window.web3.utils.fromWei(dappTokenBalance, "Ether")} DAPP</td>
          </tr>
        </tbody>
      </table>
      <div className="mb-4 d-flex justify-content-center">
        <section className="card w-50">
          <div className="card-body">Token Farm .... Lock in some tokens</div>
        </section>
      </div>
    </div>
  );
};

export default Main;
