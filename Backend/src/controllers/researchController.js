
// Import research services
const { createResearchJob, getUserResearchJobs,
  getResearchById,
  deleteResearchById,
  updateResearchStatus,
  updateResearchPlan,
} = require("../services/researchService");


// Create a new research job

const createResearch = async (req, res) => {
  try {

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



//============= Export Functions =============

module.exports = {
  createResearch,
  getAlltResearche,
  getResearch,
  deleteResearch,
  updateStatus,
  updatePlan

};