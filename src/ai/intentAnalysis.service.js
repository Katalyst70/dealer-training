// src/ai/intentAnalysis.service.js

exports.analyzeCommentIntent = async (commentText) => {
  // Call OpenAI / Azure OpenAI here

  return {
    intentLabel: "PRICE",
    intentScore: 85,
    urgencyScore: 70,
    confidenceScore: 92,
  };
};
