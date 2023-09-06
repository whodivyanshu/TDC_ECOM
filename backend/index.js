const express = require("express")
const mongoose = require("mongoose");
const app = express();



app.get("/getData", (req,res)=>{
    res.send("Hello world");
})


mongoose.connect("")


app.listen(3000, ()=>{
    console.log("server started at port 3000");
})