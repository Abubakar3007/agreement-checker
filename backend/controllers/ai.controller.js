const Form = require("../model/Form");
const runAI = require("../utils/ai");

const analyzeAgreement = async (req, res) => {
    try {
        const { id } = req.params;

        const form = await Form.findById(id);

        if (!form || !form.rawText) {
            return res.status(404).json({ message: "OCR text not found" });
        }

        const summary = await runAI(form.rawText);

        form.aiSummary = summary;
        form.status = "ai_done";
        await form.save();

        return res.json({
            success: true,
            message: "AI analysis completed",
        });

    } catch (err) {
        console.error("❌ AI ERROR:", err);
        return res.status(500).json({ message: "AI processing failed" });
    }
};

module.exports = { analyzeAgreement };