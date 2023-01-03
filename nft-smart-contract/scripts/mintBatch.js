const { ethers } = require("hardhat");
const nftContractJSON = require("../artifacts/contracts/nftContract.sol/nftContract.json");
require("dotenv").config();


async function main() {
    const abi = nftContractJSON.abi;
    const provider = new ethers.providers.AlchemyProvider("goerli",process.env.GOERLI_PROJECT_ID);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);
    const signer = wallet.connect(provider);
    const nftContract = new ethers.Contract("0x893f48d252Fe47A461b196aBb5C6156AfbCDFF39",abi,signer);
    const arr = ["QmNvc5EADNm94CctNBWAARejJ6jL2daYoRdXmGftun1CBu","QmPX21oRAGbiTajBjeUYGne28ZcTT2s7CGvnniGgLDrGrQ","QmP7B1Yqe8gDCjKWC4VDAmLnxXVDHDk5TQjDBPdhfzEkd8"];
    const promiseArr = [];
    for(let i=0;i<arr.length;i++){
      const firstRes = await nftContract.mint(arr[i]);
      console.log("NFT sent for Minting---------->",firstRes);
      promiseArr.push(firstRes.wait());
    }
    Promise.all(promiseArr).then((values)=>{
    for(let i =0;i<values.length;i++){
      const rec = JSON.stringify(values[i].events[0].args);
      const rec2 = JSON.stringify(values[i].events[0].args[2].toNumber());
      console.log(rec,"=====", rec2);
    }
  }
 )
}


main().catch((error) => {   
  console.error(error);
  process.exitCode = 1;
});
