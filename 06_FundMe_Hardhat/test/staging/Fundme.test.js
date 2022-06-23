const { ethers, getNamedAccounts, deployments, network } = require("hardhat");
const { assert } = require("chai");
const { localDevelopmentNetwork } = require("../../helper-hardhat-config");

localDevelopmentNetwork.includes(network.name)
  ? describe.skip
  : describe("FundMe", () => {
      let fundMe;
      let deployer;
      const sendValue = ethers.utils.parseEther("1");
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer);
      });
      it("allows people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue });
        await fundMe.withdraw({
          gasLimit: 100000,
        });

        const endingFundMeBalance = await fundMe.provider.getBalance(
          fundMe.address
        );

        assert.equal(endingFundMeBalance.toString(), "0");
      });
    });
