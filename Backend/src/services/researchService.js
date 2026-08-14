
// Import Research Job model
const ResearchJob = require("../models/research");



// Create a new research job

const createResearchJob = async ({ userId, topic }) => {

  const researchJob = await ResearchJob.create({
    userId,
    topic,
  });

  return researchJob;
};




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
      userId: userId
    },
    {
      $set: { currentStage: status }
    }
  )

  if (!researchJob) {
    throw new Error("Research not found");
  }

  console.log(researchJob)
  // return researchJob;

}



// Export research services 
module.exports = {
  createResearchJob,
  getUserResearchJobs,
  getResearchById,
  deleteResearchById,
  updateResearchStatus,
};