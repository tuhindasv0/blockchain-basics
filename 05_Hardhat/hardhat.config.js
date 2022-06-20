require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const RINKBY_RPC_URL = process.env.RINKBY_RPC_URL;
const RINKBY_PRIVATE_KEY = process.env.RINKBY_PRIVATE_KEY;


module.exports = {
  solidity: "0.8.7",
  networks: {
    rinkby: {
      url: RINKBY_RPC_URL,
      accounts: [RINKBY_PRIVATE_KEY],
      chainId: 4
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      //accounts: [RINKBY_PRIVATE_KEY],
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  }
};
