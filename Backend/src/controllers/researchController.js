
// Import research services
const { createResearchJob, getUserResearchJobs, getResearchById } = require("../services/researchService");


// Create a new research job

const createResearch = async (req, res) => {
  try {

    console.log("REQ.USER:", req.user);
    console.log("REQ.BODY:", req.body);

    const { topic } = req.body;

    const researchJob = await createResearchJob({
      userId: req.user.userId,
      topic,
    });

    return res.status(201).json({
      success: true,
      message: "Research job created successfully",
      research: researchJob,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};






// Get all research jobs of the authenticated user

const getAlltResearche = async (req, res) => {

  try {

    const researches = await getUserResearchJobs(req.user.userId);

    return res.status(200).json({
      success: true,
      research: researches
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}




// Get research bt ID

const getResearch = async (req, res) => {

  try {

    const { id } = req.params;
    const research = await getResearchById(
      id,
      req.user.userId
    )

    return res.status(200).json({
      success: true,
      research: research,
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}





//=============Exporti Functions=============

module.exports = {
  createResearch,
  getAlltResearche,
  getResearch

};