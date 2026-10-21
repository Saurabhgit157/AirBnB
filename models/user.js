const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

// passport-local-mongoose automatically adds:
//   - username field (String, unique, required)
//   - hash field (the hashed password)
//   - salt field (used in hashing)
//   - .register() static method
//   - .authenticate() static method
//   - .serializeUser() / .deserializeUser() methods
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
