const express=require("express");
const bcrypt = require('bcrypt');
const { userModel } = require("../models/User.model");
const userrouter=express.Router();
var jwt = require('jsonwebtoken');
userrouter.post("/register",async(req,res)=>{
    try {
        const {name,email,gender,password}=req.body;
        bcrypt.hash(password, 5, async(err, hash)=> {
            const user=new userModel({
                name:name,
                email:email,
                gender:gender,
                password:hash
            });
            await user.save();
            res.send({"msg":"new user has been registered"});
        });
    } catch (error) {
       res.send({"msg":error.message}); 
    }
});

userrouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email:email});
        console.log(user);
        if(user)
        {
            bcrypt.compare(password, user.password, function(err, result) {
                // result == true
                
                if(result)
                {
                    console.log({ user_id: user._id });
                    var token = jwt.sign({ user_id: user._id }, 'masai');
                    res.send({"msg":"Login Successfull","token":token});
                }else{
                    res.send({"msg":"wrong credentials"});
                }
            });
        }
    } catch (error) {
       res.send({"msg":error.message}); 
    }
});



module.exports={userrouter};


