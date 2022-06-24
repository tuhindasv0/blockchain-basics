require("dotenv").config();
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const RINKBY_RPC_URL = process.env.RINKBY_RPC_URL;
const RINKBY_PRIVATE_KEY = process.env.RINKBY_PRIVATE_KEY;
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  networks: {
    rinkby: {
      url: RINKBY_RPC_URL,
      accounts: [RINKBY_PRIVATE_KEY],
      chainId: 4,
      blockConfirmations: 6,
    },
  },
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: "USD",
  // },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
