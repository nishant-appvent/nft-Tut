require("dotenv").config();

// Creation of Web3 class
const Web3 = require("web3");
// Getting JSON for abi and byteCode
const output = require('./bin/nftContract.json');
// Adding provider in Web3 instance
const ABI = output.abi;
const bytecode = output.bytecode;
const ethers = require("ethers");

const express = require('express');
const app = express();

const port = process.env.port || 8000;

app.post('/deployWithWeb3', async (req, res) => {
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL));
        const collectionName = "Appvent";
        const collectionUri = "ipfs://QmShBNMnspk8CyDqJ2wvNMMUZtLDbabFy74EzePCo847u1/{id}.json";
        const tokenIdArr = [6, 7, 8, 9, 10, 11, 13];
        const amountArr = [1, 1, 1, 1, 1, 1, 1];
        const accountFrom = {
            privateKey: process.env.PRIVATE_KEY,
            address: process.env.PUBLIC_KEY,
        };
        console.log(`Attempting to deploy from account ${accountFrom.address}`);
        const contractInstance = new web3.eth.Contract(ABI);
        const deployTx = contractInstance.deploy({
            data: bytecode,
            arguments: [collectionName, collectionUri]
        });
        console.log(await deployTx.estimateGas());
        const createDeployTransaction = await web3.eth.accounts.signTransaction(
            {
                data: deployTx.encodeABI(),
                gas: 3000000,
                maxPriorityFeePerGas: 1999999987,
                // nonce: 57
            },
            accountFrom.privateKey
        );
        const createReceipt = await web3.eth.sendSignedTransaction(
            createDeployTransaction.rawTransaction
        );
        console.log("Contract Deployed to address", createReceipt.contractAddress);
        const CONTRACT_ADDRESS = createReceipt.contractAddress;
        const newContractInstance = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

        const mintBatchTx = {
            from: accountFrom.address,
            to: CONTRACT_ADDRESS,
            gas: 3000000,
            maxPriorityFeePerGas: 1999999987,
            data: newContractInstance.methods.mintBatch(tokenIdArr, amountArr).encodeABI()
        }

        const mintSignTx = await web3.eth.accounts.signTransaction(mintBatchTx, accountFrom.privateKey);

        const resultData = await web3.eth.sendSignedTransaction(mintSignTx.rawTransaction,function (err, hash) {
                if (!err) {
                    console.log("Initial Transaction sent.");
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
        console.log("Minted Successfully");
        let events = await newContractInstance.getPastEvents("TransferBatch");
        const fetchedTokenIdArr = events[0].returnValues[3];
        //   console.log(fetchedTokenIdArr);
        const urlArr = [];
        fetchedTokenIdArr.forEach(element => {
            urlArr.push(`https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${element}`)
        });
        return res.status(200).json({ status: "Success", CONTRACT_ADDRESS, NftLinks: urlArr });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Failure", message: "Unhandled error" });
    }
});


app.post('/deployWithEthers', async (req, res) => {
    const collectionName = "UsinEthers";
    const collectionUri = "ipfs://QmShBNMnspk8CyDqJ2wvNMMUZtLDbabFy74EzePCo847u1/{id}.json";
    const tokenIdArr = [6, 7, 8, 9, 10, 11, 13];
    const nftAmountArr = [1, 1, 1, 1, 1, 1, 1];
    let contractInstance;
    try {
        const provider = new ethers.providers.AlchemyProvider("goerli", "rF7N_UT4-zBO3a41Y3Gxa5wM-DvUON0L");
        const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const ContractInstance = new ethers.ContractFactory(ABI, bytecode, Wallet);
        contractInstance = await ContractInstance.deploy(collectionName,collectionUri );
        await contractInstance.deployed();
        console.log("Contract Address",contractInstance.address);
    } catch (err) {
        console.log("Error in deploying contract.");
        console.log(err);
        return res.status(400).json({message:"Failure",error:"Error in deploying contract."})
    }

    try {
        const initialRes = await contractInstance.mintBatch(tokenIdArr, nftAmountArr);

        const finalResponse = await initialRes.wait();

        const responseObj = {};
        for (let i = 0; i < tokenIdArr.length; i++) {
            responseObj[tokenIdArr[i]] = `https://testnets.opensea.io/assets/goerli/${contractInstance.address}/` + tokenIdArr[i];
        }
        console.log(responseObj);
        return res.status(200).json({message:"Success",Links:responseObj})
    } catch (error) {
        console.log("Error in minting");
        console.log(error);
        return res.status(400).json({message:"Failure",error:"Error in Minting."})
    }

})

app.listen(port, () => {
    console.log(`Running on ${port}`);
})