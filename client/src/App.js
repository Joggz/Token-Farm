import React, { Component, useEffect, useState } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import TokenFarmContract from "./contracts/TokenFarm.json";
import getWeb3 from "./getWeb3";
import DaiToken from "./contracts/DaiToken.json";
import DappToken from "./contracts/DappToken.json";
import TokenFarm from "./contracts/TokenFarm.json";
import "./App.css";
import Navbar from "./components/Navbar";
import View from "./views";
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

      obj["daiToken"] = daiTokenData;

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

      obj["dappToken"] = dappTokenData;

      let dappTokenBalance = await dappToken.methods.balanceOf(accoun).call();

      obj["dappTokenBalance"] = dappTokenBalance.toString();
    } else {
      window.alert("DaiToken was not deployed to this detected network");
    }

    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        DappToken.abi,
        dappTokenData.address
      );

      obj["tokenFarm"] = tokenFarmData;

      let tokenFarmBalance = await tokenFarm.methods.balanceOf(accoun).call();

      obj["tokenFarmBalance"] = tokenFarmBalance.toString();
    } else {
      window.alert("DaiToken was not deployed to this detected network");
    }

    setState({ ...obj, loading: false });
  };

  const stakeTokens = () => {};
  const unStakeTokens = () => {};

  useEffect(() => {
    loadWeb3AndGetBlockChainData();
  }, []);
  console.log(state);
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
            unStakeTokens={unStakeTokens}
          />
        )}
      </section>
    </div>
  );
};

export default App;
