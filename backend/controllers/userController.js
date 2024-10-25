import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,    
            email: user.email,
            profileImage: user.profileImage,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})


const registerUser = asyncHandler(async (req, res) => {
  console.log("req.file",req.file)
  console.log("req.body",req.body)
    const { name, email, password, role } = req.body;
    try {
    
        const userExists = await User.findOne({ email });
    
        if (userExists) {
          res.status(400);
          throw new Error('User already exists');
        }

        let profileImageUrl = '';

        if (req.files && req.files.profileImage) {
            const file = req.files.profileImage; 
            const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
              folder: 'profile_pics',
            });
            profileImageUrl = result.secure_url; 
          }
    
    console.log("profileImageUrl",profileImageUrl)
        const user = await User.create({
          name,
          email,
          password,
          role,
          profileImage: profileImageUrl,
          
        });
   
        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
          });
        } else {
          res.status(400);
          throw new Error('Invalid user data');
        }
      } catch (error) {
        
        res.status(500).json({ message: error.message });
      }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        message: "Logout User"
    });
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = { 
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    
    res.status(200).json(user);
})


const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
           user.password = req.body.password; 
        }

       const updatedUser = await user.save();

       res.status(200).json({
           _id: updatedUser._id,
           name: updatedUser.name,
           email: updatedUser.email,
       });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})



export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };