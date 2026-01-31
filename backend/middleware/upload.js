import multer from "multer";

// Store in memory so we can directly upload to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
