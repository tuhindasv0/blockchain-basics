const { localDevelopmentNetwork } = require("../helper-hardhat-config");
const DECIMAL = 8;
const INITIAL_ANSWER = 200000000000
const deployMockContract = async (hre) => {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("--------------------------------")

    if (localDevelopmentNetwork.includes(network.name)) {
        log("--- Deploying Mock Contract for PriceFeed ---")
        const MockV3AggregatorContract = await deploy("MockV3Aggregator", {
            from: deployer,
            args: [DECIMAL, INITIAL_ANSWER],
            log: true,
        });
        log("--- Contract Deployed ---")
    }

};
module.exports.default = deployMockContract;