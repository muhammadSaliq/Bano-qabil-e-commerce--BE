const Product = require("../models/product")
const express = require("express");
const jwt = require("jsonwebtoken");
const protect = require("../middlewares/auth")


const produtRouter = express.Router();

produtRouter.get('/all', async (req,res) => {
    const allProducts = await Product.find({});

    if (allProducts.length) {
        res.send({products: allProducts});
    }
    else {
        res.send({message: "No product found"});
    }
});

produtRouter.post("/add",protect, async (req,res) => {

    const productName = req.body.productName;
    const price = req.body.price;
    const descryption = req.body.descryption;
    const image = req.body.image;

    const productData = { productName , price,descryption,image};
    const productInstance = new Product(productData);
    const savedProduct = await productInstance.save();
    res.send({message: "product added", product : savedProduct})


});

produtRouter.put("/edit/:id",protect, async (req,res) => {

    const productId = req.params.id;
    const product = await Product.findOne({_id:productId});

    if (!product) {

        product.productName = req.body.productName;
        price = req.body.price;
        descryption = req.body.descryption;
        image = req.body.image;
        const savedProduct = await product.save();
        res.send({message: "product editted", product : savedProduct})

    }
    else {
        res.send({message: "product not editted", product : savedProduct})

    }

});
produtRouter.delete("/:id",protect, async (req,res) => {

    const productId = req.params.id;

    try {
        const product = await Product.deleteOne({_id:productId});
        res.send({message: "product removed", product : savedProduct})

    }
    catch {
        res.send({message: "product not removed", product : savedProduct})

    }

});

produtRouter.get("/:id", async (req,res) => {     //chane name into id

    const productId = req.params.id;
    const product = await Product.findOne({_id:productId});

    res.send({message: "product found", Product : product})


});

module.exports = produtRouter;