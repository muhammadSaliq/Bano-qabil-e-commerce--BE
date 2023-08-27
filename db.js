const mongoose = require("mongoose");
mongoose.connect(process.env.mongoURL).then(() => console.log("db connected")); 

module.exports = {connectdb};