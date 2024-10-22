import express from "express";
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, updateProfileImage } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/",upload.single('image'), registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.put('/update-profile-image', upload.single('image'), updateProfileImage);

export default router;