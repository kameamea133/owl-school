import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'profile_pics',
        allowed_formats: ['jpeg', 'png', 'jpg']
    }    
});

const upload = multer({ storage });

export default upload