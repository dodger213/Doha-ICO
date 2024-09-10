//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;  

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";  
import "@openzeppelin/contracts/access/Ownable.sol";

contract DohaToken is ERC20, Ownable {
    //Declare events
    event TokensMinted(address indexed to, uint256 amount);
    event ICOStarted(uint256 totalTokensForSale);
    event ICOFinished();

    //state variables
    bool public isICORunning;
    uint256 public tokensPerEth = 66; // 66 DOOHA for every 100 wei (0.66 DOOHA per 1 wei)
    uint256 constant ICO_PERCENTAGE = 90; //90% of tokens for ICO, rest for initial cofounders
    uint256 public coFounderShare; //Share for each co-founder

    // Constructor for initializing the token  
    constructor(address[10] memory coFounders) ERC20("Doha", "DOHA") {
        uint256 totalSupply = 300000 * (10 ** decimals()); // 300,000 tokens with decimals applied
        _mint(msg.sender, (totalSupply * ICO_PERCENTAGE) / 100); //Mint 90% for ICO
        coFounderShare = (totalSupply * (100 - ICO_PERCENTAGE)) / 10; //10% distributed among 10 co-founders

        for (uint8 i = 0; i < coFounders.length; i++) {
            _mint(coFounders[i], coFounderShare); //Distributing tokens to 10 co-founders
        }
    }

    function startICO() external onlyOwner {
        require(!isICORunning, "ICO already running");
        isICORunning = true;
        emit ICOStarted((totalSupply() * ICO_PERCENTAGE) / 100);
    }

    function finishICO() external onlyOwner {
        require(isICORunning, "ICO is not running");
        isICORunning = false;
        emit ICOFinished();
    }

    function buyTokens() external payable {
        require(isICORunning, "ICO is not running");
        require(msg.value > 0, "Must send ETH to buy tokens");

        //Calculate token amount using the tokensPerEth
        uint tokensToBuy = (msg.value * tokensPerEth) / 100; //Adjust for scaling factor
        _transfer(owner(), msg.sender, tokensToBuy);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    function burn(uint256 amount) external {
      _burn(msg.sender, amount);
    }
}
