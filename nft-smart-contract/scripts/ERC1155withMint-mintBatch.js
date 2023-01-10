const { ethers } = require("hardhat");
const eRC1155withMintJSON = require("../artifacts/contracts/ERC1155withMint.sol/ERC1155withMint.json");
require("dotenv").config();


async function main() {
    const abi = eRC1155withMintJSON.abi;
    const provider = new ethers.providers.AlchemyProvider("goerli",process.env.GOERLI_PROJECT_ID);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);
    const signer = wallet.connect(provider);
    const eRC1155withMint = new ethers.Contract("0x9176a8273a011E0150E8DbAFcE716EaF67c504Da",abi,signer);
    const tokenIdArr = [14,15,16,17];
    const nftAmountArr = [1100,1000,200,400];
    const firstRes = await eRC1155withMint.mintBatch("ipfs://QmX4zxPnpXkxyjupiNqbVpkRoez283TSbt8dS12UnG7vKQ/{id}.json",tokenIdArr,nftAmountArr);
    console.log("NFTs sent for Minting---------->",firstRes);
    const secRes = await firstRes.wait();
    const rec = JSON.stringify(secRes.events[0]);
    console.log(rec);
}


main().catch((error) => {   
  console.error(error);
  process.exitCode = 1;
});
