const express = require("express");
const upload = require("../middleware/upload.middleware");
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const {
     uploadAgreement,
    // getFormById,
} = require("../controllers/form.controller"); //  controller of uploadAgreement
// const { sendToAI } = require("../controllers/ai.controller");

// Upload Agreement
router.post("/upload", auth, upload.single("file"), uploadAgreement);

// Get form safely
// router.get("/:id", auth, getFormById);

// 🔒 AI trigger (auth REQUIRED)
// router.post("/:id/send-to-ai", auth, sendToAI);

module.exports = router;