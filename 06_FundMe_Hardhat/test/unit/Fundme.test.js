const { ethers, getNamedAccounts, deployments, network } = require("hardhat");
const { expect, assert } = require("chai");
const { localDevelopmentNetwork } = require("../../helper-hardhat-config");

!localDevelopmentNetwork.includes(network.name)
  ? describe.skip
  : describe("FundMe", () => {
      let fundmeContract;
      let mockV3AggregatorContract;
      let deployer;
      const sendValue = ethers.utils.parseEther("1");
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;

        await deployments.fixture(["all"]);
        mockV3AggregatorContract = await ethers.getContract(
          "MockV3Aggregator",
          deployer
        );
        fundmeContract = await ethers.getContract("FundMe", deployer);
      });

      describe("constructor", () => {
        it("sets the aggregator addresses correctly", async () => {
          const response = await fundmeContract.getPriceFeed();
          assert.equal(response, mockV3AggregatorContract.address);
        });
        it("sets the owner of the contract correctly", async () => {
          const response = await fundmeContract.getOwner();
          assert.equal(response, deployer);
        });
      });

      describe("fund", () => {
        it("Check the minimum send amount", async () => {
          expect(fundmeContract.fund()).to.be.revertedWith(
            "FundMe__Fund__NotEnoughUSD()"
          );
        });
        it("Update amount send", async () => {
          await fundmeContract.fund({ value: sendValue });
          const response = await fundmeContract.getAddressToAmountFunded(
            deployer
          );
          assert.equal(response.toString(), sendValue.toString());
        });
        it("Update the Funder", async () => {
          await fundmeContract.fund({ value: sendValue });
          const response = await fundmeContract.getFunder(0);
          assert.equal(response.toString(), deployer);
        });
      });

      describe("withdraw", () => {
        beforeEach(async () => {
          await fundmeContract.fund({ value: sendValue });
        });
        it("Withdraw Fund from a single Funder", async () => {
          let deployerInitialBalance = await fundmeContract.provider.getBalance(
            deployer
          );
          let contractInitialBalance = await fundmeContract.provider.getBalance(
            fundmeContract.address
          );

          const transactionResponse = await fundmeContract.withdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          let contractEndBalance = await fundmeContract.provider.getBalance(
            fundmeContract.address
          );
          let deployerEndBalance = await fundmeContract.provider.getBalance(
            deployer
          );
          const { gasUsed, effectiveGasPrice } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasPrice);

          assert.equal(contractEndBalance.toString(), 0);
          assert.equal(
            deployerInitialBalance.add(contractInitialBalance).toString(),
            deployerEndBalance.add(gasCost).toString()
          );
        });
        it("Withdraw Fund from a Multiple Funder", async () => {
          const accounts = await ethers.getSigners();
          for (i = 1; i < 6; i++) {
            const fundMeConnectedContract = await fundmeContract.connect(
              accounts[i]
            );
            await fundMeConnectedContract.fund({ value: sendValue });
          }
          let deployerInitialBalance = await fundmeContract.provider.getBalance(
            deployer
          );
          let contractInitialBalance = await fundmeContract.provider.getBalance(
            fundmeContract.address
          );

          const transactionResponse = await fundmeContract.withdraw();
          const transactionReceipt = await transactionResponse.wait(1);
          let contractEndBalance = await fundmeContract.provider.getBalance(
            fundmeContract.address
          );
          let deployerEndBalance = await fundmeContract.provider.getBalance(
            deployer
          );
          const { gasUsed, effectiveGasPrice } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasPrice);

          assert.equal(contractEndBalance.toString(), 0);
          assert.equal(
            deployerInitialBalance.add(contractInitialBalance).toString(),
            deployerEndBalance.add(gasCost).toString()
          );

          await expect(fundmeContract.getFunder(0)).to.be.reverted;

          for (i = 1; i < 6; i++) {
            assert.equal(
              await fundmeContract.getAddressToAmountFunded(
                accounts[i].address
              ),
              0
            );
          }
        });
        it("Allows only the Owner to Withdraw", async () => {
          const accounts = await ethers.getSigners();

          const fundMeConnectedContract = await fundmeContract.connect(
            accounts[1]
          );

          await expect(fundMeConnectedContract.withdraw()).to.be.revertedWith(
            "FundMe__NotOwner()"
          );
        });
      });
    });
