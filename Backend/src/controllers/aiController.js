const { generateAIResponse } = require("../services/aiService");

const generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const result = await generateAIResponse(prompt);

    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("AI Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};

module.exports = {
  generateResponse,
};