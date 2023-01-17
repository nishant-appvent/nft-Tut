require("dotenv").config();
// solc compiler
const solc = require("solc");
// file reader
const fs = require("fs");
// Creation of Web3 class
const Web3 = require("web3");

const output = require('./bin/nftContract.json');

const CONTRACT_ADDRESS = "0x1E892f297723f16A947a6Fbb8405552a3EbD40C2";

const mint = async () => {
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            "https://eth-goerli.g.alchemy.com/v2/rF7N_UT4-zBO3a41Y3Gxa5wM-DvUON0L"
        )
    );

    const ABI = output.abi;
    // const bytecode = output.bytecode;
    const accountFrom = {
        privateKey:process.env.PRIVATE_KEY,
        address: "0x487104772569AaD8d2443E39ED09Dd5235505Cf8",
    };
    console.log(`Attempting to deploy from account ${accountFrom.address}`);
    const contractInstance = new web3.eth.Contract(ABI,CONTRACT_ADDRESS);
    console.log(contractInstance);

    const tx = {
        from:accountFrom.address,
        to:CONTRACT_ADDRESS,
        gas:500000, 
        maxPriorityFeePerGas: 1999999987,
        data:contractInstance.methods.mintBatch([1,2,3,4,5],[1,1,1,1,1]).encodeABI()
    }

    const signPromise = web3.eth.accounts.signTransaction(tx,accountFrom.privateKey);
    
    signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log("Promise failed:", err);
    });


};


mint();
