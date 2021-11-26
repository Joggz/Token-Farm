// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MockDai.sol";
import "./MockDappToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DaiToken public daiToken;
    DappToken public dappToken;

    constructor(DappToken _dappToken, DaiToken _daiToken) {
        daiToken =_daiToken;
        dappToken = _dappToken; 
    }
}