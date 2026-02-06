const express = require("express");
const router = express.Router();
const analyzeAgreement = require("../controllers/ai.controller").analyzeAgreement;
const authMiddleware = require("../middleware/auth.middleware");

router.post("/:id/analyze", authMiddleware, analyzeAgreement);

module.exports = router;