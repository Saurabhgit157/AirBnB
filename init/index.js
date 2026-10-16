const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/majorproject";

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("Sample data count:", initData.data.length);

    const result = await Listing.insertMany(initData.data);
    console.log("Inserted documents:", result.length);

    console.log("Data was initialized");
};

initDB();