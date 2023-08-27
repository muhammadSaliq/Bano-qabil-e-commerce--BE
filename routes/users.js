const {User} = require("../models/user")
const express = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken")

const router = express.Router();

router.post("/register", async (req,res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const userExist = await User.findOne({userName});
    if (userExist) {
        res.send({message: "This username is already taken"})
        return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = { userName, password: hashedPassword};
    const savedUser = new User(userData);
    const saved = await savedUser.save();

    res.status(200).send({user: saved, message: "User created"})
});

router.post("/login",async (req,res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const isuser = await User.findOne({userName});
    if (isuser) {
        const match = await bcrypt.compare(password, isuser.password);
        if (match) {
            const token = jwt.sign({_id : isuser._id},process.env.jwt_secret , {expiresIn : '30d'});
            res.send({match, user : isuser, token , message : "Logged in successfully"});
        }
        else {
            res.send({ match, message : " wrong password "});
        }
    }
    else {
        res.send( {message : " No user available with this email"});
    }
    console.log(isuser , "user available");
    res.send( {User : isuser});
});

module.exports = router;