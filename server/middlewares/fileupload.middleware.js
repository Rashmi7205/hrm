import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //const uploadPath = path.join(__dirname, 'uploads'); // Use path.join to ensure correct path format
        const uploadPath = "./uploads";
        // Check if the directory exists, and if not, create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Use recursive to create nested directories if needed
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Prefix with timestamp to avoid filename conflicts
    },
});

// Export the upload middleware
export const upload = multer({ storage });
