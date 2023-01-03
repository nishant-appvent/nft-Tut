const { ethers } = require("hardhat");

async function main() {
  const CryptoBeetles = await ethers.getContractFactory("CryptoBeetles");
  const cryptoBeetles = await CryptoBeetles.deploy("CryptoBeetles", "CBEET");

  try {
    await cryptoBeetles.deployed();
    console.log(`Contract successfully deployed to : ${cryptoBeetles.address}`);
    
    const newItemId = await cryptoBeetles.mint(
      "https://ipfs.io/ipfs/QmQqM67CEuhSRBXs4wphdmCA7SGXiLnuSGjQf27VjjhEo3");

      console.log(`NFT minted successfully :: ${newItemId}`);
  } catch (error) {
    console.log(`Error: ${err.message}`);
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
