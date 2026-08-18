const AI_SERVICE_URL = "http://localhost:8001";


const startAIResearch = async ({ researchId, topic }) => {
  const response = await fetch(`${AI_SERVICE_URL}/ai/research`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      researchId,
      topic,
    }),
  });


  if (!response.ok) {
    throw new Error("AI service request failed");
  }


  const data = await response.json();

  return data;
};


module.exports = {
  startAIResearch,
};