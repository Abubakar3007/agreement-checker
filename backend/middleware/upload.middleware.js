// middleware/upload.middleware.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        // PDF
        "application/pdf",
        // Images
        "image/jpeg",
        "image/png",
        "image/webp",
        // Word
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        // Optional
        "text/plain"
    ];

    if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error("Only PDF, JPG, PNG allowed"));
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024},
    fileFilter
});

module.exports = upload;