const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

    try {

        let token;

        // STEP 1
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            // STEP 2
            token = req.headers.authorization.split(" ")[1];

            // STEP 3
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // STEP 4
            req.user = await User.findById(decoded.id).select("-password");

            // STEP 5
            next();

        } else {

            return res.status(401).json({
                message: "Not authorized, no token"
            });

        }

    } catch(error){

        console.log(error);

        return res.status(401).json({
            message: "Token failed"
        });

    }

};



module.exports = { protect};