const Form = require("../model/Form");

exports.uploadAgreement = async (req, res) => {

    try {
        // check request from frontend if file not uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required",
            });
        }

        // upload file types
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

        // check upload file type
        // req.file.mimetype -> check upload file is format? pdf , word , text , image
        if (!allowedTypes.includes(req.file.mimetype)) {
            // response to frontend
            return res.status(400).json({
                success: false,
                message: "Only PDF or image files are allowed",
            });
        }

        // form save in db
        const form = await Form.create({
            userId: req.user.id, // user id from request by user
            formType: "AGREEMENT", // form type which are uploaded
            originalFileName: req.file.originalname, // file original name by user
            filePath: req.file.path, // file path name
            fileType: req.file.mimetype, //  file type -> pdf,image,word and text/plain
            status: "uploaded", // check status
        });

        // response by server to frontend
        return res.status(200).json({
            success: true,
            message: "Agreement uploaded successfully",
            formId: form._id,
        });
    }
    // if error
    catch (err) {
        console.error("Agreement upload error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to upload agreement",
        });
    }

};