const { ethers } = require("hardhat");
const aVBulkDeployJSON = require("../artifacts/contracts/AVBulkDeploy.sol/AVBulkDeploy.json");
require("dotenv").config();


async function main() {
    const abi = aVBulkDeployJSON.abi;
    const provider = new ethers.providers.AlchemyProvider("goerli",process.env.GOERLI_PROJECT_ID);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);
    const signer = wallet.connect(provider);
    const aVBulkDeploy = new ethers.Contract("0xF84c8d4eD9C4F102c8499f2ea5FFEAB909B2F38D",abi,signer);
    // const tokenIdArr= ["0x3a0d68D484E77664C5507E7E1c46D090F25930Bf","0x3a0d68D484E77664C5507E7E1c46D090F25930Bf","0x3a0d68D484E77664C5507E7E1c46D090F25930Bf","0x3a0d68D484E77664C5507E7E1c46D090F25930Bf","0x3a0d68D484E77664C5507E7E1c46D090F25930Bf","0x3a0d68D484E77664C5507E7E1c46D090F25930Bf"];
    const tokenIdArr = [1,2,3,4,5];
    const nftAmountArr = [1,1,2,4,9];
    const firstRes = await aVBulkDeploy.mintBatch(tokenIdArr,nftAmountArr);
    // const firstRes = await aVBulkDeploy.name();
    // const logs = await provider.getLogs({
    //     fromBlock: 0,
    //     toBlock: "latest",
    //     address: "0xF84c8d4eD9C4F102c8499f2ea5FFEAB909B2F38D"
    // });
    console.log("NFTs sent for Minting---------->",firstRes);
    const secRes = await firstRes.wait();
    console.log(JSON.stringify(secRes));
    const rec = JSON.stringify(secRes.events[0]);
    console.log(rec);
}


main().catch((error) => {   
  console.error(error);
  process.exitCode = 1;
});
