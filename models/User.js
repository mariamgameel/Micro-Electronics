// Require Mongoose
const mongoose = require("mongoose");

//Create Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["admin","user"],
        default: "user",
    },
}, {timestamps: true});

//Create Model
const User = mongoose.model("User",userSchema);

//Export
module.exports = User;