const { ethers } = require("hardhat");

async function main() {
  const ERC1155withMint = await ethers.getContractFactory("ERC1155withMint");
  const eRC1155withMint = await ERC1155withMint.deploy("ERC1155withMint");

  try {
    await eRC1155withMint.deployed();
    console.log(`Contract successfully deployed to : ${eRC1155withMint.address}`);
  } catch (error) {
    console.log(`Error: ${err.message}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
