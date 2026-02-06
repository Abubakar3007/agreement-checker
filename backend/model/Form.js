const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    // user id
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // form upload type
    formType: {
        type: String,
        enum: ["AGREEMENT"],
        required: true
    },

    // pdf name
    originalFileName: {
        type: String,
        required: true
    },

    // pdf path
    filePath: {
        type: String,
        required: true
    },

    // pdf ocr status when convert in text
    status: {
        type: String,
        enum: ["uploaded", "ocr_done", "ocr_pending", "ai_done"],
        default: "uploaded"
    },

    // OCR output
    rawText: {
        type: String
    },

    // ✅ AI FINAL OUTPUT (10 lines)
    aiSummary: {
        type: [String], // exactly what you want
        default: []
    },

    // created time
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// export mongo in schema
module.exports = mongoose.model("Form", FormSchema);
