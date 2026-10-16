const mongoose = require("mongoose");
const { title } = require("process");
const schema = mongoose.schema;

const ListingSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
    },
    
    description : String,
    image : {
        filename: String,
        url: String,
    },
    price : Number,
    location: String,
    country: String,
})

const Listing = mongoose.model("listing" , ListingSchema);

module.exports = Listing ;