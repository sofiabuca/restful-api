//Mongoose
const mongoose = require("mongoose");

//Pasport locals npm i passport-local-mongoose
const passportLocalMongoose = require("passport-local-mongoose");

//Create schema
const userSchema = new mongoose.Schema({
    username : String,
    password: String
});

//Passport local
userSchema.plugin(passportLocalMongoose);


//Create a model
const User = mongoose.model("User", userSchema);

module.exports = User;

//Set up the authorization
