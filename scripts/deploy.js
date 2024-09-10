const { ethers } = require("hardhat");  
require("dotenv").config();  

async function main() {  
    // Array of co-founder addresses (replace with actual addresses)  
    const coFounders = [  
        "0xAddress1",  
        "0xAddress2",  
        "0xAddress3",  
        "0xAddress4",  
        "0xAddress5",  
        "0xAddress6",  
        "0xAddress7",  
        "0xAddress8",  
        "0xAddress9",  
        "0xAddress10",  
    ];  

    const DohaToken = await ethers.getContractFactory("DohaToken");  
    console.log("Deploying DohaToken...");  
    const dohaToken = await DohaToken.deploy(coFounders);  
    await dohaToken.deployed();  

    console.log(`DohaToken deployed to: ${dohaToken.address}`);  
}  

main()  
    .then(() => process.exit(0))  
    .catch((error) => {  
        console.error(error);  
        process.exit(1);  
    });