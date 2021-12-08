import React, { Component, useState } from "react";
import dai from "../components/dai.png";

const Main = ({
  daiTokenBalance,
  dappTokenBalance,
  stakingBalance,
  stakeTokens,
  unstakeTokens,
}) => {
  const [amount, setAmount] = useState(0);

  const shouldStake = (event) => {
    event.preventDefault();

    amount = window.web3.utils.toWei(amount, "Ether");
    // stakeTokens(amount);
    alert(amount);
  };
  const updateAmount = (e) => {
    setAmount(e.target.value);
    // setAmount((prev) => e.target.value);
  };

  return (
    <div className="cotent mt-5">
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
      <div className="mb-4  mt-5 d-flex justify-content-center">
        <section className="card shadow-lg rounded w-50">
          <div className="card-body p-4">
            <form className="mb-3" onSubmit={(event) => shouldStake(event)}>
              <div>
                <label className="float-left py-2">
                  <b>Stake Tokens</b>
                </label>
                <span className="float-right text-muted ">
                  &nbsp;&nbsp; Balance:{" "}
                  {window.web3.utils.fromWei(daiTokenBalance, "Ether")}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="number"
                  onChange={(e) => updateAmount(e)}
                  className="form-control form-control-lg"
                  placeholder="1000"
                  required
                />
                <button className="input-group-append btn-primary">
                  <div className="input-group-text">
                    <img src={dai} height="32" alt="" />
                    &nbsp;&nbsp;&nbsp; mDAI
                  </div>
                </button>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                STAKE!
              </button>
            </form>
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                unstakeTokens();
              }}
            >
              UN-STAKE...
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;
