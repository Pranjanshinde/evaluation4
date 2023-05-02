const express=require("express");
const { connection } = require("./db");
const { userrouter } = require("./routes/User.route");
const { postrouter } = require("./routes/Post.route");
const { Auth } = require("./Middleware/auth.js");
require('dotenv').config();
var cors = require('cors');

const app=express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Home page");
});

app.use("/users",userrouter);

app.use(Auth);

app.use("/posts",postrouter);




app.listen(process.env.port,async()=>{
    try {
        console.log("connecting...");
        await connection;
    } catch (error) {
        console.log({"msg":error.message});
    }
    console.log("connected to port 8080");
})