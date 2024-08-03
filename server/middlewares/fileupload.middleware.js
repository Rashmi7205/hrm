import multer from 'multer';
import fs from 'fs';

// Configure storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("jhhh");
        const uploadPath = "./uploads";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
export const upload = multer({ storage });
