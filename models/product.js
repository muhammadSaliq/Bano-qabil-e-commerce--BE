const mongoose = require("mongoose");

const productschema = mongoose.Schema({
    productName:String,
    price:Number,
    descryption: String,
    Image:String


});

const Product = mongoose.model('Products',productschema);
module.exports = Product;