const mongoose = require("mongoose");
const Review = require("./review");

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
});

// Cascade delete: remove all associated reviews when a listing is deleted
ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing && listing.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("listing", ListingSchema);

module.exports = Listing;