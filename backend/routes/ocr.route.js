const express = require("express");
const auth = require("../middleware/auth.middleware");
const { ocrForm } = require("../controllers/ocr.controller"); // find ocr controller or export ocr controllers
const router = express.Router();

router.post("/:id/ocr", auth, ocrForm); // ocr route

module.exports = router;