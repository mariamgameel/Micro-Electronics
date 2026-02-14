require ("dotenv").config();
const express = require ("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
// Require Models
const User = require("./models/User");

//Register
main.post("/api/register",async(req,res)=>{
    try{
        //Get  Data
        const{username,email,password,role} = req.body;
        //Validate Data
        if(!username || !email || !password) return res.status(400).json({msg: "Missing Data"});

        const existUser = await User.findOne({email});
        if (existUser) return res.status(400).json({msg: "Account Already Exists"});
        //Create User
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashPassword,
            role
        });
        //Response
        res.status(201).json({
            msg: "Done Created User",
            data: user,
        });
    } catch (error){
        console.log(error);
    }
});

//Login
main.post("/api/login",async(req,res)=>{
    try{
        //Get Data
        const {email, password} = req.body;
        //Validate Data
        if(!email || !password)
            return res.status(400).json({msg: "Missing Data"});

        const user = await User.findOne({email});
        if (!user)
            return res.status(400).json({msg: "Account Not Found, Please Create Account"});

        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword)
            return res.status(400).json({msg: "Invalid Passwrod"});

        const authCode = Buffer.from(user._id.toString()).toString("base64");
        
        res.status(200).json({
            msg: "Success Login",
            data: authCode
        });
    } catch(error){
        console.log(error);
    }
});

//Product
//Get Data
//Validate Data
//Response

const port = process.env.PORT || 3000;

main.get("/",(req,res)=>{
    res.send(`server is running on port${port}`);
});

main.listen(port,()=>{
    console.log(`server is running on port${port}`);
});