let Web3 = require('web3');
// console.log(Web3);

let web3 = new Web3(new Web3.providers.HttpProvider("https://eth-goerli.g.alchemy.com/v2/g1zUBS5oj7TSScOvIoXtJ3bIa5DqFUhH"));

// console.log(web3);

let balance = web3.eth.
getBalance("0x2E589A1731a3154c6AB99b5D24Df43090F7D7601").then(data=>{
    console.log(web3.utils.fromWei(data,"ether"));
});
// console.log
// balance= web3.toDecimal(balance);
// console.log(balance);