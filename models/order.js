const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    productw:String,
    name:sring,
    phonenumber:Number,
    address: String,
    email: String

});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;