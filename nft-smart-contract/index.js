const express = require('express');
const app = express();
const nodeCmd = require("node-cmd");
const fs = require('fs');

const port = process.env.port||8000;

app.post('/deploy',(req,res)=>{
    try{
        console.log("fdasasdfasfasdfasdfasdfas");
        let val = "";
        nodeCmd.run(`npx hardhat run scripts/mint.js --network goerli`,(err,data,stdout)=>{
            console.log(data);
            val = JSON.parse(data)
            console.log(val);
            res.json({message:"Success",val});
        });
    }catch(err){
    console.log(err);
    res.json({message:"fail"})
    }
});

app.listen(port,()=>{
    console.log(`Running on ${port}`);
})