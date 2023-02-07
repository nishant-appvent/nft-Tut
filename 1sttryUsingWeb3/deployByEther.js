const output = require("./bin/nftContract.json");
require("dotenv").config();
const ABI = output.abi;
const bytecode = output.bytecode;
const ethers = require("ethers");


const deploy = async function () {
    let contractInstance;
    try {
        const provider = new ethers.providers.AlchemyProvider("goerli", "rF7N_UT4-zBO3a41Y3Gxa5wM-DvUON0L");
        const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const ContractInstance = new ethers.ContractFactory(ABI, bytecode, Wallet);
        contractInstance = await ContractInstance.deploy("UsingEthers", "ipfs://QmShBNMnspk8CyDqJ2wvNMMUZtLDbabFy74EzePCo847u1/{id}.json");
        await contractInstance.deployed();
        console.log(contractInstance.address);
    } catch (err) {
        console.log("Error in deploying contract.");
        console.log(err);
    }

    try {
        const tokenIdArr = [6, 7, 8, 9, 10, 11, 13];
        const nftAmountArr = [1, 1, 1, 1, 1, 1, 1];
        const initialRes = await contractInstance.mintBatch(tokenIdArr, nftAmountArr);

        const finalResponse = await initialRes.wait();

        const responseObj = {};
        for (let i = 0; i < tokenIdArr.length; i++) {
            responseObj[tokenIdArr[i]] = `https://testnets.opensea.io/assets/goerli/${contractInstance.address}/` + tokenIdArr[i];
        }
        console.log(responseObj);
    } catch (error) {
        console.log("Error in minting");
        console.log(error);
    }
}
// deploy();

const provider = new ethers.providers.AlchemyProvider("goerli", "rF7N_UT4-zBO3a41Y3Gxa5wM-DvUON0L");

console.log(provider)