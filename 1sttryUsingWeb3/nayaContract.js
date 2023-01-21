require("dotenv").config();
const Web3 = require("web3");

const output = require('./bin/nayaContract.json');

const deploy = async () => {
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            "https://eth-goerli.g.alchemy.com/v2/rF7N_UT4-zBO3a41Y3Gxa5wM-DvUON0L"
        )
    );

    const ABI = output.abi;
    const bytecode = output.bytecode;
    const accountFrom = {
        privateKey:process.env.PRIVATE_KEY,
        address: "0x487104772569AaD8d2443E39ED09Dd5235505Cf8",
    };
    console.log(`Attempting to deploy from account ${accountFrom.address}`);
    const incrementer = new web3.eth.Contract(ABI);
    const incrementerTx = incrementer.deploy({
        from:accountFrom.address,
        data: bytecode,
        arguments:[accountFrom.address,[1,2,3,4,5],[1,1,1,1,1]]
        // from:accountFrom.address,
        // arguments: [accountFrom.address,'ERC1155UsingWeb3',"ipfs://QmShBNMnspk8CyDqJ2wvNMMUZtLDbabFy74EzePCo847u1/{id}.json",[6,7,8,9,10,11,13],[1,1,1,1,1,1,1]],
        // arguments: [accountFrom.address,"QmNvc5EADNm94CctNBWAARejJ6jL2daYoRdXmGftun1CBu","dfajsk","2"],
    });
    console.log(await incrementerTx.estimateGas());
    const createTransaction = await web3.eth.accounts.signTransaction(
        {   
            data: incrementerTx.encodeABI(),
            gas: 2000000,
            maxPriorityFeePerGas: 1999999987,
        },
        accountFrom.privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    
};

deploy();
