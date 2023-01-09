const { ethers } = require("hardhat");

async function main() {
  const CryptoBeetles = await ethers.getContractFactory("CryptoBeetles");
  const cryptoBeetles = await CryptoBeetles.deploy("node-cmd", "nod");

  try {
    await cryptoBeetles.deployed();
    console.log(`Contract successfully deployed to : ${cryptoBeetles.address}`);
fs.writeFileSync('environment/deployAddress.txt',cryptoBeetles.address);

    
    const newItemId = await cryptoBeetles.mint(
      "https://ipfs.io/ipfs/QmPFbNemc3PWrrELQWw4sYBNJoSYyVLUGKofx47vdNffdS");

      console.log(`NFT minted successfully :: ${newItemId}`);
  } catch (error) {
    console.log(`Error: ${err.message}`);
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
