const AI_SERVICE_URL = "http://localhost:8001";


// Start research on the AI service
const startAIResearch = async ({ researchId, topic }) => {

  try {

    const response = await fetch(
      `${AI_SERVICE_URL}/ai/research`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          researchId,
          topic,
        }),
      }
    );


    // Handle non-success response from AI service
    if (!response.ok) {

      let message = "AI service request failed";

      try {
        const errorData = await response.json();

        if (errorData.detail) {
          message = errorData.detail;
        }

      } catch (error) {
        // Ignoreing JSON parsing error
      }

      throw new Error(message);
    }


    const data = await response.json();


    if (!data.success) {
      throw new Error(
        data.message || "AI research failed"
      );
    }


    return data;

  } catch (error) {

    console.error(
      "AI service error:",
      error.message
    );

    throw error;
  }
};


module.exports = {
  startAIResearch,
};