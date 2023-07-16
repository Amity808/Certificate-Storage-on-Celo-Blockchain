const hre = require("hardhat")

async function main() {
    const [ deployer ] = await hre.ethers.getSigners();

    console.log("Deploying contract with the account: ", deployer.address)

    const MyNFT = await hre.ethers.deployContract("MyNFT");

    console.log("NFT Address: ", await MyNFT.address)

// const MyNFT = await hre.ethers.getContractFactory("MyNFT");
//   const myNFT = await MyNFT.deploy();

//   await myNFT.deployed();

//   console.log("MyNFT deployed to:", myNFT.address);

    storeContractData(MyNFT)
}

function storeContractData(contract) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../src/contracts";
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/MyNFT-address.json",
        JSON.stringify({ MyNFT: contract.address }, undefined, 2)
    );

    const MyNFTArtifact = artifacts.readArtifact("MyNFT");

    fs.writeFileSync(
        contractsDir + "/MyNFT.json",
        JSON.stringify(MyNFTArtifact, null, 2)
    )
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1)
})