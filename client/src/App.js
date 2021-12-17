import React, { Component, useEffect, useState } from "react";
import DaiToken from "./contracts/DaiToken.json";
import DappToken from "./contracts/DappToken.json";
import TokenFarm from "./contracts/TokenFarm.json";
import "./App.css";
import Navbar from "./components/Navbar";

import { loadWeb3 } from "./Web3helpers";
import Main from "./components/Main";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    account: "0x0",
    daiToken: {},
    dappToken: {},
    tokenFarm: {},
    daiTokenBalance: "0",
    dappTokenBalance: "0",
    stakingBalance: "0",
    loading: true,
  });

  const loadWeb3AndGetBlockChainData = async () => {
    await loadWeb3();
    await loadBlockChainData();
  };

  const loadBlockChainData = async () => {
    const web3 = window.web3;
    let obj = {};
    let [accoun] = await web3.eth.getAccounts();

    obj["account"] = accoun;

    const networkId = await web3.eth.net.getId();
    const daiTokenData = DaiToken.networks[networkId];
    const dappTokenData = DappToken.networks[networkId];
    const tokenFarmData = TokenFarm.networks[networkId];

    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(
        DaiToken.abi,
        daiTokenData.address
      );

      obj["daiToken"] = daiToken;

      let daiTokenBalance = await daiToken.methods.balanceOf(accoun).call();

      obj["daiTokenBalance"] = daiTokenBalance;
    } else {
      window.alert("DaiToken was not deployed to this detected network");
    }

    if (dappTokenData) {
      const dappToken = new web3.eth.Contract(
        DappToken.abi,
        dappTokenData.address
      );

      obj["dappToken"] = dappToken;

      let dappTokenBalance = await dappToken.methods.balanceOf(accoun).call();

      obj["dappTokenBalance"] = dappTokenBalance.toString();
    } else {
      window.alert("DaiToken was not deployed to this detected network");
    }

    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        TokenFarm.abi,
        tokenFarmData.address
      );

      obj["tokenFarm"] = tokenFarm;
      console.log(tokenFarm, tokenFarmData);

      let tokenFarmBalance = await tokenFarm.methods
        .stakingBalance(accoun)
        .call();

      obj["tokenFarmBalance"] = tokenFarmBalance.toString();
    } else {
      window.alert("DaiToken was not deployed to this detected network");
    }

    setState({ ...obj, loading: false });
  };

  console.log(state);
  const stakeTokens = (amount) => {
    setState({ ...state, loading: true });
    state.daiToken.methods
      .approve(state.tokenFarm._address, amount)
      .send({ from: state.account })
      .on("transactionHash", (hash) => {
        state.tokenFarm.methods
          .stakeToken(amount)
          .send({ from: state.account })
          .on("transactionHash", async (hash) => {
            setState({ ...state, loading: false });
            // new web3.eth.getBalance(daiToken.address);
            // let newBalance = await state.daiToken.methods
            //   .balanceOf(state.accoun)
            //   .call();

            // console.log(newBalance);
          });
      });
    // window.location.reload();
  };
  const unStakeTokens = () => {
    setState({ ...state, loading: true });
    state.tokenFarm.methods
      .unstakeToken()
      .send({ from: state.account })
      .on("transactionHash", (hash) => setState({ ...state, loading: false }));
  };

  useEffect(() => {
    loadWeb3AndGetBlockChainData();
  }, []);

  return (
    <div>
      {/* {!state.web3 && <div>Loading Web3, accounts, and contract...</div>} */}

      <Navbar account={state.account} />
      <section>{state.loading && "Loading"}</section>
      <section>
        {!state.loading && (
          <Main
            daiTokenBalance={state.daiTokenBalance}
            dappTokenBalance={state.dappTokenBalance}
            stakingBalance={state.tokenFarmBalance}
            stakeTokens={stakeTokens}
            unstakeTokens={unStakeTokens}
          />
        )}
      </section>
    </div>
  );
};

export default App;
