import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt; // Récupérer le token depuis les cookies

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password"); // Cherche l'utilisateur sans renvoyer le mot de passe

        if (!req.user) {
            res.status(401);
            throw new Error("Not authorized, user not found");
        }

        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

export { protect };
