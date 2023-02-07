const { ethers } = require("hardhat");

async function main() {
  const FlashLoan = await ethers.getContractFactory("FlashLoan");
  const flashLoan = await FlashLoan.deploy("0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D");
  await flashLoan.deployed();
  console.log("Flash Loan contract deployed",flashLoan.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
