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
        type :String,
        set: (v) => v===" " ? "https://search.brave.com/images?q=free+img+of+gta&context=W3sic3JjIjoiaHR0cHM6Ly93YWxscGFwZXJjYXZlLmNvbS93cC93cDU0MjQzMjQuanBnIiwidGV4dCI6Imd0YSA1IDRrIHBjIHdhbGxwYXBlciBmcmVlLiBHcmFuZCB0aGVmdCBhdXRvLCBHdGEiLCJwYWdlX3VybCI6Imh0dHBzOi8vd2FsbHBhcGVyY2F2ZS5jb20vZ3RhLTUtcGMtNGstd2FsbHBhcGVycyJ9XQ%3D%3D&sig=ec49852d25ae453fa0027548a1eba1bbaf0aad5421fbc8e4d36f5ea261cf338e&nonce=4f025ddc1447e59ded568e95a4a01a7c"
         : v ,
    },
    price : Number,
    Location: String,
    country: String,
})

const Listing = mongoose.model("listing" , ListingSchema);

module.exports = Listing ;