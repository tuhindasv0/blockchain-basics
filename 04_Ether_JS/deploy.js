const ethers = require("ethers");
const fs = require("fs-extra");
require('dotenv').config()

async function main() {


    let provider = new ethers.providers.JsonRpcProvider(process.env.LOCAL_RPC_URL);
    let wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    const abi = fs.readFileSync("./SimpleStorage_sol_Storage.abi", "utf8")
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_Storage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy();
    console.log(contract);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })