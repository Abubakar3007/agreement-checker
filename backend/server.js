const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.route.js");
const formRoutes = require("./routes/form.route.js");
const ocrRoutes = require("./routes/ocr.route.js");
// const aiRoutes = require("./routes/ai.route.js");
const contactRoutes = require("./routes/contact.route.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("Mongo error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/form", formRoutes);
app.use("/api/form", ocrRoutes);
// app.use("/api/form", aiRoutes);
app.use("/api/form", contactRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});