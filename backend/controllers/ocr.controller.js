const Form = require("../model/Form");
const extractText = require("../utils/ocr");

exports.ocrForm = async (req, res) => {
    try {
        const { id } = req.params; // find form id of user
        console.log(id)

        // ID validation
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid form id" });
        }

        const form = await Form.findById(id); // find form from db
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        console.log(form)

        // set pending
        form.status = "ocr_pending";
        await form.save(); // status save in db 

        // find text by ocr method
        const text = await extractText(form.filePath);

        console.log(text)

        form.rawText = text; // form db in save raw text
        form.status = "ocr_done"; //  form status done
        await form.save(); // save in db status and text

        // response from server to frontend
        return res.json({
            success: true,
            message: "OCR completed successfully",
        });

    }
    // if error
    catch (err) {
        console.error("❌ OCR ERROR:", err);
        return res.status(500).json({ message: "OCR failed" });
    }
};