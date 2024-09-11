const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DoohaICO", function () {
  let DoohaToken;
  let DoohaICO;
  let doohaToken;
  let doohaICO;
  let owner;

  beforeEach(async function () {
    DoohaToken = await ethers.getContractFactory("DoohaToken");
    [owner] = await ethers.getSigners();

    // Deploying the token first  
    const coFounders = [owner.address, owner.address, owner.address, owner.address, owner.address, owner.address, owner.address, owner.address, owner.address, owner.address];
    doohaToken = await DoohaToken.deploy(coFounders);
    await doohaToken.deployed();

    // Deploying the ICO with the token  
    DoohaICO = await ethers.getContractFactory("DoohaICO");
    doohaICO = await DoohaICO.deploy(doohaToken.address);
    await doohaICO.deployed();
  });

  it("Should start and finish ICO", async function () {
    await doohaICO.startICO();
    expect(await doohaICO.isICORunning()).to.be.true;

    await doohaICO.finishICO();
    expect(await doohaICO.isICORunning()).to.be.false;
  });
});