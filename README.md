# Doha-ICO
This is a simple ERC20 token and Crowd sale/ICO Smart Contract written in Solidity. The Doha Token meets the ERC20 standard. All of the code has been fully tested and executed in a live environment. This token is free to use as you see fit. I called it Doha just because its a fun word to say. Call it what ever you want. 

### Prerequisites
A good foundation of Solidity or JavaScript will be extremely helpful but not required. A good understanding of Ethereum transactions and EVM is required or ability to use Google and quickly look up and understand needed information should be about all you will need. 

### Deployment

##### Token

Make sure that you have an ERC20 compatible Ethereum wallet. Execute the token code: For MyEtherWallet; past the token code into the remix online compiler. Copy the EVM code and past into the MyEtherWallet execute smart contract. pay the gas price, enjoy your tokens.

##### ICO Contract

You must have the tokens already created for this contract to work. 
Make sure that you have an ERC20 compatible Ethereum wallet. Execute the ICO Contract code: For MyEtherWallet; past the token code into the remix online compiler. Copy the EVM code and past into the MyEtherWallet execute smart contract. pay the gas price. Next you will need to send the required number of tokens as stated in the smart contract variables to the initialize function of the smart contract. The smart contract should be ready to go at this point.
This is a no-burn contract, meaning that all unsold tokens are returned to the owner of the contract at the end of the ICO/Crowdsale.
Only the owner (Wallet that issued the contract) can destroy or terminate the contract.

### Contributing

Fork it and do your thing. Or get in touch with me and we can figure something out. 

### Authors

* **Mitsuru Kudo** - *Initial work* - [dodger213](https://github.com/dodger213)

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.