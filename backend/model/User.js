const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, Unique: "True"},
    password: String,
});

module.exports= mongoose.model("User", userSchema);