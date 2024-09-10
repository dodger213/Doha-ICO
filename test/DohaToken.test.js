const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DohaToken", function () {
  let DohaToken;
  let dohaToken;
  let owner;
  let coFounders;

  beforeEach(async function () {
    coFounders = [
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

    DohaToken = await ethers.getContractFactory("DohaToken");
    [owner] = await ethers.getSigners();
    dohaToken = await DohaToken.deploy(coFounders);
    await dohaToken.deployed();
  });

  describe("Deployment", function () {
    it("Should assign tokens to the owner and distribute to co-founders", async function () {
      const ownerBalance = await dohaToken.balanceOf(owner.address);
      const totalSupply = await dohaToken.totalSupply();
      expect(ownerBalance).to.equal(totalSupply.mul(90).div(100)); // 90% to owner  

      for (let i = 0; i < coFounders.length; i++) {
        const coFounderBalance = await dohaToken.balanceOf(coFounders[i]);
        expect(coFounderBalance).to.equal(totalSupply.mul(10).div(100).div(10)); // 10% total, split among 10  
      }
    });
  });

  describe("ICO functionality", function () {
    beforeEach(async function () {
      await dohaToken.startICO();
    });

    it("Should allow buying tokens", async function () {
      const buyAmount = ethers.utils.parseEther("1"); // Sending 1 ETH  
      await owner.sendTransaction({ to: dohaToken.address, value: buyAmount });

      const addr1Balance = await dohaToken.balanceOf(owner.address);
      expect(addr1Balance).to.be.gt(0); // Expect owner to have some tokens  
    });

    it("Should reject purchasing when ICO is not running", async function () {
      await dohaToken.finishICO();
      await expect(owner.sendTransaction({ to: dohaToken.address, value: ethers.utils.parseEther("1") }))
        .to.be.revertedWith("ICO is not running");
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.utils.parseEther("1000"); // Minting 1000 tokens  
      const recipient = "0xRecipientAddress"; // Address to mint tokens to  

      await dohaToken.mint(recipient, mintAmount);

      const recipientBalance = await dohaToken.balanceOf(recipient);
      expect(recipientBalance).to.equal(mintAmount);
    });

    it("Should not allow non-owner to mint tokens", async function () {
      const nonOwner = (await ethers.getSigners())[1]; // Get another account  
      const mintAmount = ethers.utils.parseEther("1000");

      await expect(dohaToken.connect(nonOwner).mint(nonOwner.address, mintAmount))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Burning", function () {
    it("Should burn tokens", async function () {
      const burnAmount = ethers.utils.parseEther("100");
      await dohaToken.mint(owner.address, burnAmount);
      const initialBalance = await dohaToken.balanceOf(owner.address);
      await dohaToken.burn(burnAmount);
      const finalBalance = await dohaToken.balanceOf(owner.address);
      expect(finalBalance).to.equal(initialBalance.sub(burnAmount));
    });
  });
});