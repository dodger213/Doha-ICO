//SPDX-License-Identifier:MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DohaToken.sol";

contract DohaICO is Ownable {
    DohaToken public token;
    bool public isICORunning ;
    uint256 public tokensPerEth = 66; // 66 DOOHA for every 100 wei (0.66 DOOHA per 1 wei)

    constructor(DohaToken _token) {
        token = _token;
    }

    function startICO() external onlyOwner {
        require(!isICORunning, "ICO already running");
        isICORunning = true;
    }

    function finishICO() external onlyOwner {
        require(isICORunning, "ICO is not running");
        isICORunning = false;
    }

    function buyTokens() external payable {
        require(isICORunning, "ICO is not running");
        require(msg.value > 0, "Must send ETH to buy tokens.");

        uint256 tokensToBuy = (msg.value * tokensPerEth) / 100;
        token.transfer(msg.sender, tokensToBuy);
    }
}
