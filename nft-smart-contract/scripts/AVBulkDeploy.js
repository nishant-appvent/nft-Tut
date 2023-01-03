const { ethers } = require("hardhat");

async function main() {
  const AVBulkDeploy = await ethers.getContractFactory("AVBulkDeploy");
  const aVBulkDeploy = await AVBulkDeploy.deploy();

  try {
    await aVBulkDeploy.deployed();
    console.log(`Contract successfully deployed to : ${aVBulkDeploy.address}`);
  } catch (error) {
    console.log(`Error: ${err.message}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
