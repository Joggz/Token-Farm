// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    address public owner;
    DaiToken public daiToken;
    DappToken public dappToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) {
        daiToken =_daiToken;
        dappToken = _dappToken; 
        owner = msg.sender;
    }

    function stakeToken(uint _amount) public {
        daiToken.transferFrom(msg.sender, address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function issueToken() public{
        require(msg.sender == owner);
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0){
                dappToken.transfer(recipient, balance);
            }
        }
    }

    function unstakeToken() public {
        uint _balance = stakingBalance[msg.sender];
        require(_balance > 0, 'balance should be greater than 0') ;
        daiToken.transfer(msg.sender, _balance);

        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }
}