module.exports = async function runAI(rawText) {
    const prompt = `
You are given raw OCR text from a legal agreement.

Task:
- Understand the agreement
- Ignore OCR spelling and formatting errors
- Extract ONLY the 10 most important points
- Each point must be short and clear
- Do NOT give legal advice
- Do NOT mention risks
- Do NOT repeat headings
- Return ONLY a JSON array of 10 strings
`;

    // call your AI here (OpenAI / Ollama / etc)
    // return parsed JSON array
};