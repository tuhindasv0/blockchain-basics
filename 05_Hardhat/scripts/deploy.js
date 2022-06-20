const { ethers, runs } = require("hardhat");


async function main() {



    const contractFactory = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy();
    console.log(contract.address);

    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await contract.deployTransaction.wait(6)
        await verify(contract.address, [])
    }

}

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })