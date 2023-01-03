const { ethers } = require("hardhat");

async function main() {
  const NftContract = await ethers.getContractFactory("nftContract");
  const nftContract = await NftContract.deploy("AppVentNft", "AVn");

  try {
    await nftContract.deployed();
    console.log(`Contract successfully deployed to : ${nftContract.address}`);
    const arr = ["QmNvc5EADNm94CctNBWAARejJ6jL2daYoRdXmGftun1CBu","QmPX21oRAGbiTajBjeUYGne28ZcTT2s7CGvnniGgLDrGrQ","QmP7B1Yqe8gDCjKWC4VDAmLnxXVDHDk5TQjDBPdhfzEkd8"];
    for(let i =0;i<arr.length;i++){
        const uri = arr[i];
        const mintingRes1 = await nftContract.mint(uri);
        const mintingFinalRes = await mintingRes1.wait();
        const rec = JSON.stringify(mintingFinalRes.events[0].args);
        const rec2 = JSON.stringify(mintingFinalRes.events[0].args[2].toNumber());
        console.log(rec,"----->", rec2);
    }  
  } catch (error) {
    console.log(`Error: ${err.message}`);
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
