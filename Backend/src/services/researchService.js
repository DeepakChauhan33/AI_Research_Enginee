
// Import Research Job model
const ResearchJob = require("../models/research");

// Import function form aiService 
const { startAIResearch } = require("../services/aiService");



// Create a new research job


const createResearchJob = async ({ userId, topic }) => {

  // Create the research job in MongoDB
  const researchJob = await ResearchJob.create({
    userId,
    topic,
  });

  return researchJob;
};




// const createResearchJob = async ({ userId, topic }) => {

//   const researchJob = await ResearchJob.create({
//     userId,
//     topic,
//   });

//   try {
//     // Send the research job to the AI service
//     const aiResult = await startAIResearch({
//       researchId: researchJob._id.toString(),
//       topic: researchJob.topic,
//     });

//     // Save the AI result back to the same research job
//     researchJob.aiResponse = aiResult.result;


//     // Save planner tasks in the research plan
//     researchJob.researchPlan = {
//       tasks: aiResult.result.tasks.map((task) => ({
//         title: task.query,
//         description: task.purpose,
//         status: "pending",
//       })),
//     };

//     researchJob.status = "completed";
//     researchJob.currentStage = "completed";

//     await researchJob.save();

//   } catch (error) {

//     // Mark the research job as failed if AI processing fails
//     researchJob.status = "failed";

//     await researchJob.save();

//     throw error;
//   }

//   return researchJob;



// const researchJob = await ResearchJob.create({
//   userId,
//   topic,
// });


// // Send the research job to the AI service
// await startAIResearch({
//   researchId: researchJob._id.toString(),
//   topic: researchJob.topic,
// });


// // Save the AI result back to the same research job
// researchJob.aiResponse = aiResult.result;

// researchJob.status = "completed";
// researchJob.currentStage = "completed";

// await researchJob.save();

// return researchJob;
// };




// Get all research jobs of a user

const getUserResearchJobs = async (userId) => {

  const researchJobs = await ResearchJob.find({
    userId,
  }).sort({
    createdAt: -1,  //It shows the newest research first
  });

  return researchJobs;

};




// Get One Research

const getResearchById = async (researchId, userId) => {
  const researchJob = await ResearchJob.findOne({
    _id: researchId,
    userId: userId,
  });

  if (!researchJob) {
    throw new Error("Research not found");
  }

  return researchJob;
};




// Delete research 

const deleteResearchById = async (researchId, userId) => {

  const researchJob = await ResearchJob.findOneAndDelete({
    _id: researchId,
    userId: userId
  });

  if (!researchJob) {
    throw new Error("Research not found");
  }

  return researchJob;
  // console.log(researchJob);

}




// Update Research Status

const updateResearchStatus = async (researchId, userId, status, currentStage) => {

  const researchJob = await ResearchJob.findOneAndUpdate(
    {
      _id: researchId,
      userId: userId,
    },
    {
      status,
      currentStage,
    },
    {
      new: true,
      runValidators: true,
    }
  )

  if (!researchJob) {
    throw new Error("Research not found");
  }

  // console.log(researchJob)
  return researchJob;

}




// Update research stage from the AI service

const updateResearchAIStage = async (researchId, currentStage) => {

  const researchJob = await ResearchJob.findByIdAndUpdate(
    researchId,
    {
      status: "running",
      currentStage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!researchJob) {
    throw new Error("Research not found");
  }

  return researchJob;
};






// Update the research plan

const updateResearchPlan = async (researchId, userId, tasks) => {

  const researchJob = await ResearchJob.findOneAndUpdate(
    {
      _id: researchId,
      userId: userId,
    },
    {
      researchPlan: {
        tasks,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!researchJob) {
    throw new Error("Research not found");
  }

  return researchJob;
};




// Get report of a research job

const getResearchReport = async (researchId, userId) => {

  const researchJob = await ResearchJob.findOne({
    _id: researchId,
    userId,
  });

  if (!researchJob) {
    throw new Error("Research not found");
  }

  if (!researchJob.aiResponse) {
    throw new Error("Research report is not available");
  }

  return researchJob.aiResponse.report;
};




// Mark research job as failed
const markResearchFailed = async (researchId, errorMessage) => {
  const researchJob = await ResearchJob.findByIdAndUpdate(
    researchId,
    {
      status: "failed",
      errorMessage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!researchJob) {
    throw new Error("Research not found");
  }

  return researchJob;
};




// Export research services 

module.exports = {
  createResearchJob,
  getUserResearchJobs,
  getResearchById,
  deleteResearchById,
  updateResearchStatus,
  updateResearchPlan,
  updateResearchAIStage,
  getResearchReport,  
  markResearchFailed
};