require("dotenv").config();

// Creation of Web3 class
const Web3 = require("web3");
// Getting JSON for abi and byteCode
const output = require('./bin/nftContract.json');
// Adding provider in Web3 instance

const deploy = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL));
    const collectionName = "Appvent";
    const collectionUri = "ipfs://QmShBNMnspk8CyDqJ2wvNMMUZtLDbabFy74EzePCo847u1/{id}.json";
    const tokenIdArr = [6, 7, 8, 9, 10, 11, 13, 14];
    const amountArr = [1, 1, 1, 1, 1, 1, 1, 1];
    const ABI = output.abi;
    const bytecode = output.bytecode;
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

    const resultData = await web3.eth.sendSignedTransaction(
        mintSignTx.rawTransaction,
        function (err, hash) {
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
    console.log(urlArr);
};

deploy();
