import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

//configure cloudinary with your API key
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use a dynamic function for setting Cloudinary parameters
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "manufacturer-documents", // Define the folder here
      format: "png", // Force file format to png (or you can change it based on file type)
      public_id: `${file.originalname.split(".")[0]}-${Date.now()}`, // Generate unique public ID
    };
  },
});





// const storage = multer.memoryStorage(); // or use diskStorage if you prefer

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => { // `any` used here to bypass typing issue
    const allowedMimeTypes = /image\/(jpg|jpeg|png)|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document/;

    if (!allowedMimeTypes.test(file.mimetype)) {
      cb(new Error('Only image, PDF, DOC, and DOCX files are allowed'), false);
    } else {
      cb(null, true);
    }
  }
});



export const uploadToCloudinary = upload.array("images", 5); // Allow up to 5 images
