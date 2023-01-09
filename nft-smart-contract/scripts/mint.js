const { ethers } = require("hardhat");
const cryptoBeetlesJSON = require("../artifacts/contracts/CryptoBeetles.sol/CryptoBeetles.json");
require("dotenv").config();

// console.log(JSON.stringify(new ethers.providers.EtherscanProvider("goerli","ZAGYUWH9FTKKR5HC1DXZRUEEN6VK7QKY4D")));
async function main() {
    const abi = cryptoBeetlesJSON.abi;
    // const provider = new ethers.providers.EtherscanProvider("goerli","ZAGYUWH9FTKKR5HC1DXZRUEEN6VK7QKY4D");
    const provider = new ethers.providers.AlchemyProvider("goerli",process.env.GOERLI_PROJECT_ID);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);
    const signer = wallet.connect(provider);
    const cryptoBeetles = new ethers.Contract("0xf2851deA86cC43620036655E63FF3a8acd49e76E",abi,signer);
    const firstRes = await cryptoBeetles.mint("QmYtAdW9kAcpkfjF7wpNCn9oBh3pTDdLpExN7LE6oVAWxz");
    // console.log("NFT sent for Minting---------->",firstRes);
    const secRes = await firstRes.wait();
    // console.log(secRes);
    const rec = JSON.stringify(secRes.events[0].args);
    const rec2 = JSON.stringify(secRes.events[0].args[2].toNumber());
    const resObj = {
      arr:rec,
      tokenId:rec2
    }
    console.log(JSON.stringify(resObj));

}


main().catch((error) => {   
  console.error(error);
  process.exitCode = 1;
});
