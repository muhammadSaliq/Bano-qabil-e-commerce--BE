const jwt = require("jsonwebtoken");
const {User} = require("../models/user")

const protect = async (req , res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
             token = headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.jwt_secret);
        const userId = decoded._id;
        const isUser = await User.findOne({_id:userId});
        if (isUser) {
            next();
        }
        else {
            res.status(401).send({message: "No user with this token"});
        }
    }
    catch(error) {
        res.status(401).send({message: "invalid token "});
        
    }
    }

    if (!token) {
        res.status(401).send({message: "no token"})
    }
};

module.exports = protect;