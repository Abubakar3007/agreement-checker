const express = require("express");
const { submitContactForm } = require("../controllers/contact.controller.js");

const router = express.Router();

router.post("/contact", submitContactForm);

module.exports = router;