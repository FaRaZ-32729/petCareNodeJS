const { GoogleGenerativeAI } = require("@google/generative-ai");

const feedbackcontroller = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(message);

        const reply = result.response.text();

        res.json({ reply });
    } catch (err) {
        console.error("Gemini error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { feedbackcontroller };
