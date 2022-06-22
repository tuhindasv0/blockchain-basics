const { ethers, getNamedAccounts, deployments } = require("hardhat")
const { expect, assert } = require("chai")

describe("FundMe", () => {

    let fundmeContract;
    let mockV3AggregatorContract;
    beforeEach(async () => {
        // await deployments.fixture(["all"])
        // fundmeContract = await ethers.getContract("FundMe", deployer)
        // mockV3AggregatorContract = await ethers.getContract("MockV3Aggregator", deployer)
        const { deployer } = await getNamedAccounts();

        await deployments.fixture(["all"])
        mockV3AggregatorContract = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        )
        fundmeContract = await ethers.getContract("FundMe", deployer)

    })


    describe("constructor", () => {
        it("sets the aggregator addresses correctly", async () => {
            const response = await fundmeContract.priceFeed()
            assert.equal(response, mockV3AggregatorContract.address)
        })
    })

})