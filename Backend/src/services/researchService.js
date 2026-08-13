const ResearchJob = require("../models/research");



const createResearchJob = async ({ userId, topic }) => {

  const researchJob = await ResearchJob.create({
    userId,
    topic,
  });

  return researchJob;
};





const getUserResearchJobs = async (userId) => {
  const researchJobs = await ResearchJob.find({
    userId,
  }).sort({
    createdAt: -1,  //It shows the newest research first
  });

  return researchJobs;
};



//=============Importing Functions=============

module.exports = {
  createResearchJob,
  getUserResearchJobs
};