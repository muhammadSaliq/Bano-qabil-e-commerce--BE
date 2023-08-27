const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    userName:String,
    password:String
},
{
timestamps: true
}
);

const User = mongoose.model("User",userschema);
module.exports = { User};