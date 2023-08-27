const express = require("express");
const mongoose = require("mongoose");
const {User} = require("./models/user");
const router = require("./routes/users");
const produtRouter = require("./routes/products");
const uploadRouter = require("./routes/upload")
const app = express();
const cors = require("cors");

require("dotenv").config();
app.use(cors());

app.use('/uploads',express.static(__dirname + '/uploads'))

//mongoose.connect(process.env.mongoURL).then(() => console.log("db connected")); 

//console.log(process.env.mongoURL);
app.use(express.json());

app.get("/",(req, res) => {
    res.send("request running");
} );

app.use("/users",router);
app.use("/products", produtRouter);
app.use("/upload", uploadRouter);

app.listen(3000, () => console.log("server running"));