const axios = require("axios");

const generateAIResponse = async (prompt) => {
  const response = await axios.post(
    "http://127.0.0.1:8001/generate",
    {
      prompt,
    }
  );

  return response.data;
};

module.exports = {
  generateAIResponse,
};