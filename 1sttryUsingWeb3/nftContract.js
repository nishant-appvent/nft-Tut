// solc compiler
const solc = require("solc");
// file reader
const fs = require("fs");
// Creation of Web3 class
const Web3 = require("web3");
const output = require("./helper").instantiateContract("./nftContract.sol");

const deploy = async () => {
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            "https://eth-goerli.g.alchemy.com/v2/g1zUBS5oj7TSScOvIoXtJ3bIa5DqFUhH"
        )
    );

    // Reading the file
    // console.log("fdsaa");
    // const file = fs.readFileSync("nftContract.sol").toString();
    
    // let input = {
    //     language: "Solidity",
    //     sources: {
    //         "nftContract.sol": {
    //             content: file,
    //         },
    //     },
    //     settings: {
    //         outputSelection: {
    //             "*": {
    //                 "*": ["*"],
    //             },
    //         },
    //     },
    // };
    // console.log(input);
    // const output = JSON.parse(solc.compile(JSON.stringify(input)));
    // console.log(output);

    const ABI = output.abi;
    const bytecode = output.bytecode;
    console.log(ABI)
    // const bytecode =
    //     output.contracts["nftContract.sol"]["nftContract"].evm.bytecode.object;
    const accountFrom = {
        privateKey:
      "7c8c6a789a36232bc1912db96dabd96ab55d0a798e0824c6cc9a7f7de4bc2e68",
        address: "0x3a0d68D484E77664C5507E7E1c46D090F25930Bf",
    };
    console.log(`Attempting to deploy from account ${accountFrom.address}`);

    const incrementer = new web3.eth.Contract(ABI);
    const incrementerTx = incrementer.deploy({
        data: bytecode,
        arguments: ['Using-Web3',"w3"],
    });
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            data: incrementerTx.encodeABI(),
            gas: await incrementerTx.estimateGas(),
        },
        accountFrom.privateKey
    );
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
};

deploy();
