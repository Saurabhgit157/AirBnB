const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const mongose_url = "mongodb://127.0.0.1:27017/majorproject";

main().then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log(err));




async function main(){
   await mongoose.connect(mongose_url);
}

app.get("/",(req,res)=>{
    res.send("Hi, i am root");

})

// app.get("/testListing",async (req,res)=>{
//     const sampleListing = new Listing({
//         title : "GTA villa",
//         description : "By the Owners OF GTA",
//         price: 9999,
//         location: "San Andras",
//         country: "GTA WORLD",

//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("sucessful testing");


// }
// )

app.set("view engine" , " ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listing/index.ejs",{allListings});
})
app.listen(3000,()=>{
    console.log("server is listening to port 3000")
});

