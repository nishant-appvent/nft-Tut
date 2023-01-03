const { ethers } = require("hardhat");
const cryptoBeetlesJSON = require("../artifacts/contracts/CryptoBeetles.sol/CryptoBeetles.json");
require("dotenv").config();


async function main() {
    const abi = cryptoBeetlesJSON.abi;
    const provider = new ethers.providers.AlchemyProvider("goerli",process.env.GOERLI_PROJECT_ID);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);
    const signer = wallet.connect(provider);
    const cryptoBeetles = new ethers.Contract(process.env.CONTRACT_ADDRESS,abi,signer);
    const firstRes = await cryptoBeetles.mint("QmQqM67CEuhSRBXs4wphdmCA7SGXiLnuSGjQf27VjjhEo3");
    console.log("NFT sent for Minting---------->",firstRes);
    const secRes = await firstRes.wait();
    console.log(secRes);
    const rec = JSON.stringify(secRes.events[0].args);
    const rec2 = JSON.stringify(secRes.events[0].args[2].toNumber());
    console.log("=======================Shit-anshu",rec);
    console.log("=======================Shit-anshu",rec2);
}


main().catch((error) => {   
  console.error(error);
  process.exitCode = 1;
});
