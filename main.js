require ("dotenv").config();
const express = require ("express");
const mongoose = require("mongoose");
const main = express();
main.use(express.json());

async function dbconnection(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/micro-electronics");
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log("Could not connect");
    }
}
dbconnection();

const port = process.env.PORT || 3000;

main.get("/",(req,res)=>{
    res.send(`server is running on port${port}`);
});

main.listen(port,()=>{
    console.log(`server is running on port${port}`);
});