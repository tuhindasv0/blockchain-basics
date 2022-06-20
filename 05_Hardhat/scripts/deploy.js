const { ethers } = require("hardhat");


async function main() {



    const contractFactory = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy();
    console.log(contract.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })