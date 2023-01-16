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
    console.log(ABI);
    const accountFrom = {
        privateKey:
            "7c8c6a789a36232bc1912db96dabd96ab55d0a798e0824c6cc9a7f7de4bc2e68",
        address: "0x3a0d68D484E77664C5507E7E1c46D090F25930Bf",
    };
    console.log(`Attempting to deploy from account ${accountFrom.address}`);

    // const incrementer = new web3.eth.Contract(ABI);
    // const incrementerTx = incrementer.deploy({
    //     data: bytecode,
    //     // arguments: [5],
    // });
    // const createTransaction = await web3.eth.accounts.signTransaction(
    //     {
    //         data: incrementerTx.encodeABI(),
    //         gas: await incrementerTx.estimateGas(),
    //     },
    //     accountFrom.privateKey
    // );
    // const createReceipt = await web3.eth.sendSignedTransaction(
    //     createTransaction.rawTransaction
    // );
    // console.log(`Contract deployed at address: ${createReceipt.contractAddress}`);
};

deploy();
