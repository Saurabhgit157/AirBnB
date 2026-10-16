const express = require("express");
const app = express();
const mongoose = require("mongoose");


main().then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log(err));

const mongose_url = "mongodb://127.0.0.1:27017/majorproject";


async function main(){
    mongoose.connect(mongose_url);
}

app.get("/",(req,res)=>{
    res.send("Hi, i am root");

})
app.listen(3000,()=>{
    console.log("server is listening to port 3000")
});

