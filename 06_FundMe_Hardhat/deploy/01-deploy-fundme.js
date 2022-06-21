const { networkConfig } = require("../helper-hardhat-config");

const deployContract = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  });
};
module.exports.default = deployContract;
