import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  
    let token = req.cookies.jwt || (req.headers.authorization && req.headers.authorization.startsWith("Bearer") ? req.headers.authorization.split(" ")[1] : null);; 
    
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        req.user = await User.findById(decoded.userId).select("-password"); 
        
        if (!req.user) {
            res.status(401);
            throw new Error("Not authorized, user not found");
        }

        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});


  
  export { protect};
  
