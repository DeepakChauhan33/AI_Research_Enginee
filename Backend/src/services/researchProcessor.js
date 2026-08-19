// // Import Research Job model
// const ResearchJob = require("../models/research");

// // Import function form aiService 
// const { startAIResearch } = require("../services/aiService");


// const processResearchJob = async (researchJobId) => {
//   try {

//     // Find the research job that needs to be processed
//     const researchJob = await ResearchJob.findById(researchJobId);

//     if (!researchJob) {
//       throw new Error("Research job not found");
//     }


//     // Mark the research as running
//     researchJob.status = "running";
//     researchJob.currentStage = "planning";

//     await researchJob.save();


//     // Send the research job to the AI service
//     const aiResult = await startAIResearch({
//       researchId: researchJob._id.toString(),
//       topic: researchJob.topic,
//     });


//     // Save the complete AI response
//     researchJob.aiResponse = aiResult.result;


//     // Save planner tasks in the research plan
//     researchJob.researchPlan = {
//       tasks: aiResult.result.tasks.map((task) => ({
//         title: task.query,
//         description: task.purpose,
//         status: "pending",
//       })),
//     };


//     // Mark the research as completed
//     researchJob.status = "completed";
//     researchJob.currentStage = "completed";

//     await researchJob.save();


//     return researchJob;

//   } catch (error) {

//     // Mark the research as failed
//     await ResearchJob.findByIdAndUpdate(
//       researchJobId,
//       {
//         status: "failed",
//       }
//     );


//     console.error(
//       `Research job ${researchJobId} failed:`,
//       error.message
//     );

//   }
// };



// // Export research Processor services 

// module.exports = {
//   processResearchJob,
// };







// Import Research Job model
const ResearchJob = require("../models/research");

// Import AI service
const { startAIResearch } = require("../services/aiService");

// Import failure service
const { markResearchFailed } = require("../services/researchService");


const processResearchJob = async (researchJobId) => {

  try {

    // Find the research job
    const researchJob = await ResearchJob.findById(researchJobId);

    if (!researchJob) {
      throw new Error("Research job not found");
    }


    // Mark the research as running
    researchJob.status = "running";
    researchJob.currentStage = "planning";
    researchJob.errorMessage = null;

    await researchJob.save();


    // Send the research job to the AI service
    const aiResult = await startAIResearch({
      researchId: researchJob._id.toString(),
      topic: researchJob.topic,
    });


    // Make sure AI returned a result
    if (!aiResult || !aiResult.result) {
      throw new Error("AI service returned an invalid response");
    }


    // Save the complete AI response
    researchJob.aiResponse = aiResult.result;


    // Save planner tasks in the research plan
    if (aiResult.result.tasks) {

      researchJob.researchPlan = {
        tasks: aiResult.result.tasks.map((task) => ({
          title: task.query,
          description: task.purpose,
          status: "pending",
        })),
      };

    }


    // Save research sources
    if (
      aiResult.result.report &&
      aiResult.result.report.citations
    ) {

      researchJob.sources = aiResult.result.report.citations.map(
        (citation) => ({
          url: citation.url,
          title: citation.title,
          sourceName: citation.publisher || "Unknown",
          publishedAt: citation.published_date
            ? new Date(citation.published_date)
            : undefined,
          status: "found",
        })
      );

    }


    // Mark the research as completed
    researchJob.status = "completed";
    researchJob.currentStage = "completed";
    researchJob.errorMessage = null;

    await researchJob.save();


    return researchJob;


  } catch (error) {

    console.error(
      `Research job ${researchJobId} failed:`,
      error.message
    );


    try {

      await markResearchFailed(
        researchJobId,
        error.message
      );

    } catch (updateError) {

      console.error(
        `Failed to update research job ${researchJobId}:`,
        updateError.message
      );

    }
  }
};


// Export research processor
module.exports = {
  processResearchJob,
};