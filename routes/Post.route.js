const express=require("express");
const { postModel } = require("../models/Post.model");

const postrouter=express.Router();



postrouter.post("/post",async(req,res)=>{
    try {
        const post=new postModel(req.body);
        await post.save();
        res.send({"msg":"new post has been added"});
    } catch (error) {
        res.send({"msg":error.message});
    }
});

postrouter.get("/",async(req,res)=>{
    try {
        console.log(req.query);
        const posts=await postModel.find({$and: [{user_id:req.body.user_id}, {...req.query}]});
        res.send(posts);
    } catch (error) {
        res.send({"msg":error.message});
    }
});

postrouter.patch("/update/:id",async(req,res)=>{
    try {
        const {id}=req.params;
       await postModel.findByIdAndUpdate({_id:id},req.body);
        res.send({"msg":"post has been updated"});
    } catch (error) {
        res.send({"msg":error.message});
    }
});

postrouter.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params;
       await postModel.findByIdAndDelete({_id:id},req.body);
        res.send({"msg":"post has been deleted"});
    } catch (error) {
        res.send({"msg":error.message});
    }
});



module.exports={postrouter}