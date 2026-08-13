


const { createResearchJob, getUserResearchJobs } = require("../services/researchService");




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




const getResearche = async (req, res) => {

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



//=============Importing Functions=============

module.exports = {
  createResearch,
  getResearche
};