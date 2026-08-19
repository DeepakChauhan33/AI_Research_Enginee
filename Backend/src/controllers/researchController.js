
// Import research services
const { createResearchJob, getUserResearchJobs,
  getResearchById,
  deleteResearchById,
  updateResearchStatus,
  updateResearchPlan,
  updateResearchAIStage,
  getResearchReport,
  getResearchSources,
  
  markResearchFailed
} = require("../services/researchService");


const { processResearchJob } = require("../services/researchProcessor");


// Create a new research job

const createResearch = async (req, res) => {
  try {

    const { topic } = req.body;


    // Create the research job in MongoDB
    const researchJob = await createResearchJob({
      userId: req.user.userId,
      topic,
    });


    // Start AI processing in the background
    processResearchJob(researchJob._id);


    // Return immediately without waiting for AI
    return res.status(201).json({
      success: true,
      message: "Research job started successfully",
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




// Get research by ID

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




// Delete research by ID

const deleteResearch = async (req, res) => {

  try {

    const { id } = req.params;

    const deletedResearch = await deleteResearchById(id, req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Research deleted successfully",
      research: deletedResearch,
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    })

  }

}




// Update status of research

const updateStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status, currentStage } = req.body;

    const updatedResearch = await updateResearchStatus(
      id,
      req.user.userId,
      status,
      currentStage,
    )


    return res.status(200).json({
      success: true,
      message: "Research status updated successfully",
      research: updatedResearch,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })

  }
}



// Update AI status

const updateAIStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { currentStage } = req.body;

    if (!currentStage) {
      return res.status(400).json({
        success: false,
        message: "currentStage is required",
      });
    }

    console.log(
      `AI Stage Update | Research: ${id} | Stage: ${currentStage}`
    );

    const updatedResearch = await updateResearchAIStage(
      id,
      currentStage
    );

    return res.status(200).json({
      success: true,
      message: "Research AI stage updated successfully",
      research: updatedResearch,
    });

  } catch (error) {

    console.error("AI status update failed:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};






// 

const updatePlan = async (req, res) => {

  try {

    const { id } = req.params;
    const { tasks } = req.body;

    const updatedPlan = await updateResearchPlan(
      id,
      req.user.userId,
      tasks
    );

    return res.status(200).json({
      success: true,
      message: "Research plan updated successfully",
      research: updatedPlan
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};






// Get research report

const getReport = async (req, res) => {

  try {

    const { id } = req.params;

    const report = await getResearchReport(
      id,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      report,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};




// Get research sources

const getSources = async (req, res) => {

  try {

    const { id } = req.params;

    const sources = await getResearchSources(
      id,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      sources,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};





//============= Export Functions =============

module.exports = {
  createResearch,
  getAlltResearche,
  getResearch,
  deleteResearch,
  updateStatus,
  updatePlan,
  updateAIStatus,
  getReport,
  getSources

};