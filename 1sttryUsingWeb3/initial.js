require("dotenv").config();
// solc compiler
const solc = require("solc");
// file reader
const fs = require("fs");
// Creation of Web3 class
const Web3 = require("web3");

const deploy = async () => {
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            "https://eth-goerli.g.alchemy.com/v2/g1zUBS5oj7TSScOvIoXtJ3bIa5DqFUhH"
        )
    );

    // Reading the file
    const file = fs.readFileSync("initial.sol").toString();
    // console.log(file);

    let input = {
        language: "Solidity",
        sources: {
            "initial.sol": {
                content: file,
            },
        },
        settings: {
            outputSelection: {
                "*": {
                    "*": ["*"],
                },
            },
        },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    const ABI = output.contracts["initial.sol"]["initial"].abi;
    const bytecode =
        output.contracts["initial.sol"]["initial"].evm.bytecode.object;
    console.log(ABI)
    const accountFrom = {
        privateKey:process.env.PRIVATE_KEY,
        address: "0x487104772569AaD8d2443E39ED09Dd5235505Cf8",
    };
    console.log(`Attempting to deploy from account ${accountFrom.address}`);

    const incrementer = new web3.eth.Contract(ABI);
    const incrementerTx = incrementer.deploy({
        data: bytecode,
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
    ).on("receipt",(receipt)=>{
        console.log(receipt.contractAddress,"fdaslkfdlkasd");
    })
    console.log(incrementerTx);
    
    
};

deploy();
